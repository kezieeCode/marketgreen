import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/images/logo.png'
import backgroundMenuImage from './assets/images/pictures/background-menu.png'
import tomatoesImage from './assets/images/pictures/tomatoes.png'
import juiceImage from './assets/images/pictures/juice.png'
import orangeImage from './assets/images/pictures/orange.png'
import avocadoImage from './assets/images/pictures/avocado.png'
import guavaImage from './assets/images/pictures/guava.png'
import kiwiImage from './assets/images/pictures/kiwi.png'
import masromImage from './assets/images/pictures/masrom.png'
import fruitsComboImage from './assets/images/products/fruits.png'
import vegetablePackImage from './assets/images/products/vegies.png'
import staplesKitImage from './assets/images/products/grains.png'
import dairyPackImage from './assets/images/products/milk.png'
import snacksComboImage from './assets/images/products/munchies.png'
import breakfastImage from './assets/images/products/breakfast.png'
import healthKitImage from './assets/images/products/health.png'
import curatedIcon from './assets/images/vector/curated.png'
import deliveryIcon from './assets/images/vector/delivery.png'
import handmadeIcon from './assets/images/vector/handmade.png'
import naturalIcon from './assets/images/vector/natural.png'
import paymentImage from './assets/images/vector/payment.png'

function ShopPage() {
  const navigate = useNavigate()
  const [priceMax, setPriceMax] = useState(1500)

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

  return (
    <div className="App shop-page">
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
            <a href="#" className="active" onClick={handleNavigateShop}>Shop +</a>
            <a href="#" onClick={handleNavigateContact}>Contact</a>
          </nav>

          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-btn" onClick={() => navigate('/signup')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="icon-btn cart-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="cart-badge">5</span>
            </button>
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
        </div>
      </header>

      {/* Shop Hero */}
      <section className="shop-hero" style={{ '--shop-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="shop-hero-overlay">
          <div className="shop-hero-container">
            <div className="shop-hero-content">
              <p className="shop-hero-subtitle">Shop all the products you need with affordable prices</p>
              <h1 className="shop-hero-title">Shop</h1>
            </div>
            <div className="shop-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Shop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="shop-content">
        <div className="shop-content-container">
          {/* Left: Products List */}
          <div className="shop-products">
            <div className="shop-toolbar">
              <div className="shop-view-toggle">
                <button className="view-btn active">▤</button>
                <button className="view-btn">≣</button>
              </div>
              <p className="shop-results">Showing 1-21 of 60 results</p>
              <div className="shop-sort">
                <select className="shop-sort-select" defaultValue="default">
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="shop-products-grid">
              <div className="product-card" onClick={() => navigate('/product/red-hot-tomato')}>
                <div className="product-image-wrapper">
                  <img src={tomatoesImage} alt="Red Hot Tomato" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Red Hot Tomato</h3>
                <div className="product-price">
                  <span className="current-price">$118.26</span>
                  <span className="original-price">$162.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/vegetables-juices')}>
                <div className="product-image-wrapper">
                  <img src={juiceImage} alt="Vegetables Juices" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Vegetables Juices</h3>
                <div className="product-price">
                  <span className="current-price">$68.00</span>
                  <span className="original-price">$85.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/orange-fresh-juice')}>
                <div className="product-image-wrapper">
                  <img src={orangeImage} alt="Orange Fresh Juice" className="product-image" />
                  <span className="product-badge badge-hot">HOT</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Orange Fresh Juice</h3>
                <div className="product-price">
                  <span className="current-price">$73.60</span>
                  <span className="original-price">$92.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/mix-berry-delight')}>
                <div className="product-image-wrapper">
                  <img src={fruitsComboImage} alt="Mix Berry Delight" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Mix Berry Delight</h3>
                <div className="product-price">
                  <span className="current-price">$121.66</span>
                  <span className="original-price">$158.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/avocado')}>
                <div className="product-image-wrapper">
                  <img src={avocadoImage} alt="Avocado" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Avocado</h3>
                <div className="product-price">
                  <span className="current-price">$68.00</span>
                  <span className="original-price">$85.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/guava')}>
                <div className="product-image-wrapper">
                  <img src={guavaImage} alt="Guava" className="product-image" />
                  <span className="product-badge badge-hot">HOT</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Guava</h3>
                <div className="product-price">
                  <span className="current-price">$73.60</span>
                  <span className="original-price">$92.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/masrom')}>
                <div className="product-image-wrapper">
                  <img src={masromImage} alt="Masrom" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Masrom</h3>
                <div className="product-price">
                  <span className="current-price">$58.50</span>
                  <span className="original-price">$78.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/kiwi')}>
                <div className="product-image-wrapper">
                  <img src={kiwiImage} alt="Kiwi" className="product-image" />
                  <span className="product-badge badge-sell">SELL -25%</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Kiwi</h3>
                <div className="product-price">
                  <span className="current-price">$135.00</span>
                  <span className="original-price">$180.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/snacks-munchies-combo')}>
                <div className="product-image-wrapper">
                  <img src={snacksComboImage} alt="Snacks & Munchies Combo" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Snacks &amp; Munchies Combo</h3>
                <div className="product-price">
                  <span className="current-price">$64.60</span>
                  <span className="original-price">$85.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/breakfast-essentials')}>
                <div className="product-image-wrapper">
                  <img src={breakfastImage} alt="Fresh Butter Cake" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Fresh Butter Cake</h3>
                <div className="product-price">
                  <span className="current-price">$138.60</span>
                  <span className="original-price">$180.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/fresh-fruits-combo')}>
                <div className="product-image-wrapper">
                  <img src={fruitsComboImage} alt="Orange Sliced Mix" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Orange Sliced Mix</h3>
                <div className="product-price">
                  <span className="current-price">$1,307</span>
                  <span className="original-price">$1,720</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/healthy-living-kit')}>
                <div className="product-image-wrapper">
                  <img src={healthKitImage} alt="Orange Sliced Mix" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Orange Sliced Mix</h3>
                <div className="product-price">
                  <span className="current-price">$1,358</span>
                  <span className="original-price">$1,720</span>
                </div>
              </div>

              {/* Additional Products */}
              <div className="product-card" onClick={() => navigate('/product/fresh-fruits-combo')}>
                <div className="product-image-wrapper">
                  <img src={fruitsComboImage} alt="Fresh Fruits Combo" className="product-image" />
                  <span className="product-badge badge-sell">SALE</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Fresh Fruits Combo</h3>
                <div className="product-price">
                  <span className="current-price">$129.60</span>
                  <span className="original-price">$162.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/vegetable-essentials-pack')}>
                <div className="product-image-wrapper">
                  <img src={vegetablePackImage} alt="Vegetable Essentials Pack" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Vegetable Essentials Pack</h3>
                <div className="product-price">
                  <span className="current-price">$66.30</span>
                  <span className="original-price">$85.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/organic-staples-kit')}>
                <div className="product-image-wrapper">
                  <img src={staplesKitImage} alt="Organic Staples Mix" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Organic Staples Mix</h3>
                <div className="product-price">
                  <span className="current-price">$121.66</span>
                  <span className="original-price">$158.00</span>
                </div>
              </div>

              <div className="product-card" onClick={() => navigate('/product/dairy-delight-pack')}>
                <div className="product-image-wrapper">
                  <img src={dairyPackImage} alt="Dairy Delight Pack" className="product-image" />
                  <span className="product-badge badge-new">NEW</span>
                </div>
                <div className="product-rating">
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star filled">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                </div>
                <h3 className="product-name">Dairy Delight Pack</h3>
                <div className="product-price">
                  <span className="current-price">$75.44</span>
                  <span className="original-price">$92.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="shop-sidebar">
            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Product Categories</h3>
              <ul className="shop-categories-list">
                <li>Vegetables</li>
                <li>Fruits</li>
                <li>Meat</li>
                <li>Fish</li>
                <li>Others</li>
                <li>Uncategorized</li>
              </ul>
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Filter By Price</h3>
              <p className="shop-price-range-label">Your range:</p>
              <div className="shop-price-range">{`$50 - $${priceMax}`}</div>
              <input
                type="range"
                min="50"
                max="1500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="shop-price-slider"
              />
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Top Rated Product</h3>
              <div className="shop-top-rated-list">
                <div
                  className="shop-top-rated-item"
                  onClick={() => navigate('/product/red-hot-tomato')}
                >
                  <img src={tomatoesImage} alt="Red Hot Tomato" className="shop-top-rated-image" />
                  <div className="shop-top-rated-info">
                    <div className="shop-top-rated-rating">
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star">★</span>
                    </div>
                    <h4 className="shop-top-rated-name">Red Hot Tomato</h4>
                    <div className="shop-top-rated-price">
                      <span className="current-price">$118.26</span>
                      <span className="original-price">$162.00</span>
                    </div>
                  </div>
                </div>

                <div
                  className="shop-top-rated-item"
                  onClick={() => navigate('/product/vegetables-juices')}
                >
                  <img src={juiceImage} alt="Vegetables Juices" className="shop-top-rated-image" />
                  <div className="shop-top-rated-info">
                    <div className="shop-top-rated-rating">
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star">★</span>
                    </div>
                    <h4 className="shop-top-rated-name">Vegetables Juices</h4>
                    <div className="shop-top-rated-price">
                      <span className="current-price">$68.00</span>
                      <span className="original-price">$85.00</span>
                    </div>
                  </div>
                </div>

                <div
                  className="shop-top-rated-item"
                  onClick={() => navigate('/product/orange-fresh-juice')}
                >
                  <img src={orangeImage} alt="Orange Fresh Juice" className="shop-top-rated-image" />
                  <div className="shop-top-rated-info">
                    <div className="shop-top-rated-rating">
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star filled">★</span>
                      <span className="star">★</span>
                    </div>
                    <h4 className="shop-top-rated-name">Orange Fresh Juice</h4>
                    <div className="shop-top-rated-price">
                      <span className="current-price">$73.60</span>
                      <span className="original-price">$92.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Search Objects</h3>
              <div className="shop-search">
                <input
                  type="text"
                  placeholder="Search your keyword..."
                  className="shop-search-input"
                />
                <button className="shop-search-button" aria-label="Search">
                  <span>🔍</span>
                </button>
              </div>
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Popular Tags</h3>
              <div className="shop-tags">
                {['Popular', 'Design', 'UX', 'Usability', 'Develop', 'Icon', 'Car', 'Service', 'Repairs', 'Auto Parts', 'Oil', 'Dealer', 'Oil Change', 'Body Color'].map(tag => (
                  <button key={tag} className="shop-tag">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Product Size</h3>
              <div className="shop-sizes">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button key={size} className="shop-size-option">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="shop-sidebar-card">
              <h3 className="shop-sidebar-title">— Product Color</h3>
              <div className="shop-colors">
                {[
                  '#000000', '#ffffff', '#f44336', '#ff9800', '#ffeb3b',
                  '#4caf50', '#2196f3', '#3f51b5', '#9c27b0', '#e91e63',
                  '#795548', '#9e9e9e', '#00bcd4', '#8bc34a', '#ffc107',
                  '#ff5722'
                ].map((color) => (
                  <button
                    key={color}
                    className="shop-color-swatch"
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="shop-sidebar-card shop-promo-card">
              <p className="shop-promo-subtitle">Green lemon &amp;</p>
              <h3 className="shop-promo-title">Orange Juice</h3>
              <p className="shop-promo-text">Best orange flavour you never miss.</p>
              <button className="shop-promo-button">Shop Now →</button>
              <div className="shop-promo-image-wrapper">
                <img src={orangeImage} alt="Green lemon & Orange Juice" className="shop-promo-image" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pagination */}
      <section className="shop-pagination-section">
        <div className="shop-pagination-container">
          <button className="shop-page-button active">1</button>
          <button className="shop-page-button">2</button>
          <button className="shop-page-button">3</button>
          <button className="shop-page-button">»</button>
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
                <p className="feature-description">Provide free home delivery for all product over $100</p>
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
            <p className="copyright">
              All Rights Reserved @ <span className="footer-market">Market</span>
              <span className="footer-green">Green</span> 2025
            </p>
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
    </div>
  )
}

export default ShopPage
