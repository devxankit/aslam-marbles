import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'

const CheckoutPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, getCartTotal, clearCart } = useCartAndLikes()
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    emailNews: false,
    saveInfo: false
  })

  // Get items from cart or location state (for direct buy now)
  const [checkoutItems, setCheckoutItems] = useState([])

  useEffect(() => {
    // If items passed via location state (Buy Now), use those, otherwise use cart
    if (location.state?.items) {
      setCheckoutItems(location.state.items)
    } else if (cart.length > 0) {
      setCheckoutItems(cart)
    } else {
      // If no items, redirect to home
      navigate('/')
    }
  }, [location.state, cart, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const calculateSubtotal = () => {
    return checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const subtotal = calculateSubtotal()
  const shipping = 0 // Will be calculated at next step
  const total = subtotal + shipping

  const handleContinueToShipping = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.email && !formData.phone) {
      alert('Please enter email or phone number')
      return
    }
    if (!formData.lastName || !formData.address || !formData.city || !formData.state || !formData.pinCode) {
      alert('Please fill all required shipping fields')
      return
    }

    // Navigate to shipping/payment page
    navigate('/checkout/shipping', {
      state: {
        formData,
        items: checkoutItems,
        subtotal,
        shipping,
        total
      }
    })
  }

  if (checkoutItems.length === 0) {
    return null
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Section - Contact and Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleContinueToShipping}>
              {/* Contact Section */}
              <div className="bg-white rounded-lg p-6 md:p-8 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact</h2>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-[#8B7355] hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email or mobile phone number"
                    className="w-full px-4 py-3 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:ring-offset-2 transition-all"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNews"
                    name="emailNews"
                    checked={formData.emailNews}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#8B7355] border-gray-300 rounded focus:ring-[#8B7355]"
                  />
                  <label htmlFor="emailNews" className="ml-2 text-sm text-gray-700">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shipping address</h2>
                
                {/* Country/Region */}
                <div className="mb-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name (optional)"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4 relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Apartment */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                  />
                </div>

                {/* City, State, PIN Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State/Province/Region"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="PIN code/Zip/Postal Code"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-[#8B7355] transition-all"
                    />
                  </div>
                </div>

                {/* Save Info Checkbox */}
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#8B7355] border-gray-300 rounded focus:ring-[#8B7355]"
                  />
                  <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                    Save this information for next time
                  </label>
                </div>

                {/* Continue Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#8B7355] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Continue to shipping
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Product Items */}
              <div className="space-y-4 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className="text-xs text-gray-600 mb-1">{item.size}</p>
                      )}
                      <p className="text-sm font-bold text-[#8B7355]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="border-t border-gray-300 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-700">Shipping</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#8B7355]">INR ₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutPage

