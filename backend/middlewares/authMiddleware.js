const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Simple in-memory cache for user lookups (TTL: 5 minutes)
const userCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');

    // Check cache first
    const cacheKey = decoded.id;
    const cached = userCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      req.user = cached.user;
      return next();
    }

    // Fetch from database - Check User first, then Admin
    // Optimization: Check role in token if available to decide which model to query
    let user = null;

    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password').lean();
      // Fallback for migration or mixed usage: check User if not found in Admin
      if (!user) {
        user = await User.findById(decoded.id).select('-password').lean();
      }
    } else {
      user = await User.findById(decoded.id).select('-password').lean();
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found for token' });
    }

    // Cache the user
    userCache.set(cacheKey, { user, timestamp: Date.now() });

    // Clean old cache entries periodically
    if (userCache.size > 100) {
      const now = Date.now();
      for (const [key, value] of userCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          userCache.delete(key);
        }
      }
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({
      success: false,
      message: `Unauthorized: ${err.message}`
    });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

module.exports = { auth, adminOnly };


