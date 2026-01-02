const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { adminLogin, getProfile, changePassword, createAdmin } = require('../controllers/userController');

router.post('/login', adminLogin);
router.get('/me', auth, adminOnly, getProfile);
router.post('/change-password', auth, adminOnly, changePassword);
router.post('/create', auth, adminOnly, createAdmin);

module.exports = router;


