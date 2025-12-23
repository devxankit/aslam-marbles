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
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-[#8B7355]' : 'border-gray-200'
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
                className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${
                  productIsLiked
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
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default IndividualProductDetailPage

