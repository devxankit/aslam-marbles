const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'changeme', { expiresIn: '7d' });
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  delete obj.otpCode;
  delete obj.otpToken;
  delete obj.otpExpiresAt;
  delete obj.resetToken;
  delete obj.resetExpiresAt;
  return obj;
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email or phone already exists' });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      phone,
      password,
      role: 'user',
      isActive: true
    });

    const token = signToken(user._id, user.role);
    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: 'Registration successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
      return res.status(400).json({ success: false, message: 'Email or phone and password are required' });
    }

    const query = email ? { email: email.toLowerCase() } : { phone };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user._id, user.role);
    return res.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password -otpCode -otpToken -otpExpiresAt -resetToken -resetExpiresAt');
    return res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    return res.json({ success: true, user: sanitizeUser(req.user) });
  } catch (err) {
    next(err);
  }
};

const generateOtpPayload = () => {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpToken = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return { otpCode, otpToken, expiresAt };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { emailOrPhone, type } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: 'Email or phone is required' });
    }

    const isEmail = type === 'email' || emailOrPhone.includes('@');
    const query = isEmail
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { otpCode, otpToken, expiresAt } = generateOtpPayload();
    user.otpCode = otpCode;
    user.otpToken = otpToken;
    user.otpExpiresAt = expiresAt;
    await user.save();

    // In production send OTP via email/SMS. For now, return token and expose otp for testing.
    return res.json({
      success: true,
      message: 'OTP sent successfully',
      token: otpToken,
      debugOtp: otpCode
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { emailOrPhone, otp, token } = req.body;
    if (!emailOrPhone || !otp || !token) {
      return res.status(400).json({ success: false, message: 'Email/phone, otp, and token are required' });
    }

    const query = emailOrPhone.includes('@')
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user || !user.otpToken || user.otpToken !== token) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    user.otpCode = null;
    user.otpToken = null;
    user.otpExpiresAt = null;
    await user.save();

    return res.json({
      success: true,
      message: 'OTP verified',
      resetToken
    });
  } catch (err) {
    next(err);
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const { emailOrPhone } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: 'Email or phone is required' });
    }

    const query = emailOrPhone.includes('@')
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { otpCode, otpToken, expiresAt } = generateOtpPayload();
    user.otpCode = otpCode;
    user.otpToken = otpToken;
    user.otpExpiresAt = expiresAt;
    await user.save();

    return res.json({
      success: true,
      message: 'OTP resent successfully',
      token: otpToken,
      debugOtp: otpCode
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { emailOrPhone, password, token } = req.body;
    if (!emailOrPhone || !password || !token) {
      return res.status(400).json({ success: false, message: 'Email/phone, password, and token are required' });
    }

    const query = emailOrPhone.includes('@')
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user || user.resetToken !== token) {
      return res.status(400).json({ success: false, message: 'Invalid reset token' });
    }

    if (!user.resetExpiresAt || user.resetExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Reset token expired' });
    }

    user.password = password;
    user.resetToken = null;
    user.resetExpiresAt = null;
    await user.save();

    return res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user._id, user.role);
    return res.json({
      success: true,
      token,
      admin: sanitizeUser(user),
      message: 'Admin login successful'
    });
  } catch (err) {
    next(err);
  }
};

