const mongoose = require('mongoose');

const ensureDefaultAdmin = async () => {
  const User = require('../models/User');
  const email = (process.env.ADMIN_EMAIL || 'admin@tilakstone.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Default Admin';

  let admin = await User.findOne({ email, role: 'admin' });

  if (!admin) {
    admin = await User.create({
      name,
      email,
      password, // hashed by pre-save hook
      role: 'admin',
      isActive: true,
      isEmailVerified: true
    });
    console.log('✅ Default admin created:', email);
    return;
  }

  // Ensure existing admin has correct credentials and flags
  const needsPasswordUpdate = !(await admin.matchPassword(password));
  const needsMetaUpdate = !admin.isActive || admin.role !== 'admin' || admin.email !== email;

  if (needsPasswordUpdate || needsMetaUpdate) {
    admin.email = email;
    admin.name = admin.name || name;
    admin.role = 'admin';
    admin.isActive = true;
    admin.isEmailVerified = true;
    if (needsPasswordUpdate) {
      admin.password = password; // plain; pre-save will hash
    }
    await admin.save();
    console.log('ℹ️ Default admin credentials refreshed:', email);
  } else {
    console.log('ℹ️ Admin account already present:', email);
  }
};

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('Missing MongoDB connection string (MONGODB_URI)');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000, // Increased timeout to 15s
      socketTimeoutMS: 45000,
      family: 4 // Force IPv4 to resolve partial DNS issues
    });

    console.log('✅ MongoDB connected successfully');
    await ensureDefaultAdmin();
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't exit process, allow retry or investigation
  }
};

module.exports = connectDB;

