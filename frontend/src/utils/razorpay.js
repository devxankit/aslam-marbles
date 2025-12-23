// Razorpay payment integration utility
// Make sure to load Razorpay script in index.html: <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

export const initiateRazorpayPayment = async (orderData, onSuccess, onError) => {
  try {
    // Call backend API to create order
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    const { order } = await response.json()

    // Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || '', // Your Razorpay Key ID
      amount: order.amount, // Amount in paise
      currency: order.currency || 'INR',
      name: 'Aslam Marble Suppliers',
      description: orderData.description || 'Product Purchase',
      order_id: order.id,
      handler: function (response) {
        // Payment successful
        verifyPayment(response, orderData, onSuccess, onError)
      },
      prefill: {
        name: orderData.customerName || '',
        email: orderData.customerEmail || '',
        contact: orderData.customerPhone || '',
      },
      theme: {
        color: '#8B7355',
      },
      modal: {
        ondismiss: function () {
          if (onError) {
            onError(new Error('Payment cancelled by user'))
          }
        },
      },
    }

    // Initialize Razorpay
    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } else {
      throw new Error('Razorpay SDK not loaded')
    }
  } catch (error) {
    console.error('Payment error:', error)
    if (onError) {
      onError(error)
    }
  }
}

// Verify payment with backend
const verifyPayment = async (paymentResponse, orderData, onSuccess, onError) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payments/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        orderData: orderData,
      }),
    })

    if (!response.ok) {
      throw new Error('Payment verification failed')
    }

    const result = await response.json()
    
    if (result.success) {
      if (onSuccess) {
        onSuccess(result)
      }
    } else {
      throw new Error(result.message || 'Payment verification failed')
    }
  } catch (error) {
    console.error('Verification error:', error)
    if (onError) {
      onError(error)
    }
  }
}

