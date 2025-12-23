import { useCartAndLikes } from '../../contexts/CartAndLikesContext'

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useCartAndLikes()
  const cartItems = cart

  return (
    <>
      {/* Sidebar - No overlay, background page fully visible */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 md:w-[450px] bg-white z-[115] shadow-2xl transform transition-transform duration-500 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl md:text-2xl font-bold text-black uppercase">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-4 md:p-6">
          {cartItems.length === 0 ? (
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm md:text-base font-bold text-[#8B7355] mb-2">
                      ₹ {item.price.toLocaleString('en-IN')}
                    </p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <span className="text-sm">-</span>
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        <span className="text-sm">+</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-[#8B7355]">
                    ₹ {getCartTotal().toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  className="w-full py-3 text-white font-bold uppercase tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: '#8B7355' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7a6349'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8B7355'}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartModal

