import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'

const OrderSuccessPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location.state?.order

  useEffect(() => {
    if (!order) {
      navigate('/')
    }
  }, [order, navigate])

  if (!order) {
    return null
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />
      
      <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your order has been placed successfully</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">{order.orderId || order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium text-[#8B7355]">₹{(order.finalTotal || order.total)?.toLocaleString('en-IN') || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">{order.status || 'Confirmed'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              We've sent a confirmation email with your order details. You will receive updates about your order via email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-[#8B7355] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] font-semibold rounded-lg hover:bg-[#8B7355] hover:text-white transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrderSuccessPage

