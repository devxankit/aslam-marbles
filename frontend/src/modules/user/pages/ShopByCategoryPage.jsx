import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import Breadcrumb from '../../../components/common/Breadcrumb'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'
import LazyImage from '../../../components/common/LazyImage'

const ShopByCategoryPage = ({
    onShowCart,
    onShowLikes,
    onShowBooking
}) => {
    const { section, category } = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { addToCart, toggleLike, isLiked } = useCartAndLikes()

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/shop-by-products/${section}/${category}`)
                const data = await res.json()
                if (data.success) {
                    setProducts(data.data)
                }
            } catch (error) {
                console.error('Failed to fetch ShopBy products', error)
            } finally {
                setLoading(false)
            }
        }
        if (section && category) {
            fetchProducts()
        }
    }, [section, category, API_URL])

    const formatCategoryName = (slug) => {
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop By', path: '#' },
        { label: section.charAt(0).toUpperCase() + section.slice(1), path: '#' },
        { label: formatCategoryName(category), path: '#' }
    ]

    return (
        <>
            <CreationsNavBar
                onShowCart={onShowCart}
                onShowLikes={onShowLikes}
            />

            <div className="bg-white min-h-screen pb-16">
                {/* Hero Section */}
                <div className="bg-[#f8f5f2] py-12 md:py-20 text-center px-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c2c2c] mb-4 uppercase tracking-widest">
                        {formatCategoryName(category)}
                    </h1>
                    <div className="w-24 h-1 bg-[#8B7355] mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto font-light">
                        Discover our exclusive collection for {formatCategoryName(category)}
                    </p>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-8">
                    <Breadcrumb items={breadcrumbItems} />

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="max-w-md mx-auto">
                                <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Yet</h3>
                                <p className="text-gray-600 mb-6">
                                    This category is ready for products! Add your first product via the admin panel.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={() => navigate('/shop-by')}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#8B7355] hover:text-[#8B7355] transition-colors font-medium"
                                    >
                                        Browse All Categories
                                    </button>
                                    {localStorage.getItem('adminToken') && (
                                        <button
                                            onClick={() => navigate('/admin/content/shop-by')}
                                            className="px-6 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#725e45] transition-colors font-medium"
                                        >
                                            Add Products (Admin)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8 mt-8">
                            {products.map(product => {
                                const previewImage = product.images?.[0]?.url || 'https://via.placeholder.com/400x500?text=Image+Coming+Soon';

                                const handleAddToCart = (e) => {
                                    e.stopPropagation();
                                    const cartProduct = {
                                        id: product._id,
                                        productId: product._id,
                                        name: product.name,
                                        price: product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0,
                                        image: previewImage,
                                        category: `${section}/${category}`,
                                        quantity: 1
                                    }
                                    addToCart(cartProduct)
                                    alert('Added to cart!')
                                };

                                const handleBuyNow = (e) => {
                                    e.stopPropagation();
                                    const cartProduct = {
                                        id: product._id,
                                        productId: product._id,
                                        name: product.name,
                                        price: product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0,
                                        image: previewImage,
                                        category: `${section}/${category}`,
                                        quantity: 1
                                    }
                                    addToCart(cartProduct)
                                    navigate('/checkout')
                                };

                                const handleToggleLikeLocal = (e) => {
                                    e.stopPropagation();
                                    const likeProduct = {
                                        id: product._id,
                                        name: product.name,
                                        price: product.price === 'Price on Request' ? 0 : parseFloat(product.price) || 0,
                                        image: previewImage,
                                        category: `${section}/${category}`
                                    }
                                    toggleLike(likeProduct)
                                };

                                return (
                                    <div
                                        key={product._id}
                                        onClick={() => navigate(`/shop-by/${section}/${category}/${product._id}`)}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    >
                                        {/* Image Container */}
                                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                                            <LazyImage
                                                src={previewImage}
                                                alt={product.name}
                                                className="w-full h-full"
                                                imageClassName="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                width={400}
                                            />

                                            {/* Like Button */}
                                            <button
                                                onClick={handleToggleLikeLocal}
                                                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 z-10"
                                            >
                                                <Heart
                                                    size={20}
                                                    className={`transition-colors ${isLiked(product._id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-600 hover:text-red-500'
                                                        }`}
                                                />
                                            </button>

                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-[#8B7355] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                                                    title="Add to Cart"
                                                >
                                                    <ShoppingCart className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={handleBuyNow}
                                                    className="bg-[#8B7355] text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#8B7355] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/shop-by/${section}/${category}/${product._id}`);
                                                    }}
                                                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-[#8B7355] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                                                    title="View Details"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-[#8B7355] transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>

                                            {product.description && (
                                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {product.price && (
                                                        <p className="text-xl font-bold text-[#8B7355]">
                                                            {product.price === 'Price on Request'
                                                                ? 'Price on Request'
                                                                : `₹${parseFloat(product.price).toLocaleString('en-IN')}`}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <FloatingButtons
                onChatClick={onShowBooking}
            />
        </>
    )
}

export default ShopByCategoryPage
