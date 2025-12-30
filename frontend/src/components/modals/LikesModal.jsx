import { useCartAndLikes } from '../../contexts/CartAndLikesContext'
import TranslatedText from '../TranslatedText'
import { usePageTranslation } from '../../hooks/usePageTranslation'

const LikesModal = ({ isOpen, onClose }) => {
  const { likes, removeFromLikes, addToCart } = useCartAndLikes()
  const likedItems = likes
  const { getTranslatedText } = usePageTranslation(['Added to cart!'], 'en')

  return (
    <>
      {/* Sidebar - No overlay, background page fully visible */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 md:w-[450px] bg-white z-[115] shadow-2xl transform transition-transform duration-500 ease-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl md:text-2xl font-bold text-black uppercase"><TranslatedText>Liked Items</TranslatedText></h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-4 md:p-6">
          {likedItems.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
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
              <p className="text-gray-600 text-lg"><TranslatedText>No liked items yet</TranslatedText></p>
            </div>
          ) : (
            <div className="space-y-4">
              {likedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                      <TranslatedText>{item.name}</TranslatedText>
                    </h3>
                    <p className="text-sm md:text-base font-bold text-[#8B7355] mb-3">
                      ₹ {item.price.toLocaleString('en-IN')}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(item, 1, item.size)
                          alert(getTranslatedText('Added to cart!'))
                        }}
                        className="flex-1 py-2 px-4 text-sm font-semibold uppercase tracking-wide rounded-lg transition-all duration-300 border-2"
                        style={{
                          borderColor: '#8B7355',
                          color: '#8B7355',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#8B7355'
                          e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = '#8B7355'
                        }}
                      >
                        <TranslatedText>Add to Cart</TranslatedText>
                      </button>
                      <button
                        onClick={() => removeFromLikes(item.productId)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default LikesModal

