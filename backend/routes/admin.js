const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { adminLogin, getProfile } = require('../controllers/userController');

router.post('/login', adminLogin);
router.get('/me', auth, adminOnly, getProfile);

module.exports = router;


