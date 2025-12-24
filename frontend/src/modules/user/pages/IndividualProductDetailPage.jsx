import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { products } from '../../../data/products'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'

const IndividualProductDetailPage = ({
  onShowSidebar,
  onShowProjects,
  onShowCreations,
  onShowServices,
  onShowHowItWorks,
  onShowLocation,
  onShowBooking,
  onShowCart,
  onShowLikes
}) => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('12 Inches')
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false)
  const [showShipping, setShowShipping] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const sizeDropdownRef = useRef(null)
  const shareDropdownRef = useRef(null)

  // Available sizes
  const availableSizes = ['5', '6', '7', '9', '11', '12', '14', '15', '18', '19', '24', '30', '33']

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setShowSizeDropdown(false)
      }
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Find product from products data
  const product = products.find(p => p.id === parseInt(productId))

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#8B7355] text-white rounded-lg hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const { addToCart, toggleLike, isLiked } = useCartAndLikes()
  const productIsLiked = product ? isLiked(product.id) : false

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity, selectedSize)
    alert('Product added to cart!')
  }

  const handleAddToLikes = () => {
    if (!product) return
    toggleLike(product)
  }

  const handleBuyNow = () => {
    if (!product) return

    // Navigate to checkout page with product data
    navigate('/checkout', {
      state: {
        items: [{
          id: product.id,
          productId: product.id,
          name: product.name,
          image: product.images?.[0] || product.image,
          price: product.price,
          quantity: quantity,
          size: selectedSize,
          sku: product.sku
        }]
      }
    })
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? 'border-[#8B7355]' : 'border-gray-200'
                      }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              {product.price && (
                <p className="text-2xl md:text-3xl font-bold" style={{ color: '#8B7355' }}>
                  ₹{product.price.toLocaleString()}
                </p>
              )}
            </div>

            {product.description && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Size Selection */}
            <div className="relative" ref={sizeDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <button
                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between"
              >
                <span>{selectedSize} Inches</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSizeDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        setShowSizeDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {size} Inches
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-6 bg-[#8B7355] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToLikes}
                className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${productIsLiked
                  ? 'bg-[#8B7355] text-white border-[#8B7355]'
                  : 'border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white'
                  }`}
              >
                ♥
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="font-semibold">Technical Specifications</span>
                <svg
                  className={`w-5 h-5 transition-transform ${showTechnicalSpecs ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showTechnicalSpecs && (
                <div className="text-gray-600">
                  <p>Material: Premium Marble</p>
                  <p>Finish: Polished</p>
                  <p>Warranty: 1 Year</p>
                </div>
              )}

              <button
                onClick={() => setShowShipping(!showShipping)}
                className="w-full text-left flex items-center justify-between"
              >
                <span className="font-semibold">Shipping & Returns</span>
                <svg
                  className={`w-5 h-5 transition-transform ${showShipping ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showShipping && (
                <div className="text-gray-600">
                  <p>Free shipping on orders above ₹10,000</p>
                  <p>Delivery within 7-14 business days</p>
                  <p>30-day return policy</p>
                </div>
              )}
            </div>

            {/* Connect Button */}
            <button
              onClick={() => setShowContactModal(true)}
              className="w-full mt-6 bg-[#8B7355] text-white py-4 rounded-lg text-lg font-bold tracking-wide hover:bg-[#725E45] transition-all shadow-lg hover:shadow-xl uppercase transform hover:-translate-y-1"
            >
              Connect for more details
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#8B7355] px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-serif text-white tracking-wider uppercase">Contact Us</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h3>
                <p className="text-gray-500">We'd love to hear from you. Reach out to us for any queries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Location */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Location</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Borawar Byepass Road<br />Makrana, Rajasthan, India
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Email</h4>
                  <a href="mailto:aslammarble40@gmail.com" className="text-gray-600 hover:text-[#8B7355] transition-colors text-sm font-medium">
                    aslammarble40@gmail.com
                  </a>
                </div>

                {/* Call */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-[#fffbf0] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#8B7355]/20">
                    <svg className="w-8 h-8 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Call Us</h4>
                  <a href="tel:+917877639699" className="text-gray-600 hover:text-[#8B7355] transition-colors text-sm font-medium">
                    +91 7877639699
                  </a>
                </div>
              </div>

              {/* Action Button within Modal */}
              <div className="mt-12 text-center">
                <a
                  href="tel:+917877639699"
                  className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-full font-bold hover:bg-[#725E45] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default IndividualProductDetailPage

