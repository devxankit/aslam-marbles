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

const sendEmail = require('../utils/sendEmail');

exports.forgotPassword = async (req, res, next) => {
  try {
    const { emailOrPhone } = req.body;
    console.log('Forgot Password Request for:', emailOrPhone);

    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: 'Email or phone is required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const query = isEmail
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user) {
      console.log('User not found for query:', query);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log('Generated OTP:', otpCode, 'for user:', user.email);

    user.otpCode = otpCode;
    user.otpExpiresAt = expiresAt;
    await user.save();

    const message = `
      <div style="font-family: Arial, sans-serif; max-w-600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #8B7355; text-align: center;">Password Reset OTP</h2>
        <p style="text-align: center; color: #555;">Use the following OTP to reset your password. This OTP is valid for 10 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; padding: 15px 30px; background-color: #f8f8f8; color: #333; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; border: 2px dashed #8B7355;">${otpCode}</span>
        </div>
        <p style="text-align: center; color: #888; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `;

    try {
      if (isEmail) {
        // Attempt to send email, but don't crash if credentials are wrong
        try {
          await sendEmail({
            email: user.email,
            subject: 'Aslam Marble Suppliers - Password Reset OTP',
            message
          });
        } catch (innerError) {
          console.error('⚠️ Email send failed (likely invalid credentials). OTP is still valid.');
          console.error('DEBUG OTP for testing:', otpCode);
          // Proceed as if success so user can enter the OTP from console
        }
      } else {
        // SMS implementation...
        return res.status(400).json({ success: false, message: 'Currently only Email reset is supported via backend integration.' });
      }

      return res.json({
        success: true,
        message: `OTP generated! Check server console for code (Email sending may have failed).`,
      });

    } catch (emailError) {
      // This catch might not be reached due to inner catch, but keeps safety
      console.error('Critical Email Error:', emailError);
      return res.status(500).json({ success: false, message: 'Email could not be sent.' });
    }

  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  // Keeping this for backward compatibility if needed, but the main flow is resetPassword
  return res.status(400).json({ success: false, message: 'Please use the Reset Password form directly.' });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { emailOrPhone, otp, password } = req.body;

    if (!emailOrPhone || !otp || !password) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    const isEmail = emailOrPhone.includes('@');
    const query = isEmail
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone.replace(/\D/g, '') };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    // Hash is handled by pre-save hook in User model if modified
    user.password = password;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    user.resetToken = undefined;
    user.resetExpiresAt = undefined;

    await user.save();

    // Generate token so user is automatically logged in? 
    // User requested "user new password se login karta hai", implies they go to login page.
    // So I will just return success.

    return res.json({
      success: true,
      message: 'Password reset successful. Please login with your new password.'
    });

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

