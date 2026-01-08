const Order = require('../models/Order');

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // Validation for allowed statuses can be added here
    const allowedStatuses = ['pending', 'processing', 'completed', 'cancelled', 'refunded', 'failed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status; // Assuming you have a general 'status' field or use 'paymentStatus' if that acts as both
    // If your schema only has 'paymentStatus', you might want to add a separate 'fulfillmentStatus' or just use one.
    // For now, I'll update 'paymentStatus' if 'status' field doesn't exist, OR strictly follow schema.
    // Let's assume we want to track fulfillment separate from payment, but usually simple apps mix them.
    // Given previous code used 'paymentStatus', let's stick to updating that or adding a new field.
    // Ideally, paymentStatus should be 'paid', 'unpaid'. Fulfillment is 'shipped', 'processing'.

    // Strategy: Update both if simple, or just one. checking schema...
    // Schema check: Order.js has paymentStatus. Let's add 'status' (fulfillment status) if missing or just use one for now.
    // Simplest: Update 'paymentStatus' but that is confusing if it is 'shipped'.
    // Better: Update a 'status' field for order flow.

    // Fix: I will update the Order model to include a 'status' field for fulfillment if it doesn't exist,
    // OR just use it dynamically.

    // Update fulfillment status
    order.status = status;

    // Sync payment status if needed (optional but helpful)
    if (status === 'completed' || status === 'refunded') {
      order.paymentStatus = status;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error updating order',
      error: error.message
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Admin)
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    // Search by both _id and orderId for flexibility
    let order;
    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(orderId);
    } else {
      order = await Order.findOne({ orderId: orderId });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error fetching order',
      error: error.message
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    let order;

    if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(orderId);
    } else {
      order = await Order.findOne({ orderId: orderId });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Order removed'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error deleting order',
      error: error.message
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error fetching user orders',
      error: error.message
    });
  }
};
