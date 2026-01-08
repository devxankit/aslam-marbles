import { createContext, useContext, useState, useEffect } from 'react'
import baseClient from '../services/api/baseClient'

const CartAndLikesContext = createContext()

export const useCartAndLikes = () => {
  const context = useContext(CartAndLikesContext)
  if (!context) {
    throw new Error('useCartAndLikes must be used within CartAndLikesProvider')
  }
  return context
}

export const CartAndLikesProvider = ({ children }) => {
  const [isSyncing, setIsSyncing] = useState(false)

  // Load cart and likes from localStorage on mount
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  const [likes, setLikes] = useState(() => {
    try {
      const savedLikes = localStorage.getItem('likes')
      return savedLikes ? JSON.parse(savedLikes) : []
    } catch {
      return []
    }
  })

  // Sync with backend on mount if logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchWishlist()
    }
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await baseClient.get('/users/wishlist')
      if (res.data.success) {
        setLikes(res.data.wishlist)
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err)
    }
  }

  // Save to localStorage whenever cart or likes change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes))
  }, [likes])

  // Add to cart
  const addToCart = (product, quantity = 1, size = null) => {
    const cartItem = {
      id: product.id || product._id || `${product.name}-${Date.now()}`,
      productId: product.id || product._id,
      name: product.name,
      image: (product.images?.[0]?.url || product.images?.[0] || product.image?.url || product.image),
      price: product.price,
      quantity: quantity,
      size: size,
      sku: product.sku,
      type: product.type // added for consistency
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.productId === cartItem.productId && item.size === cartItem.size
      )

      if (existingIndex >= 0) {
        const updatedCart = [...prevCart]
        updatedCart[existingIndex].quantity += quantity
        return updatedCart
      } else {
        return [...prevCart, cartItem]
      }
    })
  }

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  // Update cart item quantity
  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Toggle like (with backend sync)
  const toggleLike = async (product) => {
    const productId = product.id || product._id
    const isLikedLocally = likes.some(item => item.productId === productId)

    // Update local state first
    if (isLikedLocally) {
      setLikes(prev => prev.filter(item => item.productId !== productId))
    } else {
      const likeItem = {
        productId: productId,
        name: product.name,
        image: (product.images?.[0]?.url || product.images?.[0] || product.image?.url || product.image),
        price: product.price || 0,
        type: product.type || 'product'
      }
      setLikes(prev => [...prev, likeItem])
    }

    // Sync with backend if logged in
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await baseClient.post('/users/wishlist/toggle', {
          productId: productId,
          name: product.name,
          image: (product.images?.[0]?.url || product.images?.[0] || product.image?.url || product.image),
          price: product.price || 0,
          type: product.type || 'product'
        })
      } catch (err) {
        console.error('Error toggling wishlist on backend:', err)
        // Optionally revert local state on error
      }
    }
  }

  // Check if product is liked
  const isLiked = (productId) => {
    if (!productId) return false
    return likes.some(item => item.productId === productId)
  }

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    likes,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isLiked,
    toggleLike,
    getCartTotal,
    getCartCount,
    fetchWishlist // exposed if needed
  }

  return (
    <CartAndLikesContext.Provider value={value}>
      {children}
    </CartAndLikesContext.Provider>
  )
}
