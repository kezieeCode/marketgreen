import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { API_ENDPOINTS } from '../../config/api.js'
import './CheckoutPage.css'

function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user, token } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    paymentMethod: 'card'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value


    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Shipping information validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required'

    // Payment method validation - no validation needed for card selection

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty')
      navigate('/shop')
      return
    }

    // Map frontend paymentMethod to backend payment_method
    let paymentMethod = 'cash_on_delivery'
    if (formData.paymentMethod === 'card' || formData.paymentMethod === 'bank') {
      paymentMethod = 'paystack'
    } else if (formData.paymentMethod === 'cash') {
      paymentMethod = 'cash_on_delivery'
    }

    // Build items payload from cart
    const items = cartItems.map((item) => ({
      product_id: item.productId || item.id, // Use productId if available, fallback to id
      quantity: item.quantity,
      price: item.price,
    }))

    const orderPayload = {
      items,
      shipping_address: {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        street: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
      },
      billing_address: null,
      subtotal: Number(subtotal.toFixed(2)),
      shipping_amount: Number(shippingFee.toFixed(2)),
      tax_amount: 0,
      discount_amount: Number(discountAmount.toFixed(2)),
      total_amount: Number(total.toFixed(2)),
      coupon_code: appliedCoupon ? appliedCoupon.code : null,
      payment_method: paymentMethod,
      email: formData.email || user?.email || '',
      notes: '',
    }

    if (!token) {
      alert('You must be logged in to place an order.')
      navigate('/signup')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.CREATE_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Create order failed:', data)
        const message =
          data?.message ||
          data?.error ||
          'Failed to create order. Please try again.'
        alert(message)
        return
      }

      const payment = data.payment || {}

      if (payment.initialized && payment.authorization_url) {
        // Redirect to Paystack hosted page for card/bank transfer payments
        window.location.href = payment.authorization_url
        return
      }

      if (payment.method === 'cash_on_delivery') {
        clearCart()
        navigate('/payment/success')
        return
      }

      if (payment.initialized === false && payment.error) {
        // Redirect to error page with error message
        const errorMessage = encodeURIComponent(payment.error)
        navigate(`/payment/error?error=${errorMessage}`)
        return
      }

      // Fallback success path (cash on delivery or other non-Paystack methods)
      clearCart()
      navigate('/payment/success')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplyCoupon = async (e) => {
    e.preventDefault()
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    setIsApplyingCoupon(true)
    setCouponError('')

    try {
      const orderAmount = getCartTotal()
      
      const response = await fetch(API_ENDPOINTS.COUPONS.APPLY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          code: couponCode.trim().toUpperCase(),
          orderAmount: orderAmount
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = 'Failed to apply coupon'
        
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = errorText || `Server error: ${response.status} ${response.statusText}`
        }
        
        setCouponError(errorMessage)
        setAppliedCoupon(null)
        return
      }

      const data = await response.json()
      console.log('Coupon API Response:', data)
      
      // Store the full coupon data including discount amount from API
      setAppliedCoupon({
        ...data,
        discountAmount: data.discountAmount || data.discount_amount || 0
      })
      setCouponError('')
    } catch (err) {
      console.error('Error applying coupon:', err)
      setCouponError('Failed to apply coupon. Please try again.')
      setAppliedCoupon(null)
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const subtotal = getCartTotal()
  const shippingFee = subtotal > 100 ? 0 : 500 // Free shipping over ₦100
  
  // Use discount amount from API response
  const discountAmount = appliedCoupon?.discountAmount || appliedCoupon?.discount_amount || 0
  
  const total = Math.max(0, subtotal + shippingFee - discountAmount)

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart before checkout</p>
            <button className="checkout-btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <button className="checkout-back-btn" onClick={() => navigate('/shop')}>
            ← Back to Shop
          </button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form" autoComplete="on">
          <div className="checkout-content">
            {/* Shipping Information */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Shipping Information</h2>
              
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    className={errors.firstName ? 'checkout-input-error' : ''}
                  />
                  {errors.firstName && <span className="checkout-error">{errors.firstName}</span>}
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className={errors.lastName ? 'checkout-input-error' : ''}
                  />
                  {errors.lastName && <span className="checkout-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="checkout-form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className={errors.email ? 'checkout-input-error' : ''}
                />
                {errors.email && <span className="checkout-error">{errors.email}</span>}
              </div>

              <div className="checkout-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 800 000 0000"
                  autoComplete="tel"
                  className={errors.phone ? 'checkout-input-error' : ''}
                />
                {errors.phone && <span className="checkout-error">{errors.phone}</span>}
              </div>

              <div className="checkout-form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  autoComplete="street-address"
                  className={errors.address ? 'checkout-input-error' : ''}
                />
                {errors.address && <span className="checkout-error">{errors.address}</span>}
              </div>

              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    autoComplete="address-level2"
                    className={errors.city ? 'checkout-input-error' : ''}
                  />
                  {errors.city && <span className="checkout-error">{errors.city}</span>}
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    autoComplete="address-level1"
                    className={errors.state ? 'checkout-input-error' : ''}
                  />
                  {errors.state && <span className="checkout-error">{errors.state}</span>}
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="zipCode">Zip Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    autoComplete="postal-code"
                    className={errors.zipCode ? 'checkout-input-error' : ''}
                  />
                  {errors.zipCode && <span className="checkout-error">{errors.zipCode}</span>}
                </div>
              </div>

              <div className="checkout-form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  autoComplete="country"
                  readOnly
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Payment Method</h2>
              
              <div className="checkout-payment-methods">
                <label className="checkout-payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <span>Credit/Debit Card</span>
                </label>

                <label className="checkout-payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                  />
                  <span>Bank Transfer</span>
                </label>

                <label className="checkout-payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="checkout-card-info">
                  <p>Credit/Debit Card payment selected. Payment will be processed securely.</p>
                </div>
              )}

              {formData.paymentMethod === 'bank' && (
                <div className="checkout-bank-info">
                  <p>Please transfer to:</p>
                  <div className="checkout-bank-details">
                    <p><strong>Bank:</strong> MarketGreen Bank</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Account Name:</strong> MarketGreen Limited</p>
                  </div>
                  <p className="checkout-note">Please include your order number in the transfer description.</p>
                </div>
              )}

              {formData.paymentMethod === 'cash' && (
                <div className="checkout-cash-info">
                  <p>Pay with cash when your order is delivered.</p>
                  <p className="checkout-note">Our delivery agent will collect payment upon delivery.</p>
                </div>
              )}

              {/* Payment Methods Accepted */}
              <div className="checkout-payment-accepted">
                <p className="checkout-payment-accepted-label">We Accept</p>
                <div className="checkout-payment-logos">
                  <div className="checkout-payment-logo" title="Visa">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/visa-3.svg" 
                      alt="Visa" 
                      onError={(e) => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png'
                      }}
                    />
                  </div>
                  <div className="checkout-payment-logo" title="Mastercard">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" 
                      alt="Mastercard"
                      onError={(e) => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/2000px-Mastercard-logo.svg.png'
                      }}
                    />
                  </div>
                  <div className="checkout-payment-logo" title="Verve">
                    <img 
                      src="https://www.vervecard.com/wp-content/uploads/2018/05/verve-logo.png" 
                      alt="Verve"
                      onError={(e) => {
                        e.target.src = 'https://www.interswitchgroup.com/assets/images/verve-logo.png'
                      }}
                    />
                  </div>
                  <div className="checkout-payment-logo" title="Paystack">
                    <img 
                      src="https://cdn.worldvectorlogo.com/logos/paystack-2.svg" 
                      alt="Paystack"
                      onError={(e) => {
                        e.target.src = 'https://paystack.com/assets/img/paystack-logo.svg'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2 className="checkout-summary-title">Order Summary</h2>
            
            {/* Coupon Code Section */}
            <div className="checkout-coupon-section">
              {!appliedCoupon ? (
                <div className="checkout-coupon-form">
                  <div className="checkout-coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase())
                        setCouponError('')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleApplyCoupon(e)
                        }
                      }}
                      className={`checkout-coupon-input ${couponError ? 'checkout-coupon-input-error' : ''}`}
                      disabled={isApplyingCoupon}
                    />
                    <button
                      type="button"
                      className="checkout-coupon-btn"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && (
                    <span className="checkout-coupon-error">{couponError}</span>
                  )}
                </div>
              ) : (
                <div className="checkout-coupon-applied">
                  <div className="checkout-coupon-applied-info">
                    <span className="checkout-coupon-applied-icon">✓</span>
                    <span className="checkout-coupon-applied-code">{appliedCoupon.code}</span>
                    <span className="checkout-coupon-applied-discount">
                      {appliedCoupon.discountType === 'percentage' 
                        ? `${appliedCoupon.discountValue}% off`
                        : `₦${appliedCoupon.discountValue} off`} - ₦{discountAmount.toFixed(2)} discount
                    </span>
                  </div>
                  <button
                    type="button"
                    className="checkout-coupon-remove"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.image || item.image_url || item.main_image || ''}
                    alt={item.name}
                    className="checkout-item-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <div className="checkout-item-details">
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                    <p className="checkout-item-price">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-totals">
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `₦${shippingFee.toFixed(2)}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="checkout-summary-row checkout-discount-row">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="checkout-discount-amount">-₦{discountAmount.toFixed(2)}</span>
                </div>
              )}
              {subtotal > 100 && (
                <div className="checkout-summary-discount">
                  <span>🎉 Free shipping on orders over ₦100</span>
                </div>
              )}
              <div className="checkout-summary-row checkout-total">
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
