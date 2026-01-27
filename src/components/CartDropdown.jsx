import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './CartDropdown.css'

function CartDropdown({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen) return
      
      // Check if click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Check if the click is not on the cart button or its children
        const cartButton = event.target.closest('.cart-btn')
        const cartBadge = event.target.closest('.cart-badge')
        
        // Only close if clicking outside both dropdown and cart button
        if (!cartButton && !cartBadge) {
          onClose()
        }
      }
    }

    if (isOpen) {
      // Use a small delay to avoid immediate closure when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (!isOpen) return null

  return (
    <div className="cart-dropdown-overlay" onClick={onClose}>
      <div className="cart-dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
        <div className="cart-dropdown-header">
          <h3 className="cart-dropdown-title">Shopping Cart</h3>
          <button className="cart-dropdown-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cart-dropdown-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="cart-empty-text">Your cart is empty</p>
              <button className="cart-empty-btn" onClick={() => { onClose(); navigate('/shop'); }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image-wrapper">
                      <img 
                        src={item.image || item.image_url || item.main_image || ''} 
                        alt={item.name}
                        className="cart-item-image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <div className="cart-item-price">₦{item.price.toFixed(2)}</div>
                      <div className="cart-item-quantity-controls">
                        <button 
                          className="cart-quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="cart-quantity-value">{item.quantity}</span>
                        <button 
                          className="cart-quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-dropdown-footer">
                <div className="cart-total">
                  <span className="cart-total-label">Total:</span>
                  <span className="cart-total-value">₦{getCartTotal().toFixed(2)}</span>
                </div>
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
                <button className="cart-view-cart-btn" onClick={() => { onClose(); navigate('/shop'); }}>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDropdown
