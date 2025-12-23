import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'

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

                if (productsResult.success) setProducts(productsResult.data)
                if (categoryResult.success) setCategoryInfo(categoryResult.data)
            } catch (error) {
                console.error('Error fetching murti category data:', error)
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
            <div className="relative w-full overflow-hidden" style={{ height: '300px' }}>
                <img
                    src={categoryInfo?.heroSection?.image?.url || 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1b?auto=format&fit=crop&q=80&w=2000'}
                    alt={categoryInfo?.name || title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10 px-4 text-white">
                    <h1 className="text-3xl md:text-5xl font-serif italic mb-4 font-bold drop-shadow-lg">
                        {categoryInfo?.heroSection?.title || categoryInfo?.name || title}
                    </h1>
                    {(categoryInfo?.heroSection?.subtitle || subtitle) && (
                        <p className="text-white/90 text-center max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md">
                            {categoryInfo?.heroSection?.subtitle || subtitle}
                        </p>
                    )}
                </div>
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
                            {products.map((product) => (
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
                                            src={product.images?.[0]?.url || product.image?.url || (typeof product.images?.[0] === 'string' ? product.images[0] : null)}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#8B7355] transition-colors">
                                            {product.name}
                                        </h3>
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

export default MurtiCategoryTemplate
