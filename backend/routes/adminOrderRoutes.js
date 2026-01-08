const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.get('/', auth, adminOnly, getAllOrders);
router.put('/:id/status', auth, adminOnly, updateOrderStatus);

module.exports = router;
