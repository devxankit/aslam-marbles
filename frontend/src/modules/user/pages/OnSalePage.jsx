import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const OnSalePage = ({ onShowCart, onShowLikes }) => {
    const navigate = useNavigate()
    const { toggleLike, isLiked } = useCartAndLikes()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/special-products/on-sale`)
                const data = await res.json()
                if (data.success) {
                    setProducts(data.data)
                }
            } catch (err) {
                console.error('Failed to fetch products', err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="w-full min-h-screen bg-white">
            <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

            {/* Banner Section */}
            <div className="w-full py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#F5F8F9]">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#8B7355] italic mb-4 font-bold tracking-tight">
                        On Sale
                    </h1>
                    <div className="w-24 h-1 bg-[#8B7355] mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Premium quality marble and stone products at exceptional values. Discover our exclusive offers on select pieces.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="w-full py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {products.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500 py-10">
                                    No products currently on sale.
                                </div>
                            ) : products.map((product) => (
                                <div
                                    key={product._id || product.id}
                                    onClick={() => navigate(`/on-sale/exclusive-offers/${product._id || product.id}`)}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col border border-gray-100"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                                        <img
                                            src={product.images && product.images[0] ? product.images[0].url : ''}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        />
                                        {/* Sale Tag */}
                                        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                            Sale
                                        </div>
                                        {/* Like Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleLike(product)
                                            }}
                                            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all shadow-sm z-10"
                                        >
                                            <svg
                                                className={`w-5 h-5 ${isLiked(product._id || product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                                                fill={isLiked(product._id || product.id) ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#8B7355] transition-colors font-serif">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-xl font-bold text-[#8B7355]">₹{product.price.toLocaleString('en-IN')}</p>
                                                    <p className="text-xs text-gray-400 line-through">₹{(product.price * 1.25).toLocaleString('en-IN')}</p>
                                                </div>
                                                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded">25% OFF</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate('/checkout', {
                                                            state: {
                                                                items: [{
                                                                    ...product,
                                                                    quantity: 1
                                                                }]
                                                            }
                                                        })
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-[#8B7355] text-white font-semibold rounded hover:opacity-90 transition-all text-xs"
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/on-sale/exclusive-offers/${product._id || product.id}`)}
                                                    className="flex-1 px-4 py-2 border border-[#8B7355] text-[#8B7355] font-semibold rounded hover:bg-[#8B7355] hover:text-white transition-all text-xs"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default OnSalePage
