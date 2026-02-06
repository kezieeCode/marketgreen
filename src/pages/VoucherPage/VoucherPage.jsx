import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import CartDropdown from '../../components/CartDropdown.jsx'
import UserMenuDropdown from '../../components/UserMenuDropdown.jsx'
import { API_ENDPOINTS, API_BASE_URL } from '../../config/api.js'
import logo from '../../assets/images/logo.png'
import backgroundMenuImage from '../../assets/images/pictures/background-menu.png'
import './VoucherPage.css'

function VoucherPage() {
  const navigate = useNavigate()
  const { getCartItemCount, getCartTotal } = useCart()
  const { token, isAuthenticated } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('available')
  const [redeemCode, setRedeemCode] = useState('')
  const [showRedeemForm, setShowRedeemForm] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    fetchVouchers()
  }, [token, isAuthenticated, navigate])

  const fetchVouchers = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Use the API endpoint from config
      const url = API_ENDPOINTS.COUPONS.LIST(true)
      
      // Validate URL
      if (!url || !url.startsWith('http')) {
        throw new Error('Invalid API URL configuration')
      }
      
      console.log('Fetching vouchers from:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', response.status, errorText)
        
        if (response.status === 401) {
          navigate('/signup')
          return
        }
        
        // Try to parse error message
        let errorMessage = 'Failed to fetch vouchers'
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = errorText || `Server error: ${response.status} ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Vouchers API Response:', data)
      
      const coupons = Array.isArray(data.coupons) ? data.coupons : []
      
      // Map API response to UI format
      const mappedVouchers = coupons.map(coupon => {
        const now = new Date()
        const validFrom = coupon.validFrom ? new Date(coupon.validFrom) : null
        const validUntil = coupon.validUntil ? new Date(coupon.validUntil) : null
        const isExpired = validUntil ? validUntil < now : false
        const isValid = validFrom ? validFrom <= now : true
        
        // Determine status
        let status = 'available'
        if (isExpired) {
          status = 'expired'
        } else if (!isValid) {
          status = 'available' // Not yet valid, but we'll show it
        }
        
        // Generate title from code or description
        const title = coupon.code || 'Special Offer'
        
        // Determine category based on discount type or code
        let category = 'special'
        if (coupon.code) {
          const codeUpper = coupon.code.toUpperCase()
          if (codeUpper.includes('WELCOME')) category = 'welcome'
          else if (codeUpper.includes('LOYALTY')) category = 'loyalty'
          else if (codeUpper.includes('SALE') || codeUpper.includes('WEEKEND')) category = 'sale'
          else if (coupon.discountType === 'percentage') category = 'product'
          else category = 'special'
        }
        
        return {
          id: coupon.id,
          code: coupon.code,
          title: title,
          description: coupon.description || `${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₦${coupon.discountValue}`} off`,
          discount_type: coupon.discountType === 'percentage' ? 'percentage' : 'fixed',
          discount_value: coupon.discountValue,
          min_purchase: coupon.minOrderAmount || 0,
          max_discount: coupon.maxDiscountAmount || null,
          valid_from: coupon.validFrom || null,
          valid_until: coupon.validUntil || null,
          status: status,
          is_used: false, // API doesn't provide this, assume not used
          category: category
        }
      })
      
      setVouchers(mappedVouchers)
    } catch (err) {
      console.error('Error fetching vouchers:', err)
      setError(err.message || 'Failed to load vouchers. Please try again later.')
      // Fallback to empty array on error
      setVouchers([])
    } finally {
      setIsLoading(false)
    }
  }


  const handleNavigateHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleNavigateAbout = (e) => {
    e.preventDefault()
    navigate('/about')
  }

  const handleNavigateContact = (e) => {
    e.preventDefault()
    navigate('/contact')
  }

  const handleNavigateShop = (e) => {
    e.preventDefault()
    navigate('/shop')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const getDaysRemaining = (dateString) => {
    if (!dateString) return 0
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = date - now
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    } catch {
      return 0
    }
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleRedeem = async (e) => {
    e.preventDefault()
    if (!redeemCode.trim()) {
      alert('Please enter a voucher code')
      return
    }

    try {
      const orderAmount = getCartTotal() || 0
      
      const response = await fetch(API_ENDPOINTS.COUPONS.APPLY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          code: redeemCode.trim().toUpperCase(),
          orderAmount: orderAmount
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = 'Failed to redeem voucher'
        
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          errorMessage = errorText || `Server error: ${response.status} ${response.statusText}`
        }
        
        alert(errorMessage)
        return
      }

      const data = await response.json()
      setRedeemCode('')
      setShowRedeemForm(false)
      fetchVouchers() // Refresh vouchers list
      alert('Voucher applied successfully!')
    } catch (err) {
      console.error('Error redeeming voucher:', err)
      alert('Failed to redeem voucher. Please try again.')
    }
  }

  const getVoucherColor = (category) => {
    switch (category) {
      case 'welcome':
        return '#4CAF50'
      case 'product':
        return '#2196F3'
      case 'sale':
        return '#FF9800'
      case 'loyalty':
        return '#9C27B0'
      case 'seasonal':
        return '#00BCD4'
      case 'special':
        return '#E91E63'
      default:
        return '#4CAF50'
    }
  }

  const getVoucherIcon = (category) => {
    switch (category) {
      case 'welcome':
        return '🎉'
      case 'product':
        return '🛒'
      case 'sale':
        return '🏷️'
      case 'loyalty':
        return '⭐'
      case 'seasonal':
        return '🌸'
      case 'special':
        return '🎁'
      default:
        return '🎫'
    }
  }

  const filteredVouchers = vouchers.filter(voucher => {
    if (activeTab === 'available') {
      return voucher.status === 'available' && !voucher.is_used
    }
    if (activeTab === 'used') {
      return voucher.is_used || voucher.status === 'used'
    }
    if (activeTab === 'expired') {
      return voucher.status === 'expired'
    }
    return true
  })

  const availableCount = vouchers.filter(v => v.status === 'available' && !v.is_used).length
  const usedCount = vouchers.filter(v => v.is_used || v.status === 'used').length
  const expiredCount = vouchers.filter(v => v.status === 'expired').length

  return (
    <div className="App voucher-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logo} alt="MarketGreen Logo" />
            <span className="logo-text">
              <span className="logo-market">Market</span>
              <span className="logo-green">Green</span>
            </span>
          </div>

          <nav className="nav">
            <a href="#" onClick={handleNavigateHome}>Home</a>
            <a href="#" onClick={handleNavigateAbout}>About</a>
            <a href="#" onClick={handleNavigateShop}>Shop +</a>
            <a href="#" onClick={handleNavigateContact}>Contact</a>
          </nav>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <UserMenuDropdown />
            <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {getCartItemCount() > 0 && <span className="cart-badge">{getCartItemCount()}</span>}
            </button>
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <button className="shop-now-btn" onClick={() => navigate('/shop')}>SHOP NOW</button>
          </div>
        </div>
      </header>

      {/* Voucher Hero */}
      <section className="voucher-hero" style={{ '--voucher-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="voucher-hero-overlay">
          <div className="voucher-hero-container">
            <div className="voucher-hero-content">
              <p className="voucher-hero-subtitle">Save more with exclusive vouchers and discounts</p>
              <h1 className="voucher-hero-title">My Vouchers</h1>
            </div>
            <div className="voucher-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Vouchers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Voucher Content */}
      <section className="voucher-content">
        <div className="voucher-content-container">
          {/* Redeem Section */}
          <div className="voucher-redeem-section">
            <div className="voucher-redeem-card">
              <div className="voucher-redeem-header">
                <div className="voucher-redeem-icon">🎫</div>
                <div>
                  <h2 className="voucher-redeem-title">Redeem a Voucher Code</h2>
                  <p className="voucher-redeem-subtitle">Have a voucher code? Enter it here to add it to your account</p>
                </div>
              </div>
              {!showRedeemForm ? (
                <button 
                  className="voucher-redeem-toggle-btn"
                  onClick={() => setShowRedeemForm(true)}
                >
                  Redeem Code
                </button>
              ) : (
                <form className="voucher-redeem-form" onSubmit={handleRedeem}>
                  <div className="voucher-redeem-input-group">
                    <input
                      type="text"
                      placeholder="Enter voucher code"
                      value={redeemCode}
                      onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                      className="voucher-redeem-input"
                      autoFocus
                    />
                    <button type="submit" className="voucher-redeem-submit-btn">
                      Redeem
                    </button>
                    <button 
                      type="button"
                      className="voucher-redeem-cancel-btn"
                      onClick={() => {
                        setShowRedeemForm(false)
                        setRedeemCode('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="voucher-tabs">
            <button
              className={`voucher-tab ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              <span className="voucher-tab-icon">✨</span>
              <span>Available</span>
              <span className="voucher-tab-badge">{availableCount}</span>
            </button>
            <button
              className={`voucher-tab ${activeTab === 'used' ? 'active' : ''}`}
              onClick={() => setActiveTab('used')}
            >
              <span className="voucher-tab-icon">✓</span>
              <span>Used</span>
              <span className="voucher-tab-badge">{usedCount}</span>
            </button>
            <button
              className={`voucher-tab ${activeTab === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              <span className="voucher-tab-icon">⏰</span>
              <span>Expired</span>
              <span className="voucher-tab-badge">{expiredCount}</span>
            </button>
          </div>

          {/* Vouchers Grid */}
          {isLoading ? (
            <div className="voucher-loading">
              <div className="voucher-loading-spinner"></div>
              <p>Loading your vouchers...</p>
            </div>
          ) : error ? (
            <div className="voucher-error">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f44336"/>
              </svg>
              <h3>Error Loading Vouchers</h3>
              <p>{error}</p>
              <button className="voucher-retry-btn" onClick={fetchVouchers}>Try Again</button>
            </div>
          ) : filteredVouchers.length === 0 ? (
            <div className="voucher-empty">
              <div className="voucher-empty-icon">🎫</div>
              <h3>No Vouchers Found</h3>
              <p>
                {activeTab === 'available' && "You don't have any available vouchers. Redeem a code or check back for new offers!"}
                {activeTab === 'used' && "You haven't used any vouchers yet."}
                {activeTab === 'expired' && "You don't have any expired vouchers."}
              </p>
            </div>
          ) : (
            <div className="vouchers-grid">
              {filteredVouchers.map((voucher) => {
                const daysRemaining = getDaysRemaining(voucher.valid_until)
                const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7
                const voucherColor = getVoucherColor(voucher.category)
                
                return (
                  <div
                    key={voucher.id}
                    className={`voucher-card ${voucher.status} ${isExpiringSoon && voucher.status === 'available' ? 'expiring-soon' : ''}`}
                    style={{ '--voucher-color': voucherColor }}
                  >
                    <div className="voucher-card-pattern"></div>
                    <div className="voucher-card-content">
                      <div className="voucher-card-header">
                        <div className="voucher-card-icon">{getVoucherIcon(voucher.category)}</div>
                        <div className="voucher-card-status-badge">
                          {voucher.status === 'available' && !voucher.is_used && (
                            <span className="status-available">Active</span>
                          )}
                          {voucher.is_used && <span className="status-used">Used</span>}
                          {voucher.status === 'expired' && <span className="status-expired">Expired</span>}
                        </div>
                      </div>
                      
                      <div className="voucher-card-body">
                        <h3 className="voucher-card-title">{voucher.title}</h3>
                        <p className="voucher-card-description">{voucher.description}</p>
                        
                        <div className="voucher-card-code-section">
                          <div className="voucher-code-label">Voucher Code</div>
                          <div className="voucher-code-display">
                            <span className="voucher-code">{voucher.code}</span>
                            {voucher.status === 'available' && !voucher.is_used && (
                              <button
                                className="voucher-copy-btn"
                                onClick={() => copyToClipboard(voucher.code)}
                                title="Copy code"
                              >
                                {copiedCode === voucher.code ? (
                                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#4CAF50"/>
                                  </svg>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2H8ZM8 4H16V16H8V4ZM4 6V18H14V20H4C2.9 20 2 19.1 2 18V6H4Z" fill="currentColor"/>
                                  </svg>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="voucher-card-discount">
                          {voucher.discount_type === 'percentage' ? (
                            <span className="voucher-discount-amount">{voucher.discount_value}%</span>
                          ) : (
                            <span className="voucher-discount-amount">₦{voucher.discount_value.toLocaleString()}</span>
                          )}
                          <span className="voucher-discount-label">OFF</span>
                        </div>

                        <div className="voucher-card-details">
                          <div className="voucher-detail-item">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM9.5 5H10.5V10.5H9.5V5ZM9.5 11.5H10.5V12.5H9.5V11.5Z" fill="currentColor"/>
                            </svg>
                            <span>Min. purchase: ₦{voucher.min_purchase.toLocaleString()}</span>
                          </div>
                          <div className="voucher-detail-item">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2" y="2" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M2 6H18" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M6 2V6" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M14 2V6" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <span>
                              {voucher.status === 'expired' || (voucher.valid_until && new Date(voucher.valid_until) < new Date())
                                ? `Expired: ${formatDate(voucher.valid_until)}`
                                : daysRemaining > 0
                                ? `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} left`
                                : `Valid until ${formatDate(voucher.valid_until)}`}
                            </span>
                          </div>
                          {voucher.is_used && voucher.used_at && (
                            <div className="voucher-detail-item">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
                              </svg>
                              <span>Used on {formatDate(voucher.used_at)}</span>
                            </div>
                          )}
                        </div>

                        {voucher.status === 'available' && !voucher.is_used && (
                          <button
                            className="voucher-use-btn"
                            onClick={() => {
                              copyToClipboard(voucher.code)
                              navigate('/shop')
                            }}
                          >
                            Use This Voucher
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default VoucherPage
