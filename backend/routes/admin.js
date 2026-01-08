const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { adminLogin, getProfile, changePassword, createAdmin, adminForgotPassword, adminResetPassword } = require('../controllers/userController');

router.post('/login', adminLogin);
router.post('/forgot-password', adminForgotPassword);
router.post('/reset-password', adminResetPassword);
router.get('/me', auth, adminOnly, getProfile);

router.post('/change-password', auth, adminOnly, changePassword);
router.post('/create', auth, adminOnly, createAdmin);

module.exports = router;


