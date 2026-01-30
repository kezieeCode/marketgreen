import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import CartDropdown from '../components/CartDropdown.jsx'
import UserMenuDropdown from '../components/UserMenuDropdown.jsx'
import { API_ENDPOINTS } from '../config/api.js'
import logo from '../assets/images/logo.png'
import backgroundMenuImage from '../assets/images/pictures/background-menu.png'
import tomatoesImage from '../assets/images/pictures/tomatoes.png'
import fruitsComboImage from '../assets/images/products/fruits.png'
import vegetablePackImage from '../assets/images/products/vegies.png'
import staplesKitImage from '../assets/images/products/grains.png'
import dairyPackImage from '../assets/images/products/milk.png'
import snacksComboImage from '../assets/images/products/munchies.png'
import breakfastImage from '../assets/images/products/breakfast.png'
import healthKitImage from '../assets/images/products/health.png'
import bakeryImage from '../assets/images/products/bakery.png'
import './WishlistPage.css'

function WishlistPage() {
  const navigate = useNavigate()
  const { getCartItemCount, addToCart } = useCart()
  const { token, isAuthenticated } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('board') // 'board' or 'compact'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    fetchWishlist()
  }, [token, isAuthenticated, navigate])

  const fetchWishlist = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(API_ENDPOINTS.WISHLIST.LIST, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/signup')
          return
        }
        // If endpoint doesn't exist, use mock data for demo
        if (response.status === 404) {
          setWishlistItems(getMockWishlistItems())
          setIsLoading(false)
          return
        }
        throw new Error('Failed to fetch wishlist')
      }

      const data = await response.json()
      const itemsList = Array.isArray(data) ? data : (data.items || data.wishlist || [])
      setWishlistItems(itemsList)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      // Use mock data if API fails
      setWishlistItems(getMockWishlistItems())
    } finally {
      setIsLoading(false)
    }
  }

  // Mock wishlist items for demo
  const getMockWishlistItems = () => {
    return [
      {
        id: 1,
        product_id: 101,
        product: {
          id: 101,
          name: 'Fresh Fruits Combo',
          image_url: fruitsComboImage,
          current_price: 118.26,
          original_price: 162.00,
          category: 'fruits',
          rating: 4.5,
          badge: 'NEW'
        },
        added_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        product_id: 102,
        product: {
          id: 102,
          name: 'Vegetable Essentials Pack',
          image_url: vegetablePackImage,
          current_price: 68.00,
          original_price: 85.00,
          category: 'vegetables',
          rating: 4.0,
          badge: 'NEW'
        },
        added_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        product_id: 103,
        product: {
          id: 103,
          name: 'Organic Staples Kit',
          image_url: staplesKitImage,
          current_price: 73.60,
          original_price: 92.00,
          category: 'staples',
          rating: 4.8,
          badge: 'HOT'
        },
        added_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        product_id: 104,
        product: {
          id: 104,
          name: 'Dairy Delight Pack',
          image_url: dairyPackImage,
          current_price: 58.50,
          original_price: 78.00,
          category: 'dairy',
          rating: 4.2,
          badge: 'NEW'
        },
        added_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        product_id: 105,
        product: {
          id: 105,
          name: 'Snacks & Munchies Combo',
          image_url: snacksComboImage,
          current_price: 68.00,
          original_price: 85.00,
          category: 'snacks',
          rating: 4.3,
          badge: 'NEW'
        },
        added_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 6,
        product_id: 106,
        product: {
          id: 106,
          name: 'Breakfast Essentials',
          image_url: breakfastImage,
          current_price: 73.60,
          original_price: 92.00,
          category: 'breakfast',
          rating: 4.6,
          badge: 'HOT'
        },
        added_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 7,
        product_id: 107,
        product: {
          id: 107,
          name: 'Healthy Living Kit',
          image_url: healthKitImage,
          current_price: 58.50,
          original_price: 78.00,
          category: 'health',
          rating: 4.7,
          badge: 'NEW'
        },
        added_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 8,
        product_id: 108,
        product: {
          id: 108,
          name: 'Bakery Favorites',
          image_url: bakeryImage,
          current_price: 135.00,
          original_price: 180.00,
          category: 'bakery',
          rating: 4.4,
          badge: 'SELL'
        },
        added_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
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

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await fetch(API_ENDPOINTS.WISHLIST.REMOVE(itemId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item.id !== itemId))
      } else {
        // Update locally even if API fails
        setWishlistItems(wishlistItems.filter(item => item.id !== itemId))
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err)
      // Update locally even if API fails
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId))
    }
  }

  const handleAddToCart = (item) => {
    const product = item.product || item
    addToCart({
      id: product.id || product.product_id,
      name: product.name,
      price: product.current_price || product.price,
      image: product.image_url || product.main_image,
      quantity: 1
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently'
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) return 'Today'
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch {
      return 'Recently'
    }
  }

  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'snacks', 'breakfast', 'health', 'bakery', 'staples']
  const filteredItems = selectedCategory === 'all' 
    ? wishlistItems 
    : wishlistItems.filter(item => {
        const product = item.product || item
        return product.category?.toLowerCase() === selectedCategory.toLowerCase()
      })

  const categoryCounts = categories.reduce((acc, cat) => {
    if (cat === 'all') {
      acc[cat] = wishlistItems.length
    } else {
      acc[cat] = wishlistItems.filter(item => {
        const product = item.product || item
        return product.category?.toLowerCase() === cat.toLowerCase()
      }).length
    }
    return acc
  }, {})

  return (
    <div className="App wishlist-page">
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
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
        </div>
      </header>

      {/* Wishlist Hero */}
      <section className="wishlist-hero" style={{ '--wishlist-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="wishlist-hero-overlay">
          <div className="wishlist-hero-container">
            <div className="wishlist-hero-content">
              <div className="wishlist-hero-icon">💝</div>
              <p className="wishlist-hero-subtitle">Your personal collection of favorite products</p>
              <h1 className="wishlist-hero-title">My Wishlist</h1>
              <div className="wishlist-hero-stats">
                <span className="wishlist-stat-item">
                  <strong>{wishlistItems.length}</strong> items
                </span>
                <span className="wishlist-stat-divider">•</span>
                <span className="wishlist-stat-item">
                  <strong>{categories.filter(cat => cat !== 'all' && categoryCounts[cat] > 0).length}</strong> categories
                </span>
              </div>
            </div>
            <div className="wishlist-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Wishlist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="wishlist-content">
        <div className="wishlist-content-container">
          {/* Controls */}
          <div className="wishlist-controls">
            <div className="wishlist-view-toggle">
              <button
                className={`wishlist-view-btn ${viewMode === 'board' ? 'active' : ''}`}
                onClick={() => setViewMode('board')}
                title="Board View"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
              <button
                className={`wishlist-view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                onClick={() => setViewMode('compact')}
                title="Compact View"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="7" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="12" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="2" y="17" width="16" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
            <div className="wishlist-category-filter">
              {categories.map(category => (
                categoryCounts[category] > 0 || category === 'all' ? (
                  <button
                    key={category}
                    className={`wishlist-category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                    {categoryCounts[category] > 0 && (
                      <span className="wishlist-category-count">{categoryCounts[category]}</span>
                    )}
                  </button>
                ) : null
              ))}
            </div>
          </div>

          {/* Wishlist Items */}
          {isLoading ? (
            <div className="wishlist-loading">
              <div className="wishlist-loading-spinner"></div>
              <p>Loading your wishlist...</p>
            </div>
          ) : error ? (
            <div className="wishlist-error">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f44336"/>
              </svg>
              <h3>Error Loading Wishlist</h3>
              <p>{error}</p>
              <button className="wishlist-retry-btn" onClick={fetchWishlist}>Try Again</button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty-icon">💝</div>
              <h3>Your Wishlist is Empty</h3>
              <p>Start adding products you love to your wishlist! They'll be saved here for later.</p>
              <button className="wishlist-shop-btn" onClick={() => navigate('/shop')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className={`wishlist-items ${viewMode}`}>
              {filteredItems.map((item, index) => {
                const product = item.product || item
                const price = Number(product.current_price || product.price || 0)
                const originalPrice = Number(product.original_price || product.compare_at_price || price)
                const badge = product.badge || product.badges?.[0]
                const badgeClass = badge?.toLowerCase().includes('hot') ? 'badge-hot' :
                                  badge?.toLowerCase().includes('sell') || badge?.toLowerCase().includes('sale') ? 'badge-sell' :
                                  badge ? 'badge-new' : null
                
                return (
                  <div
                    key={item.id || product.id}
                    className={`wishlist-item ${hoveredItem === item.id ? 'hovered' : ''}`}
                    style={{ '--item-index': index }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="wishlist-item-pin"></div>
                    <div className="wishlist-item-content">
                      <div className="wishlist-item-image-wrapper">
                        <img
                          src={product.image_url || product.main_image || tomatoesImage}
                          alt={product.name}
                          className="wishlist-item-image"
                        />
                        {badgeClass && (
                          <span className={`wishlist-item-badge ${badgeClass}`}>
                            {String(badge).toUpperCase()}
                          </span>
                        )}
                        <div className="wishlist-item-actions">
                          <button
                            className="wishlist-action-btn wishlist-remove-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromWishlist(item.id)
                            }}
                            title="Remove from wishlist"
                          >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 17.5L3.5 11C1.5 9 1.5 5.5 3.5 3.5C5.5 1.5 9 1.5 11 3.5L10 4.5L9 3.5C11 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 9 16.5 11L10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="wishlist-item-info">
                        <div className="wishlist-item-rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`wishlist-star ${i < Math.floor(product.rating || 0) ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <h3 className="wishlist-item-name">{product.name}</h3>
                        <div className="wishlist-item-price">
                          <span className="wishlist-current-price">₦{price.toFixed(2)}</span>
                          {originalPrice > price && (
                            <span className="wishlist-original-price">₦{originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="wishlist-item-meta">
                          <span className="wishlist-item-date">Added {formatDate(item.added_at)}</span>
                        </div>
                        <button
                          className="wishlist-add-to-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(item)
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Add to Cart
                        </button>
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

export default WishlistPage
