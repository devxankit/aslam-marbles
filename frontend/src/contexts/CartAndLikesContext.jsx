import { createContext, useContext, useState, useEffect } from 'react'

const CartAndLikesContext = createContext()

export const useCartAndLikes = () => {
  const context = useContext(CartAndLikesContext)
  if (!context) {
    throw new Error('useCartAndLikes must be used within CartAndLikesProvider')
  }
  return context
}

export const CartAndLikesProvider = ({ children }) => {
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
      id: product.id || `${product.name}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.images?.[0] || product.image,
      price: product.price,
      quantity: quantity,
      size: size,
      sku: product.sku,
      ...product
    }

    setCart(prevCart => {
      // Check if item already exists in cart (same product, same size)
      const existingIndex = prevCart.findIndex(
        item => item.productId === cartItem.productId && item.size === cartItem.size
      )

      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart]
        updatedCart[existingIndex].quantity += quantity
        return updatedCart
      } else {
        // Add new item
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

  // Add to likes
  const addToLikes = (product) => {
    const likeItem = {
      id: product.id || `${product.name}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.images?.[0] || product.image,
      price: product.price,
      sku: product.sku,
      ...product
    }

    setLikes(prevLikes => {
      // Check if already liked
      const exists = prevLikes.some(item => item.productId === likeItem.productId)
      if (exists) {
        return prevLikes
      }
      return [...prevLikes, likeItem]
    })
  }

  // Remove from likes
  const removeFromLikes = (productId) => {
    setLikes(prevLikes => prevLikes.filter(item => item.productId !== productId))
  }

  // Check if product is liked
  const isLiked = (productId) => {
    return likes.some(item => item.productId === productId)
  }

  // Toggle like
  const toggleLike = (product) => {
    if (isLiked(product.id)) {
      removeFromLikes(product.id)
    } else {
      addToLikes(product)
    }
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
    addToLikes,
    removeFromLikes,
    isLiked,
    toggleLike,
    getCartTotal,
    getCartCount
  }

  return (
    <CartAndLikesContext.Provider value={value}>
      {children}
    </CartAndLikesContext.Provider>
  )
}

