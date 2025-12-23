const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');

// Initialize Razorpay
let Razorpay;
try {
  Razorpay = require('razorpay');
} catch (err) {
  console.warn('Razorpay package not installed. Run: npm install razorpay');
}

// Get Razorpay instance (lazy initialization)
const getRazorpayInstance = () => {
  if (!Razorpay) {
    return null;
  }
  
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    console.warn('Razorpay keys not configured in .env file');
    return null;
  }
  
  try {
    return new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  } catch (err) {
    console.error('Failed to initialize Razorpay:', err);
    return null;
  }
};

// Generate unique order ID
const generateOrderId = () => {
  return `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// POST /api/payments/create-order
exports.createOrder = async (req, res, next) => {
  try {
    const { items, customerDetails, shippingMethod, subtotal, shippingCost, total } = req.body;
    const userId = req.user?.id || req.user?._id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User authentication required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Items are required' });
    }

    if (!customerDetails) {
      return res.status(400).json({ success: false, message: 'Customer details are required' });
    }
    
    // Email or phone is required
    if (!customerDetails.email && !customerDetails.phone) {
      return res.status(400).json({ success: false, message: 'Email or phone number is required' });
    }
    
    // Required shipping fields
    if (!customerDetails.address || !customerDetails.city || !customerDetails.state || !customerDetails.pinCode) {
      return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const finalTotal = total || (subtotal + (shippingCost || 0));
    const amountInPaise = Math.round(finalTotal * 100); // Convert to paise

    const razorpayInstance = getRazorpayInstance();
    if (!razorpayInstance) {
      return res.status(500).json({ 
        success: false, 
        message: 'Razorpay not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file.' 
      });
    }

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: generateOrderId(),
      notes: {
        userId: userId.toString(),
        items: JSON.stringify(items),
        shippingMethod: shippingMethod || 'standard'
      }
    });

    // Prepare customer details - clean empty strings
    const orderCustomerDetails = {
      email: customerDetails.email?.trim() || undefined,
      phone: customerDetails.phone?.trim() || undefined,
      firstName: customerDetails.firstName?.trim() || undefined,
      lastName: customerDetails.lastName?.trim() || undefined,
      address: customerDetails.address?.trim() || '',
      apartment: customerDetails.apartment?.trim() || undefined,
      city: customerDetails.city?.trim() || '',
      state: customerDetails.state?.trim() || '',
      pinCode: customerDetails.pinCode?.trim() || '',
      country: customerDetails.country?.trim() || 'India'
    };

    // Remove undefined and empty string values (except for required fields)
    Object.keys(orderCustomerDetails).forEach(key => {
      const value = orderCustomerDetails[key];
      // Keep required fields (address, city, state, pinCode) even if empty for validation
      const requiredFields = ['address', 'city', 'state', 'pinCode'];
      if (!requiredFields.includes(key) && (!value || value === '' || value === null)) {
        delete orderCustomerDetails[key];
      }
    });

    // Create order in database (pending status)
    const order = await Order.create({
      orderId: razorpayOrder.id,
      userId,
      items,
      customerDetails: orderCustomerDetails,
      shippingMethod: shippingMethod || 'standard',
      shippingCost: shippingCost || 0,
      subtotal,
      total: finalTotal,
      finalTotal: finalTotal,
      currency: 'INR',
      paymentMethod: 'Razorpay',
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: 'pending',
      status: 'pending'
    });

    return res.json({
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt
      },
      orderData: {
        orderId: order._id,
        items,
        customerDetails,
        total: finalTotal
      }
    });
  } catch (err) {
    console.error('Create order error:', err);
    next(err);
  }
};

// POST /api/payments/verify-payment
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment verification data is required' 
      });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed: Invalid signature' 
      });
    }

    // Find and update order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Update order with payment details
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    await order.save();

    return res.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        id: order._id,
        orderId: order.orderId,
        total: order.total,
        finalTotal: order.finalTotal,
        status: order.status,
        paymentStatus: order.paymentStatus
      }
    });
  } catch (err) {
    console.error('Verify payment error:', err);
    next(err);
  }
};

