const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { adminLogin, getProfile, changePassword } = require('../controllers/userController');

router.post('/login', adminLogin);
router.get('/me', auth, adminOnly, getProfile);
router.post('/change-password', auth, adminOnly, changePassword);

module.exports = router;


