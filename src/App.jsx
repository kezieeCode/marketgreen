import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import { useNavigation } from './context/NavigationContext.jsx'
import CartDropdown from './components/CartDropdown.jsx'
import UserMenuDropdown from './components/UserMenuDropdown.jsx'
import NavigationLoader from './components/NavigationLoader.jsx'
import './App.css'
import ProductDetail from './pages/ProductDetail.jsx'
import { API_ENDPOINTS } from './config/api.js'
import logo from './assets/images/logo.png'
import fruitsImage from './assets/images/pictures/fruits.png'
import backgroundImage from './assets/images/pictures/background.png'
import backgroundMenuImage from './assets/images/pictures/background-menu.png'
import ellipseImage from './assets/images/vector/ellipse.png'
import appleImage from './assets/images/vector/apple.png'
import fruityImage from './assets/images/pictures/fruity.png'
import diaryImage from './assets/images/pictures/diary.png'
import staplesImage from './assets/images/pictures/staples.png'
import snacksImage from './assets/images/pictures/snacks.png'
import householdImage from './assets/images/pictures/household.png'
import tomatoesImage from './assets/images/pictures/tomatoes.png'
import masromImage from './assets/images/pictures/masrom.png'
import orangeImage from './assets/images/pictures/orange.png'
import kiwiImage from './assets/images/pictures/kiwi.png'
import juiceImage from './assets/images/pictures/juice.png'
import guavaImage from './assets/images/pictures/guava.png'
import delightImage from './assets/images/pictures/delight.png'
import avocadoImage from './assets/images/pictures/avocado.png'
import honeyImage from './assets/images/pictures/honey.png'
import fruitsComboImage from './assets/images/products/fruits.png'
import vegetablePackImage from './assets/images/products/vegies.png'
import staplesKitImage from './assets/images/products/grains.png'
import dairyPackImage from './assets/images/products/milk.png'
import snacksComboImage from './assets/images/products/munchies.png'
import breakfastImage from './assets/images/products/breakfast.png'
import healthKitImage from './assets/images/products/health.png'
import bakeryImage from './assets/images/products/bakery.png'
import plantsImage from './assets/images/pictures/plants.png'
import testimonial1Image from './assets/images/testimonials/man.png'
import testimonial2Image from './assets/images/testimonials/second_man.png'
import blogImage1 from './assets/images/blog/firstImage.png'
import blogImage2 from './assets/images/blog/secondImage.png'
import blogImage3 from './assets/images/blog/thirdImage.png'
import curatedIcon from './assets/images/vector/curated.png'
import deliveryIcon from './assets/images/vector/delivery.png'
import handmadeIcon from './assets/images/vector/handmade.png'
import naturalIcon from './assets/images/vector/natural.png'
import paymentImage from './assets/images/vector/payment.png'
import ShopPage from './pages/ShopPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx'
import PaymentFailedPage from './pages/PaymentFailedPage.jsx'
import PaymentErrorPage from './pages/PaymentErrorPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import InboxPage from './pages/InboxPage.jsx'
import VoucherPage from './pages/VoucherPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import AccountPage from './pages/AccountPage.jsx'

