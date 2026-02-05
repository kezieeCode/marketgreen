import { createContext, useContext, useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api.js'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoadingCart, setIsLoadingCart] = useState(false)

  // Get token from localStorage (we can't use useAuth here due to circular dependency)
  const getToken = () => {
    return localStorage.getItem('token')
  }

  // Normalize cart item from API response to UI format
  const normalizeCartItem = (apiItem) => {
    // API might return item with product object or direct fields
    const product = apiItem.product || apiItem
    return {
      id: apiItem.id || apiItem.cart_item_id, // Cart item UUID
      productId: product.id || apiItem.product_id || apiItem.productId,
      name: product.name || apiItem.name,
      price: Number(product.current_price || product.price || apiItem.price || 0),
      originalPrice: Number(product.original_price || product.originalPrice || apiItem.originalPrice || 0),
      image: product.main_image || product.image_url || apiItem.image || '',
      quantity: Number(apiItem.quantity || 1)
    }
  }

  // Fetch cart from API
  const fetchCart = async () => {
    const token = getToken()
    if (!token) {
      // If not authenticated, use localStorage as fallback
      const savedCart = localStorage.getItem('marketgreen_cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
      return
    }

    setIsLoadingCart(true)
    try {
      const response = await fetch(API_ENDPOINTS.CART.LIST, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Handle both array response and object with items property
        const itemsList = Array.isArray(data) ? data : (data.items || data.cart || [])
        const normalizedItems = itemsList.map(normalizeCartItem)
        setCartItems(normalizedItems)
      } else if (response.status === 404) {
        // Cart doesn't exist yet, start with empty cart
        setCartItems([])
      } else {
        console.error('Error fetching cart:', response.status)
        // Fallback to localStorage on error
        const savedCart = localStorage.getItem('marketgreen_cart')
        if (savedCart) {
          try {
            setCartItems(JSON.parse(savedCart))
          } catch (error) {
            console.error('Error loading cart from localStorage:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      // Fallback to localStorage on network error
      const savedCart = localStorage.getItem('marketgreen_cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (parseError) {
          console.error('Error loading cart from localStorage:', parseError)
        }
      }
    } finally {
      setIsLoadingCart(false)
    }
  }

  // Load cart on mount
  useEffect(() => {
    fetchCart()
    
    // Listen for storage events (token changes in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        fetchCart()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const addToCart = async (product, quantity = 1) => {
    const token = getToken()
    
    // Extract image from product object - try multiple possible fields
    const productImage = product.images?.[0] || 
                        product.image || 
                        product.image_url || 
                        product.main_image || 
                        product.imageUrl ||
                        ''
    
    if (!token) {
      // Fallback to localStorage if not authenticated
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.id)
        
        if (existingItem) {
          const updated = prevItems.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
          localStorage.setItem('marketgreen_cart', JSON.stringify(updated))
          return updated
        } else {
          const newItems = [
            ...prevItems,
            {
              id: `local-${product.id}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: productImage,
              quantity: quantity
            }
          ]
          localStorage.setItem('marketgreen_cart', JSON.stringify(newItems))
          return newItems
        }
      })
      return
    }

    try {
      const response = await fetch(API_ENDPOINTS.CART.ADD, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity
        }),
      })

      if (response.ok) {
        // Refresh cart from API
        await fetchCart()
      } else {
        console.error('Error adding to cart:', response.status)
        // Fallback: update local state optimistically
        setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.productId === product.id)
          if (existingItem) {
            return prevItems.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            return [
              ...prevItems,
              {
                id: `temp-${Date.now()}`,
                productId: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: productImage,
                quantity: quantity
              }
            ]
          }
        })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Fallback: update local state optimistically
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.id)
        if (existingItem) {
          return prevItems.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          return [
            ...prevItems,
            {
              id: `temp-${Date.now()}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: productImage,
              quantity: quantity
            }
          ]
        }
      })
    }
  }

  const removeFromCart = async (cartItemId) => {
    const token = getToken()
    
    if (!token) {
      // Fallback to localStorage if not authenticated
      setCartItems(prevItems => {
        const filtered = prevItems.filter(item => item.id !== cartItemId)
        localStorage.setItem('marketgreen_cart', JSON.stringify(filtered))
        return filtered
      })
      return
    }

    try {
      const response = await fetch(API_ENDPOINTS.CART.REMOVE(cartItemId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Refresh cart from API
        await fetchCart()
      } else {
        console.error('Error removing from cart:', response.status)
        // Fallback: update local state
        setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId))
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      // Fallback: update local state
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId))
    }
  }

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }

    const token = getToken()
    
    if (!token) {
      // Fallback to localStorage if not authenticated
      setCartItems(prevItems => {
        const updated = prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
        localStorage.setItem('marketgreen_cart', JSON.stringify(updated))
        return updated
      })
      return
    }

    try {
      const response = await fetch(API_ENDPOINTS.CART.UPDATE(cartItemId), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: quantity
        }),
      })

      if (response.ok) {
        // Refresh cart from API
        await fetchCart()
      } else {
        console.error('Error updating cart quantity:', response.status)
        // Fallback: update local state
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === cartItemId ? { ...item, quantity } : item
          )
        )
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error)
      // Fallback: update local state
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = async () => {
    const token = getToken()
    
    if (!token) {
      // Fallback to localStorage if not authenticated
      setCartItems([])
      localStorage.removeItem('marketgreen_cart')
      return
    }

    try {
      const response = await fetch(API_ENDPOINTS.CART.CLEAR, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setCartItems([])
      } else {
        console.error('Error clearing cart:', response.status)
        // Fallback: clear local state
        setCartItems([])
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      // Fallback: clear local state
      setCartItems([])
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isLoadingCart,
    refreshCart: fetchCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
