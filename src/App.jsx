import './App.css'
import logo from './assets/images/logo.png'
import fruitsImage from './assets/images/pictures/fruits.png'
import backgroundImage from './assets/images/pictures/background.png'
import ellipseImage from './assets/images/vector/ellipse.png'
import appleImage from './assets/images/vector/apple.png'
import fruityImage from './assets/images/pictures/fruity.png'
import diaryImage from './assets/images/pictures/diary.png'
import staplesImage from './assets/images/pictures/staples.png'
import snacksImage from './assets/images/pictures/snacks.png'
import householdImage from './assets/images/pictures/household.png'

function App() {
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
            <a href="#about">About</a>
            <a href="#shop">Shop +</a>
            <a href="#news">News +</a>
            <a href="#collections">Collections</a>
            <a href="#contact">Contact</a>
          </nav>
          
          <div className="header-actions">
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-btn">
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
          <div className="features-divider">|</div>
          <div className="features-list">
            <div className="feature-item">
              <img src={appleImage} alt="Apple" className="feature-icon" />
              <span>Fresh Groceries</span>
            </div>
            <div className="features-divider">|</div>
            <div className="feature-item">
              <span className="feature-icon">!</span>
              <span>Daily Needs</span>
            </div>
            <div className="features-divider">|</div>
            <div className="feature-item">
              <span className="feature-icon">+</span>
              <span>Pantry Essentials</span>
            </div>
            <div className="features-divider">|</div>
            <div className="feature-item">
              <span className="feature-icon">🏃</span>
              <span>Healthy Living</span>
            </div>
            <div className="features-divider">|</div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span>Quick Delivery</span>
            </div>
          </div>
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
    </div>
  )
}

export default App