function HomePage() {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()
  const { setNavigating } = useNavigation()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 676,
    hours: 8,
    minutes: 3,
    seconds: 20
  })
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(false)
  const [trendyProducts, setTrendyProducts] = useState([])
  const [isLoadingTrendy, setIsLoadingTrendy] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('vegetables')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
    return () => {
      document.body.classList.remove('drawer-open')
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchFeaturedProducts() {
      try {
        setIsLoadingFeatured(true)
        const response = await fetch(API_ENDPOINTS.PRODUCTS.FEATURED, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`Failed to load featured products: ${response.status}`)
        }

        const data = await response.json()
        const items = Array.isArray(data?.products) ? data.products : []

        setFeaturedProducts(items)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching featured products', error)
        }
      } finally {
        setIsLoadingFeatured(false)
      }
    }

    fetchFeaturedProducts()

    return () => controller.abort()
  }, [])

  // Fetch trendy products by category
  useEffect(() => {
    const controller = new AbortController()

    async function fetchTrendyProducts() {
      try {
        setIsLoadingTrendy(true)
        const response = await fetch(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(selectedCategory), {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`)
        }

        const data = await response.json()
        const items = Array.isArray(data?.products) ? data.products : []

        setTrendyProducts(items)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching trendy products', error)
          setTrendyProducts([])
        }
      } finally {
        setIsLoadingTrendy(false)
      }
    }

    fetchTrendyProducts()

    return () => controller.abort()
  }, [selectedCategory])

  const handleCategoryClick = (e, category) => {
    e.preventDefault()
    setSelectedCategory(category.toLowerCase())
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="MarketGreen Logo" />
            <span className="logo-text">
              <span className="logo-market">Market</span>
              <span className="logo-green">Green</span>
            </span>
          </div>
          
          <nav className="nav">
            <a href="#home">Home</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate('/about')
              }}
            >
              About
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop') }}>Shop +</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate('/contact')
              }}
            >
              Contact
            </a>
          </nav>
          
          <div className="header-actions">
            <button className="icon-btn search-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <UserMenuDropdown />
            {/* Mobile Hamburger Menu Button - Only visible on mobile, positioned next to cart */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
            </button>
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

      {/* Hero Section */}
      <section className="hero" style={{ '--bg-image': `url(${backgroundImage})` }}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <img src={appleImage} alt="Apple" className="apple-icon" />
              <span>100% genuine Products</span>
            </div>
            <h1 className="hero-title">
              Fresh Groceries, Delivered to Your Doorstep<span className="truck-icon">🚚</span>
            </h1>
            <div className="hero-description-wrapper">
              <div className="hero-divider"></div>
              <p className="hero-description">
                Enjoy hassle-free online grocery shopping with fast delivery and the best quality products
              </p>
            </div>
            <button className="explore-btn">EXPLORE PRODUCTS</button>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-wrapper"></div>
            <img src={ellipseImage} alt="" className="hero-ellipse-shadow" />
            <img src={fruitsImage} alt="Fresh Groceries" className="hero-fruits-image" />
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="features-banner">
        <div className="features-container">
          <span className="features-title">Find Everything You Need, Fresh & Fast</span>
          <span className="features-divider">|</span>
          <span className="feature-item">
            <img src={appleImage} alt="Apple" className="feature-icon" />
            <span>Fresh Groceries</span>
          </span>
          <span className="features-divider">|</span>
          <span className="feature-item">
            <span className="feature-icon-text">!</span>
            <span>Daily Needs</span>
          </span>
          <span className="features-divider">|</span>
          <span className="feature-item">
            <span className="feature-icon-text">+</span>
            <span>Pantry Essentials</span>
          </span>
          <span className="features-divider">|</span>
          <span className="feature-item">
            <span className="feature-icon-text">🏃</span>
            <span>Healthy Living</span>
          </span>
          <span className="features-divider">|</span>
          <span className="feature-item">
            <span className="feature-icon-text">🚚</span>
            <span>Quick Delivery</span>
          </span>
        </div>
      </section>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        <div className="indicator active"></div>
        <div className="indicator"></div>
      </div>

      {/* Product Categories Section */}
      <section className="product-categories">
        <div className="categories-container">
          {/* Top Row */}
          <div className="categories-row">
            <div className="category-card category-fresh">
              <div className="category-content">
                <h2 className="category-title">FRESH PRODUCE</h2>
                <p className="category-description">FRUITS, VEGETABLES, AND ORGANIC FARM-FRESH ITEMS.</p>
                <button className="category-shop-btn">SHOP NOW</button>
              </div>
              <div className="category-image-wrapper">
                <img src={fruityImage} alt="Fresh Produce" className="category-image" />
              </div>
            </div>

            <div className="category-card category-dairy">
              <div className="category-content">
                <h2 className="category-title">DAIRY & EGGS</h2>
                <p className="category-description">MILK, CHEESE, YOGURT, BUTTER, AND FRESH EGGS.</p>
                <button className="category-shop-btn">SHOP NOW</button>
              </div>
              <div className="category-image-wrapper">
                <img src={diaryImage} alt="Dairy & Eggs" className="category-image" />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="categories-row">
            <div className="category-card category-staples">
              <div className="category-content">
                <h2 className="category-title">STAPLES & ESSENTIALS</h2>
                <p className="category-description">RICE, FLOUR, PULSES, SPICES, AND COOKING OILS.</p>
                <button className="category-shop-btn">SHOP NOW</button>
              </div>
              <div className="category-image-wrapper">
                <img src={staplesImage} alt="Staples & Essentials" className="category-image" />
              </div>
            </div>

            <div className="category-card category-snacks">
              <div className="category-content">
                <h2 className="category-title">SNACKS & BEVERAGES</h2>
                <p className="category-description">CHIPS, BISCUITS, SOFT DRINKS, JUICES, AND TEA/COFFEE.</p>
                <button className="category-shop-btn">SHOP NOW</button>
              </div>
              <div className="category-image-wrapper">
                <img src={snacksImage} alt="Snacks & Beverages" className="category-image" />
              </div>
            </div>

            <div className="category-card category-household">
              <div className="category-content">
                <h2 className="category-title">HOUSEHOLD & PERSONAL CARE</h2>
                <p className="category-description">CLEANING SUPPLIES & HYGIENE PRODUCTS.</p>
                <button className="category-shop-btn">SHOP NOW</button>
              </div>
              <div className="category-image-wrapper">
                <img src={householdImage} alt="Household & Personal Care" className="category-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trendy Products Section */}
      <section className="trendy-products">
        <div className="trendy-products-container">
          <h2 className="trendy-products-title">OUR TRENDY PRODUCTS</h2>
          
          <nav className="products-nav">
            <a href="#vegetables" className={`nav-link ${selectedCategory === 'vegetables' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'vegetables')}>VEGETABLES</a>
            <span className="nav-divider">|</span>
            <a href="#fruits" className={`nav-link ${selectedCategory === 'fruits' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'fruits')}>FRUITS</a>
            <span className="nav-divider">|</span>
            <a href="#meat" className={`nav-link ${selectedCategory === 'meat' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'meat')}>MEAT</a>
            <span className="nav-divider">|</span>
            <a href="#fish" className={`nav-link ${selectedCategory === 'fish' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'fish')}>FISH</a>
            <span className="nav-divider">|</span>
            <a href="#beverages" className={`nav-link ${selectedCategory === 'beverages' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'beverages')}>BEVERAGES</a>
            <span className="nav-divider">|</span>
            <a href="#juices" className={`nav-link ${selectedCategory === 'juices' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'juices')}>JUICES</a>
            <span className="nav-divider">|</span>
            <a href="#dairy" className={`nav-link ${selectedCategory === 'dairy' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'dairy')}>DAIRY</a>
            <span className="nav-divider">|</span>
            <a href="#snacks" className={`nav-link ${selectedCategory === 'snacks' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'snacks')}>SNACKS</a>
            <span className="nav-divider">|</span>
            <a href="#breakfast" className={`nav-link ${selectedCategory === 'breakfast' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'breakfast')}>BREAKFAST</a>
            <span className="nav-divider">|</span>
            <a href="#health" className={`nav-link ${selectedCategory === 'health' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'health')}>HEALTH</a>
            <span className="nav-divider">|</span>
            <a href="#bakery" className={`nav-link ${selectedCategory === 'bakery' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'bakery')}>BAKERY</a>
            <span className="nav-divider">|</span>
            <a href="#grains" className={`nav-link ${selectedCategory === 'grains' ? 'active' : ''}`} onClick={(e) => handleCategoryClick(e, 'grains')}>GRAINS</a>
          </nav>

          <div className="products-grid">
            {isLoadingTrendy ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading products...</div>
              </div>
            ) : trendyProducts.length > 0 ? (
              trendyProducts.map((product) => {
                const price = Number(product.current_price ?? product.price)
                const originalPrice = Number(
                  product.original_price ??
                    product.compare_at_price ??
                    product.price ??
                    product.current_price
                )
                const badge =
                  (Array.isArray(product.badges) && product.badges[0]) ||
                  product.badge ||
                  null
                const badgeClass =
                  badge && typeof badge === 'string'
                    ? badge.toLowerCase().includes('hot')
                      ? 'badge-hot'
                      : badge.toLowerCase().includes('sell') || badge.toLowerCase().includes('sale')
                        ? 'badge-sell'
                        : 'badge-new'
                    : null

                return (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => {
                      if (product.id) {
                        setNavigating(true)
                        navigate(`/product/${product.id}`)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-image-wrapper">
                      <img
                        src={product.image_url || product.main_image || tomatoesImage}
                        alt={product.name}
                        className="product-image"
                      />
                      {badgeClass && (
                        <span className={`product-badge ${badgeClass}`}>
                          {String(badge).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="product-rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`star ${
                            index < (Number(product.rating) || 0) ? 'filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-price">
                      <span className="current-price">
                        {Number.isFinite(price) ? `₦${price.toFixed(2)}` : ''}
                      </span>
                      {Number.isFinite(originalPrice) && originalPrice > price && (
                        <span className="original-price">₦{originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>No products found in this category.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hot Deal Section */}
      <section className="hot-deal">
        <div className="hot-deal-container">
          <div className="hot-deal-image-wrapper">
            <img src={honeyImage} alt="Honey Combo Package" className="hot-deal-image" />
          </div>
          
          <div className="hot-deal-content">
            <p className="hot-deal-label">// Todays Hot Deals</p>
            <p className="hot-deal-stock">ORIGINAL STOCK</p>
            <h2 className="hot-deal-title">HONEY COMBO PACKAGE</h2>
            
            <div className="countdown-timer">
              <div className="timer-item">
                <div className="timer-circle">
                  <span className="timer-number">{String(timeLeft.days).padStart(3, '0')}</span>
                </div>
                <span className="timer-label">DAYS</span>
              </div>
              <div className="timer-item">
                <div className="timer-circle">
                  <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="timer-label">HRS</span>
              </div>
              <div className="timer-item">
                <div className="timer-circle">
                  <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="timer-label">MINS</span>
              </div>
              <div className="timer-item">
                <div className="timer-circle">
                  <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="timer-label">SECS</span>
              </div>
            </div>
            
            <button className="hot-deal-btn">SHOP NOW</button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="featured-products-container">
          <h2 className="featured-products-title">Featured Products</h2>
          
          <div className="featured-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 8).map((product) => {
                const price = Number(product.current_price ?? product.price)
                const originalPrice = Number(
                  product.original_price ??
                    product.compare_at_price ??
                    product.price ??
                    product.current_price
                )
                const badge =
                  (Array.isArray(product.badges) && product.badges[0]) ||
                  product.badge ||
                  null
                const badgeClass =
                  badge && typeof badge === 'string'
                    ? badge.toLowerCase().includes('hot')
                      ? 'badge-hot'
                      : badge.toLowerCase().includes('sell') || badge.toLowerCase().includes('sale')
                        ? 'badge-sell'
                        : 'badge-new'
                    : null

                return (
                  <div
                    key={product.id}
                    className="featured-card"
                    onClick={() => {
                      // Always pass the backend product ID to the detail page
                      if (product.id) {
                        setNavigating(true)
                        navigate(`/product/${product.id}`)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="featured-image-wrapper">
                      <img
                        src={product.image_url || product.main_image || fruitsComboImage}
                        alt={product.name}
                        className="featured-image"
                      />
                      {badgeClass && (
                        <span className={`featured-badge ${badgeClass}`}>
                          {String(badge).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="featured-name">{product.name}</h3>
                    <div className="featured-rating">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className={`star ${
                            index < (Number(product.rating) || 0) ? 'filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="featured-price">
                      <span className="current-price">
                        {Number.isFinite(price) ? `₦${price.toFixed(2)}` : ''}
                      </span>
                      {Number.isFinite(originalPrice) && originalPrice > price && (
                        <span className="original-price">₦{originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                {/* Row 1 */}
                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/fresh-fruits-combo')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={fruitsComboImage}
                      alt="Fresh Fruits Combo"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-new">NEW</span>
                  </div>
                  <h3 className="featured-name">Fresh Fruits Combo</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦118.26</span>
                    <span className="original-price">₦162.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/vegetable-essentials-pack')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={vegetablePackImage}
                      alt="Vegetable Essentials Pack"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-new">NEW</span>
                  </div>
                  <h3 className="featured-name">Vegetable Essentials Pack</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦68.00</span>
                    <span className="original-price">₦85.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/organic-staples-kit')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={staplesKitImage}
                      alt="Organic Staples Kit"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-hot">HOT</span>
                  </div>
                  <h3 className="featured-name">Organic Staples Kit</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦73.60</span>
                    <span className="original-price">₦92.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/dairy-delight-pack')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={dairyPackImage}
                      alt="Dairy Delight Pack"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-new">NEW</span>
                  </div>
                  <h3 className="featured-name">Dairy Delight Pack</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦58.50</span>
                    <span className="original-price">₦78.00</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/snacks-munchies-combo')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={snacksComboImage}
                      alt="Snacks & Munchies Combo"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-new">NEW</span>
                  </div>
                  <h3 className="featured-name">Snacks & Munchies Combo</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦68.00</span>
                    <span className="original-price">₦85.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/breakfast-essentials')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={breakfastImage}
                      alt="Breakfast Essentials"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-hot">HOT</span>
                  </div>
                  <h3 className="featured-name">Breakfast Essentials</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦73.60</span>
                    <span className="original-price">₦92.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/healthy-living-kit')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={healthKitImage}
                      alt="Healthy Living Kit"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-new">NEW</span>
                  </div>
                  <h3 className="featured-name">Healthy Living Kit</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦58.50</span>
                    <span className="original-price">₦78.00</span>
                  </div>
                </div>

                <div
                  className="featured-card"
                  onClick={() => {
                    setNavigating(true)
                    navigate('/product/bakery-favorites')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="featured-image-wrapper">
                    <img
                      src={bakeryImage}
                      alt="Bakery Favorites"
                      className="featured-image"
                    />
                    <span className="featured-badge badge-sell">SELL -25%</span>
                  </div>
                  <h3 className="featured-name">Bakery Favorites</h3>
                  <div className="featured-rating">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <div className="featured-price">
                    <span className="current-price">₦135.00</span>
                    <span className="original-price">₦180.00</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Video Hero Section */}
      <section className="video-hero">
        <div className="video-hero-container">
          <div className="video-wrapper">
            <img src={plantsImage} alt="Gardening Video" className="video-placeholder" />
            <button className="play-button">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="white" opacity="0.9"/>
                <path d="M25 20L25 40L40 30L25 20Z" fill="#4CAF50"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <p className="testimonials-label">// TESTIMONIALS</p>
            <h2 className="testimonials-title">Clients Feedbacks.</h2>
          </div>

          <div className="testimonials-wrapper">
            <button className="scroll-arrow scroll-arrow-left" onClick={() => {
              const scrollContainer = document.querySelector('.testimonials-scroll');
              if (scrollContainer) {
                scrollContainer.scrollBy({ left: -450, behavior: 'smooth' });
              }
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="testimonials-scroll">
            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src={testimonial1Image} alt="Noah Alexander" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">Noah Alexander</h4>
                  <p className="testimonial-role">Professor</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src={testimonial2Image} alt="Jacob William" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">Jacob William</h4>
                  <p className="testimonial-role">Founder, Browni Co.</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Michael Johnson" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">Michael Johnson</h4>
                  <p className="testimonial-role">Chef, Green Kitchen</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" alt="Sarah Martinez" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">Sarah Martinez</h4>
                  <p className="testimonial-role">Nutritionist</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" alt="David Chen" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">David Chen</h4>
                  <p className="testimonial-role">Restaurant Owner</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-image-wrapper">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" alt="Emily Rodriguez" className="testimonial-image" />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-quote-icon">💬</div>
                <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">Emily Rodriguez</h4>
                  <p className="testimonial-role">Food Blogger</p>
                </div>
              </div>
            </div>
          </div>
            <button className="scroll-arrow scroll-arrow-right" onClick={() => {
              const scrollContainer = document.querySelector('.testimonials-scroll');
              if (scrollContainer) {
                scrollContainer.scrollBy({ left: 450, behavior: 'smooth' });
              }
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="latest-blog">
        <div className="blog-container">
          <h2 className="blog-title">Latest Blog</h2>
          
          <div className="blog-grid">
            <article className="blog-card">
              <div className="blog-image-wrapper">
                <img src={blogImage1} alt="Blog Post" className="blog-image" />
              </div>
              <div className="blog-meta">
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="currentColor"/>
                    <path d="M8 9C5.79086 9 4 10.7909 4 13V15H12V13C12 10.7909 10.2091 9 8 9Z" fill="currentColor"/>
                  </svg>
                  by: Admin
                </span>
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L10.5 6H13.5L10.5 9.5L11.5 13.5L8 11L4.5 13.5L5.5 9.5L2.5 6H5.5L8 2Z" fill="#4CAF50"/>
                  </svg>
                  Business
                </span>
              </div>
              <h3 className="blog-card-title">Common Engine Oil Problems and Solutions</h3>
              <div className="blog-footer">
                <span className="blog-date">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 2V5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 2V5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  June 22, 2025
                </span>
                <a href="#read-more" className="blog-read-more">READ MORE</a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-image-wrapper">
                <img src={blogImage2} alt="Blog Post" className="blog-image" />
              </div>
              <div className="blog-meta">
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="currentColor"/>
                    <path d="M8 9C5.79086 9 4 10.7909 4 13V15H12V13C12 10.7909 10.2091 9 8 9Z" fill="currentColor"/>
                  </svg>
                  by: CEO
                </span>
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L10.5 6H13.5L10.5 9.5L11.5 13.5L8 11L4.5 13.5L5.5 9.5L2.5 6H5.5L8 2Z" fill="#4CAF50"/>
                  </svg>
                  Services
                </span>
              </div>
              <h3 className="blog-card-title">How and when to replace brake rotors</h3>
              <div className="blog-footer">
                <span className="blog-date">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 2V5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 2V5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  June 22, 2025
                </span>
                <a href="#read-more" className="blog-read-more">READ MORE</a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-image-wrapper">
                <img src={blogImage3} alt="Blog Post" className="blog-image" />
              </div>
              <div className="blog-meta">
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="currentColor"/>
                    <path d="M8 9C5.79086 9 4 10.7909 4 13V15H12V13C12 10.7909 10.2091 9 8 9Z" fill="currentColor"/>
                  </svg>
                  by: COO
                </span>
                <span className="blog-meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L10.5 6H13.5L10.5 9.5L11.5 13.5L8 11L4.5 13.5L5.5 9.5L2.5 6H5.5L8 2Z" fill="#4CAF50"/>
                  </svg>
                  Consultant
                </span>
              </div>
              <h3 className="blog-card-title">Electric Car Maintenance, Servicing & re</h3>
              <div className="blog-footer">
                <span className="blog-date">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 5H14" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 2V5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M11 2V5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  June 22, 2025
                </span>
                <a href="#read-more" className="blog-read-more">READ MORE</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* Top Features Section */}
        <div className="footer-features">
          <div className="footer-features-container">
            <div className="feature-card">
              <img src={curatedIcon} alt="Curated Products" className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">Curated Products</h4>
                <p className="feature-description">Provide free home delivery for all product over ₦100</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <img src={handmadeIcon} alt="Handmade" className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">Handmade</h4>
                <p className="feature-description">We ensure the product quality that is our main goal</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <img src={naturalIcon} alt="Natural Food" className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">Natural Food</h4>
                <p className="feature-description">Return product within 3 days for any product you buy</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-card">
              <img src={deliveryIcon} alt="Free home delivery" className="feature-icon" />
              <div className="feature-content">
                <h4 className="feature-title">Free home delivery</h4>
                <p className="feature-description">We ensure the product quality that you can trust easily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-container">
            {/* Column 1: Brand & Contact */}
            <div className="footer-column">
              <div className="footer-brand">
                <img src={logo} alt="MarketGreen Logo" className="footer-logo" />
                <span className="footer-brand-name">
                  <span className="footer-market">Market</span>
                  <span className="footer-green">Green</span>
                </span>
              </div>
              <p className="footer-description">
                Grocery platform offering fresh produce, daily essentials, personalized recommendations, and seamless ordering with secure payment options.
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1C5.2 1 3 3.2 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.2 10.8 1 8 1ZM8 8C7.1 8 6.3 7.6 5.8 7C5.3 6.4 5 5.6 5 4.7C5 3.8 5.3 3 5.8 2.4C6.3 1.8 7.1 1.5 8 1.5C8.9 1.5 9.7 1.8 10.2 2.4C10.7 3 11 3.8 11 4.7C11 5.6 10.7 6.4 10.2 7C9.7 7.6 8.9 8 8 8Z" fill="currentColor"/>
                  </svg>
                  <span>Brooklyn, New York, United States</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 1C2.7 1 2 1.7 2 2.5V13.5C2 14.3 2.7 15 3.5 15H12.5C13.3 15 14 14.3 14 13.5V2.5C14 1.7 13.3 1 12.5 1H3.5ZM3.5 2H12.5C12.8 2 13 2.2 13 2.5V13.5C13 13.8 12.8 14 12.5 14H3.5C3.2 14 3 13.8 3 13.5V2.5C3 2.2 3.2 2 3.5 2Z" fill="currentColor"/>
                    <path d="M7 3H9V4H7V3ZM7 5H9V6H7V5ZM7 7H9V8H7V7Z" fill="currentColor"/>
                  </svg>
                  <span>+0123-456789</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3C2 2.4 2.4 2 3 2H13C13.6 2 14 2.4 14 3V13C14 13.6 13.6 14 13 14H3C2.4 14 2 13.6 2 13V3ZM3 3V4.5L8 7.5L13 4.5V3H3ZM13 5.5L8 8.5L3 5.5V13H13V5.5Z" fill="currentColor"/>
                  </svg>
                  <span>info@marketgreen.com</span>
                </div>
              </div>
              <div className="footer-social">
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#youtube" className="social-icon" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#products">All Products</a></li>
                <li><a href="#locations">Locations Map</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact us</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-column">
              <h4 className="footer-column-title">Services.</h4>
              <ul className="footer-links">
                <li><a href="#tracking">Order tracking</a></li>
                <li><a href="#wishlist">Wish List</a></li>
                <li><a href="#login">Login</a></li>
                <li><a href="#account">My account</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#promotions">Promotional Offers</a></li>
              </ul>
            </div>

            {/* Column 4: Customer Care */}
            <div className="footer-column">
              <h4 className="footer-column-title">Customer Care</h4>
              <ul className="footer-links">
                <li><a href="#login">Login</a></li>
                <li><a href="#account">My account</a></li>
                <li><a href="#wishlist">Wish List</a></li>
                <li><a href="#tracking">Order tracking</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact us</a></li>
              </ul>
            </div>

            {/* Column 5: Newsletter & Payment */}
            <div className="footer-column">
              <h4 className="footer-column-title">Newsletter</h4>
              <p className="newsletter-description">Subscribe to our weekly Newsletter and receive updates via email.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Email*" className="newsletter-input" />
                <button className="newsletter-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <h4 className="footer-column-title payment-title">We Accept</h4>
              <div className="payment-methods">
                <img src={paymentImage} alt="Payment Methods" className="payment-image" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="copyright">All Rights Reserved @ <span className="footer-market">Market</span><span className="footer-green">Green</span> 2025</p>
            <div className="footer-legal">
              <a href="#terms">Terms & Conditions</a>
              <span className="legal-divider">|</span>
              <a href="#claim">Claim</a>
              <span className="legal-divider">|</span>
              <a href="#privacy">Privacy & Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Side Drawer - Only visible on mobile */}
      <div 
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-drawer-header">
            <div className="logo">
              <img src={logo} alt="MarketGreen Logo" />
              <span className="logo-text">
                <span className="logo-market">Market</span>
                <span className="logo-green">Green</span>
              </span>
            </div>
            <button 
              className="mobile-drawer-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-drawer-nav">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                navigate('/about')
              }}
            >
              About
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                navigate('/shop')
              }}
            >
              Shop +
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                navigate('/contact')
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <NavigationLoader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failed" element={<PaymentFailedPage />} />
        <Route path="/payment/error" element={<PaymentErrorPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/voucher" element={<VoucherPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  )
}

export default App

