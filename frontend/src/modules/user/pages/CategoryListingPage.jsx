import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { getProductsByCategorySlug } from '../../../data/generatedProducts'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'
import TranslatedText from '../../../components/TranslatedText'
import { usePageTranslation } from '../../../contexts/PageTranslationContext'

const CategoryListingPage = ({
    onShowCart,
    onShowLikes
}) => {
    const { categoryId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { toggleLike, isLiked } = useCartAndLikes()
    const { getTranslatedText } = usePageTranslation()

    // Determine type based on URL
    let type = 'decor'
    if (location.pathname.includes('/furniture')) type = 'furniture'
    else if (location.pathname.includes('/limited-edition')) type = 'limited'
    else if (location.pathname.includes('/on-sale')) type = 'sale'

    const products = getProductsByCategorySlug(categoryId, type)

    // Format category name for display (e.g., 'center-tables' -> 'Center Tables')
    const categoryName = categoryId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return (
        <div className="w-full min-h-screen bg-white">
            <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

            {/* Category Header */}
            <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#8B7355] italic text-center mb-4 font-bold">
                        <TranslatedText>{categoryName}</TranslatedText> <TranslatedText>Collection</TranslatedText>
                    </h1>
                    <div className="w-24 h-1 bg-[#8B7355] mx-auto rounded-full"></div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => navigate(location.pathname + '/' + product.id)}
                                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                                        <img
                                            src={product.images[0]}
                                            alt={getTranslatedText(product.name)}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        />
                                        {/* Like Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleLike(product)
                                            }}
                                            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-all transform hover:scale-110 z-10"
                                        >
                                            <svg
                                                className={`w-5 h-5 ${isLiked(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                                                fill={isLiked(product.id) ? "currentColor" : "none"}
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
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#8B7355] transition-colors">
                                            <TranslatedText>{product.name}</TranslatedText>
                                        </h3>
                                        <div className="mt-auto">
                                            <p className="text-xl font-bold text-[#8B7355] mb-4">₹ {product.price.toLocaleString('en-IN')}</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/checkout`, {
                                                            state: {
                                                                items: [{
                                                                    ...product,
                                                                    quantity: 1
                                                                }]
                                                            }
                                                        })
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-[#8B7355] text-white font-semibold rounded hover:opacity-90 transition-all text-sm"
                                                >
                                                    <TranslatedText>Buy Now</TranslatedText>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/${type === 'decor' ? 'home-decor' : type}/${categoryId}/${product.id}`)}
                                                    className="flex-1 px-4 py-2 bg-white border border-[#8B7355] text-[#8B7355] font-semibold rounded hover:bg-[#8B7355] hover:text-white transition-all text-sm"
                                                >
                                                    <TranslatedText>Details</TranslatedText>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-400 font-serif italic"><TranslatedText>No products available in this category yet.</TranslatedText></p>
                            <button
                                onClick={() => navigate('/murti#shop-furniture')}
                                className="mt-8 px-8 py-3 bg-[#8B7355] text-white rounded hover:opacity-90 transition-opacity"
                            >
                                <TranslatedText>Back to Shop</TranslatedText>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    )
}

export default CategoryListingPage
