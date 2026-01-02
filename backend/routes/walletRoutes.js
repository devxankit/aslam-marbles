const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware'); // Assuming you use this middleware for protected routes
const { getWalletDetails } = require('../controllers/walletController');

// @route   GET /api/wallet
// @desc    Get wallet overview
// @access  Private (Admin)
router.get('/', getWalletDetails);

module.exports = router;
