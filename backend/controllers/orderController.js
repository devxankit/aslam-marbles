const Order = require('../models/Order');

// GET /api/orders/all - Get all orders (Admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, startDate, endDate, search } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }
    
    // Search by order ID, customer name, or email
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { razorpayOrderId: { $regex: search, $options: 'i' } },
        { 'customerDetails.firstName': { $regex: search, $options: 'i' } },
        { 'customerDetails.lastName': { $regex: search, $options: 'i' } },
        { 'customerDetails.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(500);

    return res.json({
      success: true,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id - Get single order
exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id)
      .populate('userId', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    return res.json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/orders/:id/status - Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('userId', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    return res.json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/orders/:id - Delete order
exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByIdAndDelete(id);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    return res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

