import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const ShippingPage = ({ onShowCart, onShowLikes }) => {
  const { getTranslatedText } = usePageTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(null)
  const [checkoutItems, setCheckoutItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Get data from location state
    if (location.state?.formData && location.state?.items) {
      setFormData(location.state.formData)
      setCheckoutItems(location.state.items)
      setSubtotal(location.state.subtotal || 0)
      setShippingCost(location.state.shippingCost || 0)
      setTotal(location.state.total || location.state.subtotal || 0)
    } else {
      // If no data, redirect to checkout
      navigate('/checkout')
    }
  }, [location.state, navigate])

  const handleReturnToInfo = () => {
    navigate('/checkout', {
      state: {
        items: checkoutItems,
        formData: formData
      }
    })
  }

  const handleContinueToPayment = async () => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken')
    if (!token) {
      // Redirect to login with return path
      navigate('/login', {
        state: {
          from: '/checkout/shipping',
          checkoutData: { formData, checkoutItems, subtotal, shippingCost, total }
        }
      })
      return
    }

    // Get user info
    let userId = null
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        userId = user._id || user.id
      } else {
        // Fetch user profile
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const res = await fetch(`${API_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          userId = data.user._id || data.user.id
        }
      }
    } catch (err) {
      console.error('Error fetching user:', err)
      navigate('/login', {
        state: { from: '/checkout/shipping', checkoutData: { formData, checkoutItems, subtotal, shippingCost, total } }
      })
      return
    }

    if (!userId) {
      alert(getTranslatedText('Please login to continue'))
      navigate('/login', {
        state: { from: '/checkout/shipping', checkoutData: { formData, items: checkoutItems, subtotal, shippingCost, total } }
      })
      return
    }

    // Validate form data before proceeding
    if (!formData.email && !formData.phone) {
      alert(getTranslatedText('Please provide email or phone number'))
      return
    }

    if (!formData.address || !formData.city || !formData.state || !formData.pinCode) {
      alert(getTranslatedText('Please provide complete shipping address'))
      return
    }

    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_8sYbzHWidwe5Zw'

      // Prepare customer details - only include fields with values
      const customerDetails = {
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
        firstName: formData.firstName?.trim() || undefined,
        lastName: formData.lastName?.trim() || undefined,
        address: formData.address?.trim() || '',
        apartment: formData.apartment?.trim() || undefined,
        city: formData.city?.trim() || '',
        state: formData.state?.trim() || '',
        pinCode: formData.pinCode?.trim() || '',
        country: formData.country?.trim() || 'India'
      }

      // Remove undefined values (but keep empty strings for required fields)
      Object.keys(customerDetails).forEach(key => {
        if (customerDetails[key] === undefined) {
          delete customerDetails[key];
        }
      });

      // Create order
      const orderRes = await fetch(`${API_URL}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: checkoutItems,
          customerDetails: customerDetails,
          shippingMethod: 'standard',
          shippingCost: shippingCost,
          subtotal: subtotal,
          total: total
        })
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.message || 'Failed to create order')
      }

      // Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Aslam Marble Suppliers',
        description: `Order for ${checkoutItems.length} item(s)`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Verify payment
          try {
            const verifyRes = await fetch(`${API_URL}/payments/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderData.orderData
              })
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok && verifyData.success) {
              alert(getTranslatedText('Payment successful! Your order has been placed.'))
              navigate('/order-success', {
                state: {
                  order: verifyData.order
                }
              })
            } else {
              throw new Error(verifyData.message || 'Payment verification failed')
            }
          } catch (err) {
            console.error('Payment verification error:', err)
            alert(getTranslatedText('Payment verification failed. Please contact support.'))
          }
        },
        prefill: {
          name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Customer',
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#8B7355'
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          }
        }
      }

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options)
        razorpay.open()
        setLoading(false)
      } else {
        throw new Error('Razorpay SDK not loaded')
      }
    } catch (error) {
      console.error('Payment error:', error)

      // Handle Unauthorized error specifically
      if (error.message && error.message.toLowerCase().includes('unauthorized')) {
        alert(getTranslatedText('Your session has expired. Please login again.'))
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        navigate('/login', {
          state: {
            from: '/checkout/shipping',
            checkoutData: { formData, items: checkoutItems, subtotal, shippingCost, total }
          }
        })
        return
      }

      alert(error.message || 'Failed to initiate payment. Please try again.')
      setLoading(false)
    }
  }

  if (!formData || checkoutItems.length === 0) {
    return null
  }

  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Customer'
  const fullAddress = `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.pinCode} ${formData.state}, ${formData.country}`

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Contact and Shipping Address Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          {/* Contact */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1"><TranslatedText>Contact</TranslatedText></p>
              <p className="text-base font-medium text-gray-900">{formData.email || formData.phone}</p>
            </div>
            <button
              onClick={handleReturnToInfo}
              className="text-[#8B7355] hover:underline font-medium text-sm"
            >
              Change
            </button>
          </div>

          {/* Ship to */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1"><TranslatedText>Ship to</TranslatedText></p>
              <p className="text-base font-medium text-gray-900">{fullAddress}</p>
            </div>
            <button
              onClick={handleReturnToInfo}
              className="text-[#8B7355] hover:underline font-medium text-sm"
            >
              Change
            </button>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4"><TranslatedText>Shipping method</TranslatedText></h2>
          <div className="bg-[#F5F0E8] rounded-lg p-6 border-2 border-[#8B7355] relative">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Shipping!</h3>
                <p className="text-sm text-gray-600">
                  Final cost depends on product weight and distance. We'll email you the shipping amount after checkout.
                </p>
              </div>
              <div className="ml-4">
                <span className="text-lg font-bold text-gray-900"><TranslatedText>FREE</TranslatedText></span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleReturnToInfo}
            className="text-[#8B7355] hover:underline font-medium"
          >
            ← <TranslatedText>Return to information</TranslatedText>
          </button>
          <button
            onClick={handleContinueToPayment}
            disabled={loading}
            className="px-8 py-3 bg-[#8B7355] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <TranslatedText>Processing...</TranslatedText> : <TranslatedText>Continue to payment</TranslatedText>}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ShippingPage

