const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

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



exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase(), role: 'admin' });
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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // For security, do not reveal if user does not exist, but for now we might want to for debugging or UX preference
      return res.status(404).json({ success: false, message: 'User not found with this email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry (10 minutes)
    user.otpCode = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const message = `Your password reset OTP is: ${otp}\n\nThis OTP is valid for 10 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset OTP',
        message
      });

      res.status(200).json({
        success: true,
        message: 'OTP sent to email'
      });
    } catch (error) {
      console.error('Email send error:', error);
      user.otpCode = undefined;
      user.otpExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent', error: error.message });
    }
  } catch (err) {
    next(err);
  }
};

exports.verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP' });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      otpCode: otp,
      otpExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email, OTP, and new password' });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      otpCode: otp,
      otpExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.password = password;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    const token = signToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      message: 'Password reset successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new passwords are required' });
    }

    // req.user is populated by auth middleware. Use _id as lean() in middleware might strip virtual .id
    const user = await User.findById(req.user._id || req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if current password matches
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    next(err);
  }
};

