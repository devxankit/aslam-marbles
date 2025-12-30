import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, Share2, ShoppingCart, Minus, Plus, Check } from 'lucide-react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'
import LazyImage from '../../../components/common/LazyImage'
import TranslatedText from '../../../components/TranslatedText'

const ShopByProductDetailPage = ({
    onShowCart,
    onShowLikes,
    onShowBooking
}) => {
    const { section, category, productId } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [showShareDropdown, setShowShareDropdown] = useState(false)
    const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false)
    const [showShipping, setShowShipping] = useState(false)
    const shareDropdownRef = useRef(null)

    const { addToCart, toggleLike, isLiked } = useCartAndLikes()
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    // Fetch product
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/shop-by-products/${section}/${category}`)
                const data = await res.json()
                if (data.success) {
                    const foundProduct = data.data.find(p => p._id === productId)
                    setProduct(foundProduct)
                }
            } catch (error) {
                console.error('Failed to fetch product:', error)
            } finally {
                setLoading(false)
            }
        }
        if (section && category && productId) {
            fetchProduct()
        }
    }, [section, category, productId, API_URL])

    // Close share dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
                setShowShareDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleAddToCart = () => {
        if (!product) return
        const cartProduct = {
            id: product._id,
            name: product.name,
            price: product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0,
            image: product.images && product.images[0] ? product.images[0].url : '',
            category: `${section}/${category}`,
            quantity
        }
        addToCart(cartProduct)
    }

    const handleBuyNow = () => {
        handleAddToCart()
        navigate('/checkout')
    }

    const handleToggleLike = () => {
        if (!product) return
        const likeProduct = {
            id: product._id,
            name: product.name,
            price: product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0,
            image: product.images && product.images[0] ? product.images[0].url : '',
            category: `${section}/${category}`
        }
        toggleLike(likeProduct)
    }

    const handleShare = (platform) => {
        const url = window.location.href
        const text = `Check out ${product?.name} on Tilak Stone Art`

        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            copy: url
        }

        if (platform === 'copy') {
            navigator.clipboard.writeText(url)
            alert('Link copied to clipboard!')
        } else {
            window.open(shareUrls[platform], '_blank')
        }
        setShowShareDropdown(false)
    }

    const formatCategoryName = (slug) => {
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4"><TranslatedText>Product Not Found</TranslatedText></h2>
                    <button
                        onClick={() => navigate(`/shop-by/${section}/${category}`)}
                        className="px-6 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#725e45] transition-colors"
                    >
                        <TranslatedText>Back to Collection</TranslatedText>
                    </button>
                </div>
            </div>
        )
    }

    const productPrice = product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0

    return (
        <>
            <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

            <div className="min-h-screen bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                        <span onClick={() => navigate('/')} className="cursor-pointer hover:text-[#8B7355]">Home</span>
                        <span>/</span>
                        <span onClick={() => navigate('/shop-by')} className="cursor-pointer hover:text-[#8B7355]">Shop By</span>
                        <span>/</span>
                        <span onClick={() => navigate(`/shop-by/${section}/${category}`)} className="cursor-pointer hover:text-[#8B7355]">
                            {formatCategoryName(category)}
                        </span>
                        <span>/</span>
                        <span className="text-[#8B7355] font-medium">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                {product.images && product.images[selectedImageIndex] ? (
                                    <LazyImage
                                        src={product.images[selectedImageIndex].url}
                                        alt={product.name}
                                        className="w-full h-full"
                                        imageClassName="w-full h-full object-cover"
                                        priority={true}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-5 gap-3">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                                ? 'border-[#8B7355] ring-2 ring-[#8B7355]/30'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <img src={img.url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Title & Price */}
                            <div>
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-[#8B7355] bg-[#8B7355]/10 rounded-full mb-3">
                                    {formatCategoryName(category)}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                                <div className="flex items-baseline gap-3">
                                    {product.price === 'Price on Request' ? (
                                        <p className="text-2xl font-bold text-[#8B7355]">Price on Request</p>
                                    ) : (
                                        <p className="text-3xl font-bold text-[#8B7355]">₹{productPrice.toLocaleString()}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2"><TranslatedText>Description</TranslatedText></h3>
                                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><TranslatedText>Quantity</TranslatedText></label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-6 py-3 border-x border-gray-300 font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-[#8B7355] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#725e45] transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    <TranslatedText>Buy Now</TranslatedText>
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full border-2 border-[#8B7355] text-[#8B7355] py-4 rounded-lg font-semibold text-lg hover:bg-[#8B7355]/5 transition-colors"
                                >
                                    <TranslatedText>Add to Cart</TranslatedText>
                                </button>
                            </div>

                            {/* Like & Share */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleToggleLike}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${isLiked(product._id)
                                        ? 'border-red-500 text-red-500 bg-red-50'
                                        : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                >
                                    <Heart size={20} className={isLiked(product._id) ? 'fill-current' : ''} />
                                    <span className="font-medium">{isLiked(product._id) ? 'Liked' : 'Add to Wishlist'}</span>
                                </button>

                                <div className="relative" ref={shareDropdownRef}>
                                    <button
                                        onClick={() => setShowShareDropdown(!showShareDropdown)}
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
                                    >
                                        <Share2 size={20} />
                                        <span className="font-medium">Share</span>
                                    </button>

                                    {showShareDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            {['whatsapp', 'facebook', 'twitter', 'linkedin', 'copy'].map((platform) => (
                                                <button
                                                    key={platform}
                                                    onClick={() => handleShare(platform)}
                                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors capitalize"
                                                >
                                                    {platform === 'copy' ? 'Copy Link' : platform}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Technical Specifications */}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="border-t border-gray-200 pt-6">
                                    <button
                                        onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                                        className="w-full flex items-center justify-between py-3 text-left"
                                    >
                                        <span className="text-lg font-semibold text-gray-900"><TranslatedText>Product Details</TranslatedText></span>
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
                                        <div className="mt-4 space-y-3">
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                                    <span className="text-gray-600 capitalize">{key}:</span>
                                                    <span className="font-medium text-gray-900">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Shipping Info */}
                            <div className="border-t border-gray-200 pt-6">
                                <button
                                    onClick={() => setShowShipping(!showShipping)}
                                    className="w-full flex items-center justify-between py-3 text-left"
                                >
                                    <span className="text-lg font-semibold text-gray-900"><TranslatedText>Shipping & Returns</TranslatedText></span>
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
                                    <div className="mt-4 space-y-3 text-sm text-gray-600">
                                        <div className="flex items-start gap-2">
                                            <Check size={16} className="text-green-600 mt-0.5" />
                                            <p><TranslatedText>Free shipping on orders above ₹10,000</TranslatedText></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check size={16} className="text-green-600 mt-0.5" />
                                            <p><TranslatedText>Delivery within 7-14 working days</TranslatedText></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check size={16} className="text-green-600 mt-0.5" />
                                            <p><TranslatedText>Easy returns within 7 days of delivery</TranslatedText></p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingButtons onChatClick={onShowBooking} />
        </>
    )
}

export default ShopByProductDetailPage
