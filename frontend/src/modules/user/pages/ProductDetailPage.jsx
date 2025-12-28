import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'
import { durgaProducts } from '../../../data/durgaProducts'
import { saraswatiProducts } from '../../../data/saraswatiProducts'
import { shivParvatiProducts } from '../../../data/shivParvatiProducts'
import { saiBabaProducts } from '../../../data/saiBabaProducts'
import { vishnuLaxmiProducts } from '../../../data/vishnuLaxmiProducts'
import { ganeshaProducts } from '../../../data/ganeshaProducts'
import { hanumanProducts } from '../../../data/hanumanProducts'
import { radhaKrishnaProducts } from '../../../data/radhaKrishnaProducts'
import { ramDarbarProducts } from '../../../data/ramDarbarProducts'
import { krishnaProducts } from '../../../data/krishnaProducts'
import { shivProducts } from '../../../data/shivProducts'
import { jainMurtiProducts } from '../../../data/jainMurtiProducts'
import { nandiProducts } from '../../../data/nandiProducts'
import { balajiProducts } from '../../../data/balajiProducts'
import { getProductById } from '../../../data/generatedProducts'
import LazyImage from '../../../components/common/LazyImage'

const ProductDetailPage = ({
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
  const { productId, category } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('12 Inches')
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showShareDropdown, setShowShareDropdown] = useState(false)
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false)
  const [showShipping, setShowShipping] = useState(false)
  const [backendProduct, setBackendProduct] = useState(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const sizeDropdownRef = useRef(null)
  const shareDropdownRef = useRef(null)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api'

  useEffect(() => {
    // Attempt to fetch from backend if ID looks like a Mongo ID or just try generic fetch
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/stone-products/${productId}`)
        if (res.ok) {
          const data = await res.json()
          setBackendProduct(data)
        }
      } catch (e) {
        console.log('Not a backend product or fetch failed')
      }
    }
    if (productId && productId.length === 24) {
      fetchProduct()
    }
  }, [productId])

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

  // Determine which product array to use based on the URL path
  const pathSegments = location.pathname.split('/')
  const categoryType = pathSegments[2] // /murti/[category]/productId

  let allProducts = []
  if (categoryType === 'ganesha') {
    allProducts = ganeshaProducts
  } else if (categoryType === 'hanuman') {
    allProducts = hanumanProducts
  } else if (categoryType === 'krishna-ji' || categoryType === 'krishna') {
    allProducts = krishnaProducts
  } else if (categoryType === 'shiva' || categoryType === 'shiv') {
    allProducts = shivProducts
  } else if (categoryType === 'jain-gods' || categoryType === 'jain-murti') {
    allProducts = jainMurtiProducts
  } else if (categoryType === 'nandi') {
    allProducts = nandiProducts
  } else if (categoryType === 'balaji') {
    allProducts = balajiProducts
  } else if (categoryType === 'radha-krishna') {
    allProducts = radhaKrishnaProducts
  } else if (categoryType === 'ram-darbar') {
    allProducts = ramDarbarProducts
  } else if (categoryType === 'durga') {
    allProducts = durgaProducts
  } else if (categoryType === 'saraswati') {
    allProducts = saraswatiProducts
  } else if (categoryType === 'shiv-parvati') {
    allProducts = shivParvatiProducts
  } else if (categoryType === 'sai-baba') {
    allProducts = saiBabaProducts
  } else if (categoryType === 'vishnu-laxmi') {
    allProducts = vishnuLaxmiProducts
  }

  let product = backendProduct || allProducts.find(p => p.id === productId)

  // If not found in murti products, check generated products (Furniture/Decor)
  if (!product) {
    product = getProductById(productId)
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    )
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const { addToCart, toggleLike, isLiked } = useCartAndLikes()
  const productIsLiked = product ? isLiked(product.id) : false

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity, selectedSize)
    alert('Product added to cart!')
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
          image: (product.images?.[0]?.url || product.images?.[0] || product.image?.url || product.image),
          price: product.price,
          quantity: quantity,
          size: selectedSize,
          sku: product.sku
        }]
      }
    })
  }

  const handleLike = () => {
    if (!product) return
    toggleLike(product)
  }

  // Get current page URL and share text
  const currentUrl = window.location.href
  const shareText = `${product.name} - ₹${product.price.toLocaleString('en-IN')} - ${product.description}`

  // Share functions
  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedText = encodeURIComponent(shareText)

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodedText}%20${encodedUrl}`
        break
      case 'copy':
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert('Link copied to clipboard!')
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea')
          textArea.value = currentUrl
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Link copied to clipboard!')
        })
        break
      default:
        break
    }
    setShowShareDropdown(false)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Product Detail Section */}
      <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Image Gallery */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[600px]">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImageIndex === index ? 'border-[#8B7355]' : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <LazyImage
                      src={typeof img === 'string' ? img : img?.url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full"
                      imageClassName="w-full h-full object-cover"
                      width={100}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <LazyImage
                  src={typeof product.images[selectedImageIndex] === 'string' ? product.images[selectedImageIndex] : product.images[selectedImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-contain"
                  width={800}
                  priority={true}
                />
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                {/* Fullscreen Icon */}
                <button className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Product Information */}
            <div className="flex flex-col">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl md:text-4xl font-bold text-[#8B7355] mb-1">
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* SKU */}
              <p className="text-sm text-gray-600 mb-6">SKU: {product.sku}</p>

              {/* Size Selection */}
              <div className="mb-6 relative" ref={sizeDropdownRef}>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Size</label>
                <button
                  onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                  className="flex items-center justify-between w-full max-w-xs px-4 py-3 border-2 border-[#8B7355] rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{selectedSize}</span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${showSizeDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSizeDropdown && (
                  <div className="absolute z-50 w-full max-w-xs mt-2 bg-white border-2 border-[#8B7355] rounded-lg shadow-lg overflow-hidden max-h-40 overflow-y-auto">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(`${size} Inches`)
                          setShowSizeDropdown(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${selectedSize === `${size} Inches` ? 'bg-[#8B7355] text-white' : 'text-gray-800'
                          }`}
                      >
                        {size} Inches
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Quantity</label>
                <div className="flex items-center gap-3 max-w-xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#8B7355] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1
                      if (val >= 1) setQuantity(val)
                    }}
                    className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#8B7355]"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#8B7355] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#8B7355] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#8B7355] text-white font-semibold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleLike}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-colors ${productIsLiked
                    ? 'border-[#8B7355] bg-[#8B7355] text-white'
                    : 'border-gray-300 hover:border-[#8B7355]'
                    }`}
                >
                  <svg className="w-6 h-6" fill={productIsLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-4 mb-6">
                {/* Technical Specs */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                    className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#8B7355] transition-colors"
                  >
                    <span>TECHNICAL SPECS</span>
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
                    <div className="mt-3 text-sm text-gray-600 space-y-2">
                      <p><strong>Material:</strong> {product.material}</p>
                      <p><strong>Size:</strong> {product.size}</p>
                      <p><strong>Weight:</strong> Custom</p>
                      <p><strong>Finish:</strong> Premium</p>
                    </div>
                  )}
                </div>

                {/* Shipping */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setShowShipping(!showShipping)}
                    className="w-full flex items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#8B7355] transition-colors"
                  >
                    <span>SHIPPING</span>
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
                    <div className="mt-3 text-sm text-gray-600 space-y-2">
                      <p>Free shipping on orders above ₹10,000</p>
                      <p>Delivery within 7-10 business days</p>
                      <p>Carefully packed and insured</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Store Availability */}
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Also Available at <a href="#" className="text-[#8B7355] font-semibold underline">Store</a></span>
              </div>

              {/* Share and Contact */}
              <div className="flex items-center gap-6 text-sm">
                {/* Share Dropdown */}
                <div className="relative" ref={shareDropdownRef}>
                  <button
                    onClick={() => setShowShareDropdown(!showShareDropdown)}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#8B7355] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  {showShareDropdown && (
                    <div className="absolute z-50 left-0 bottom-full mb-2 w-48 bg-white border-2 border-[#8B7355] rounded-lg shadow-xl overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto">
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('email')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Email</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#8B7355] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Consult with Expert</span>
                </button>
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

export default ProductDetailPage
