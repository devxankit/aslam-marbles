const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const {
  register,
  login,
  getProfile,
  listUsers
} = require('../controllers/userController');

// Public
// Explicitly handle non-POST calls to avoid "Route not found" confusion
router.get('/register', (req, res) => res.status(405).json({ success: false, message: 'Use POST /api/users/register with JSON body' }));
router.get('/login', (req, res) => res.status(405).json({ success: false, message: 'Use POST /api/users/login with JSON body' }));
router.post('/register', register);
router.post('/login', login);

// Protected
router.get('/me', auth, getProfile);
router.get('/', auth, adminOnly, listUsers);

module.exports = router;

