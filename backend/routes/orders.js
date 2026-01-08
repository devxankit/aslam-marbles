const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getUserOrders
} = require('../controllers/orderController');

// Get logged in user orders
router.get('/my-orders', auth, getUserOrders);


// Get all orders (admin only)
router.get('/all', auth, adminOnly, getAllOrders);

// Get single order (admin only)
router.get('/:id', auth, adminOnly, getOrderById);

// Update order status (admin only)
router.put('/:id/status', auth, adminOnly, updateOrderStatus);

// Delete order (admin only)
router.delete('/:id', auth, adminOnly, deleteOrder);

module.exports = router;

