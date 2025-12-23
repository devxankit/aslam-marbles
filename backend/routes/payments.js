const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const {
  createOrder,
  verifyPayment
} = require('../controllers/paymentController');

// Create order (requires authentication)
router.post('/create-order', auth, createOrder);

// Verify payment (public, but should be validated)
router.post('/verify-payment', verifyPayment);

module.exports = router;

