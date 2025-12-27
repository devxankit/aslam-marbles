import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

// Import local data fallbacks
import { ganeshaProducts } from '../../../data/ganeshaProducts'
import { hanumanProducts } from '../../../data/hanumanProducts'
import { krishnaProducts } from '../../../data/krishnaProducts'
import { shivProducts } from '../../../data/shivProducts'
import { jainMurtiProducts } from '../../../data/jainMurtiProducts'
import { nandiProducts } from '../../../data/nandiProducts'
import { balajiProducts } from '../../../data/balajiProducts'
import { radhaKrishnaProducts } from '../../../data/radhaKrishnaProducts'
import { ramDarbarProducts } from '../../../data/ramDarbarProducts'
import { durgaProducts } from '../../../data/durgaProducts'
import { saraswatiProducts } from '../../../data/saraswatiProducts'
import { shivParvatiProducts } from '../../../data/shivParvatiProducts'
import { saiBabaProducts } from '../../../data/saiBabaProducts'
import { vishnuLaxmiProducts } from '../../../data/vishnuLaxmiProducts'

const MurtiCategoryTemplate = ({
    categoryId,
    title,
    subtitle,
    onShowSidebar,
    onShowProjects,
    onShowCreations,
    onShowServices,
    onShowHowItWorks,
    onShowLocation,
    onShowBooking
}) => {
    const navigate = useNavigate()
    const { addToCart, toggleLike, isLiked } = useCartAndLikes()
    const [products, setProducts] = useState([])
    const [categoryInfo, setCategoryInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [productsRes, categoryRes] = await Promise.all([
                    fetch(`${API_URL}/murtis/products/${categoryId}`),
                    fetch(`${API_URL}/murtis/category/${categoryId}`)
                ])

                const productsResult = await productsRes.json()
                const categoryResult = await categoryRes.json()

                let fetchedProducts = []
                if (productsResult.success) fetchedProducts = productsResult.data

                // Fallback to local data if backend is empty
                if (fetchedProducts.length === 0) {
                    const localDataMap = {
                        'ganesha': ganeshaProducts,
                        'hanuman': hanumanProducts,
                        'krishna-ji': krishnaProducts,
                        'krishna': krishnaProducts,
                        'shiva': shivProducts,
                        'shiv': shivProducts,
                        'jain-gods': jainMurtiProducts,
                        'jain-murti': jainMurtiProducts,
                        'nandi': nandiProducts,
                        'balaji': balajiProducts,
                        'radha-krishna': radhaKrishnaProducts,
                        'ram-darbar': ramDarbarProducts,
                        'durga': durgaProducts,
                        'saraswati': saraswatiProducts,
                        'shiv-parivar': shivParvatiProducts,
                        'shiv-parvati': shivParvatiProducts,
                        'sai-baba': saiBabaProducts,
                        'vishnu-laxmi': vishnuLaxmiProducts,
                        'laxmi': vishnuLaxmiProducts
                    }
                    fetchedProducts = localDataMap[categoryId] || []
                }

                setProducts(fetchedProducts)
                if (categoryResult.success) setCategoryInfo(categoryResult.data)
            } catch (error) {
                console.error('Error fetching murti category data:', error)

                // Final fallback if fetch itself fails
                const localDataMap = {
                    'ganesha': ganeshaProducts,
                    'hanuman': hanumanProducts,
                    'krishna-ji': krishnaProducts,
                    'krishna': krishnaProducts,
                    'shiva': shivProducts,
                    'shiv': shivProducts,
                    'jain-gods': jainMurtiProducts,
                    'jain-murti': jainMurtiProducts,
                    'nandi': nandiProducts,
                    'balaji': balajiProducts,
                    'radha-krishna': radhaKrishnaProducts,
                    'ram-darbar': ramDarbarProducts,
                    'durga': durgaProducts,
                    'saraswati': saraswatiProducts,
                    'shiv-parivar': shivParvatiProducts,
                    'shiv-parvati': shivParvatiProducts,
                    'sai-baba': saiBabaProducts,
                    'vishnu-laxmi': vishnuLaxmiProducts,
                    'laxmi': vishnuLaxmiProducts
                }
                setProducts(localDataMap[categoryId] || [])
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [categoryId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B7355]"></div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <CreationsNavBar
                onShowSidebar={onShowSidebar}
                onShowProjects={onShowProjects}
                onShowCreations={onShowCreations}
                onShowServices={onShowServices}
                onShowHowItWorks={onShowHowItWorks}
                onShowLocation={onShowLocation}
                onShowBooking={onShowBooking}
            />

            {/* Category Header */}
            <div className={`relative w-full overflow-hidden ${(!categoryInfo?.heroSection?.image?.url && !subtitle && !categoryInfo?.heroSection?.subtitle) ? 'py-12 md:py-16' : 'h-[300px]'}`}>
                {categoryInfo?.heroSection?.image?.url ? (
                    <>
                        <img
                            src={categoryInfo.heroSection.image.url}
                            alt={categoryInfo.name || title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10 px-4 text-white">
                            <h1 className="text-3xl md:text-5xl font-serif italic mb-4 font-bold drop-shadow-lg text-center">
                                {categoryInfo?.heroSection?.title || categoryInfo?.name || title || categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </h1>
                            {(categoryInfo?.heroSection?.subtitle || subtitle) && (
                                <p className="text-white/90 text-center max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md">
                                    {categoryInfo?.heroSection?.subtitle || subtitle}
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center bg-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#8B7355] italic mb-6 font-bold">
                            {title || (categoryInfo?.name ? `${categoryInfo.name} Collection` : `${categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Collection`)}
                        </h1>
                        <div className="w-24 h-1 bg-[#8B7355] mx-auto rounded-full mb-8"></div>
                        {(subtitle || categoryInfo?.heroSection?.subtitle) && (
                            <p className="text-gray-500 text-center max-w-2xl mx-auto text-lg">
                                {subtitle || categoryInfo?.heroSection?.subtitle}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto min-h-[400px]">
                    {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
                            <p className="text-gray-500 mt-2">New collection coming soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {products.map((product) => {
                                // Robust image extraction
                                const previewImage =
                                    (product.images?.[0]?.url) ||
                                    (product.image?.url) ||
                                    (typeof product.images?.[0] === 'string' ? product.images[0] : null) ||
                                    (typeof product.image === 'string' ? product.image : null) ||
                                    'https://via.placeholder.com/400x500?text=Image+Coming+Soon';

                                const handleAddToCart = (e) => {
                                    e.stopPropagation();
                                    addToCart(product, 1, product.size || 'Standard');
                                    alert('Added to cart!');
                                };

                                const handleBuyNow = (e) => {
                                    e.stopPropagation();
                                    navigate('/checkout', {
                                        state: {
                                            items: [{
                                                id: product.id || product._id,
                                                productId: product.id || product._id,
                                                name: product.name,
                                                image: previewImage,
                                                price: product.price,
                                                quantity: 1,
                                                size: product.size || 'Standard',
                                                sku: product.sku
                                            }]
                                        }
                                    });
                                };

                                return (
                                    <div
                                        key={product._id || product.id}
                                        onClick={() => navigate(`/murti/${categoryId}/${product._id || product.id}`)}
                                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    >
                                        {/* Image Container */}
                                        <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-100">
                                            {product.isPreOrder && (
                                                <div className="absolute top-3 left-3 z-10 bg-black rounded-full px-3 py-1">
                                                    <span className="text-white text-xs font-semibold uppercase">Pre Order</span>
                                                </div>
                                            )}
                                            <img
                                                src={previewImage}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            />
                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-[#8B7355] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={handleBuyNow}
                                                    className="bg-[#8B7355] text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-[#8B7355] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                                                >
                                                    Buy Now
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
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
                                                    <p className="text-xl font-bold text-[#8B7355]">
                                                        ₹ {product.price?.toLocaleString('en-IN')}
                                                    </p>
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
            <FloatingButtons />
        </div>
    )
}

export default MurtiCategoryTemplate
