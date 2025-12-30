const mongoose = require('mongoose');

// Prevent mongoose from buffering model operations when MongoDB is down.
// This avoids long hangs/timeouts like: `Operation users.findOne() buffering timed out`
mongoose.set('bufferCommands', false);

let listenersAttached = false;
let connectingPromise = null;
let lastMongoUri = null;

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

  lastMongoUri = mongoUri;

  // Attach listeners once (avoid duplicating handlers on reconnect attempts)
  if (!listenersAttached) {
    listenersAttached = true;

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected (event)');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected! Will retry connection...');
      // Fire-and-forget: let the reconnect loop handle it
      if (lastMongoUri) connectDB(lastMongoUri).catch(() => {});
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error (event):', err?.message || err);
    });
  }

  // If already connected, nothing to do
  if (mongoose.connection.readyState === 1) return;
  // If currently connecting, reuse the same promise
  if (connectingPromise) return connectingPromise;

  const maxRetries = 5;
  connectingPromise = (async () => {
    for (let remaining = maxRetries; remaining >= 0; remaining--) {
      try {
        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          family: 4
        });

        console.log('✅ MongoDB connected successfully');

        // Admin seeding should never break DB connectivity; treat it as non-fatal.
        try {
          await ensureDefaultAdmin();
        } catch (e) {
          console.error('⚠️ ensureDefaultAdmin failed (non-fatal):', e?.message || e);
        }

        break;
      } catch (error) {
        console.error(`❌ MongoDB Connection Error (Remaining retries: ${remaining}):`, error.message);

        if (remaining > 0) {
          console.log('🔄 Retrying connection in 5 seconds...');
          await new Promise((r) => setTimeout(r, 5000));
        } else {
          console.error('❌ Failed to connect to MongoDB after multiple attempts.');
        }
      }
    }
  })().finally(() => {
    connectingPromise = null;
  });

  return connectingPromise;
};

module.exports = connectDB;

