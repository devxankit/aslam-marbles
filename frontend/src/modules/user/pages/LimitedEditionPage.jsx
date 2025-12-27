import { useNavigate } from 'react-router-dom'
import CreationsNavBar from '../../../components/layout/CreationsNavBar'
import Footer from '../../../components/layout/Footer'
import FloatingButtons from '../../../components/common/FloatingButtons'
import { getProductsByCategorySlug } from '../../../data/generatedProducts'
import { useCartAndLikes } from '../../../contexts/CartAndLikesContext'

const LimitedEditionPage = ({ onShowCart, onShowLikes }) => {
  const navigate = useNavigate()
  const { toggleLike, isLiked } = useCartAndLikes()

  // Get products for the limited edition category
  const products = getProductsByCategorySlug('limited-series', 'limited')

  return (
    <div className="w-full min-h-screen bg-white">
      <CreationsNavBar onShowCart={onShowCart} onShowLikes={onShowLikes} />

      {/* Banner Section */}
      <div className="w-full py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-[#8B7355] italic mb-4 font-bold tracking-tight">
            Limited Edition
          </h1>
          <div className="w-24 h-1 bg-[#8B7355] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Exquisite, rare, and handcrafted masterpieces. Our limited edition collection represents the pinnacle of marble craftsmanship.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/limited-edition/limited-series/${product.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col border border-gray-100"
              >
                {/* Image Container - Smaller size as requested */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(product)
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all shadow-sm z-10"
                  >
                    <svg
                      className={`w-5 h-5 ${isLiked(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
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
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355] font-bold">Rare Masterpiece</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#8B7355] transition-colors font-serif">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-[#8B7355] mb-4">₹{product.price.toLocaleString('en-IN')}</p>
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
                        onClick={() => navigate(`/limited-edition/limited-series/${product.id}`)}
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
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default LimitedEditionPage
