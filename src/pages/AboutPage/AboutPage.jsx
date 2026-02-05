import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import CartDropdown from '../../components/CartDropdown.jsx'
import UserMenuDropdown from '../../components/UserMenuDropdown.jsx'
import '../../App.css'
import logo from '../../assets/images/logo.png'
import backgroundMenuImage from '../../assets/images/pictures/background-menu.png'
import gardenerImage from '../../assets/images/testimonials/gardener.png'
import serviceImage1 from '../../assets/images/services/picture-1.png'
import serviceImage2 from '../../assets/images/services/picture-2.png'
import serviceImage3 from '../../assets/images/services/picture - 3.png'
import serviceImage4 from '../../assets/images/services/picture-4.png'
import serviceImage5 from '../../assets/images/services/picture-5.png'
import serviceImage6 from '../../assets/images/services/picture-6.png'
import curatedIcon from '../../assets/images/vector/curated.png'
import deliveryIcon from '../../assets/images/vector/delivery.png'
import handmadeIcon from '../../assets/images/vector/handmade.png'
import naturalIcon from '../../assets/images/vector/natural.png'
import paymentImage from '../../assets/images/vector/payment.png'

function AboutPage() {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleNavigateHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleNavigateShop = (e) => {
    e.preventDefault()
    navigate('/shop')
  }

  const handleNavigateAbout = (e) => {
    e.preventDefault()
    navigate('/about')
  }

  const handleNavigateContact = (e) => {
    e.preventDefault()
    navigate('/contact')
  }

  return (
    <div className="App about-page">
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
            <a href="#" className="active" onClick={handleNavigateAbout}>About</a>
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
            <button className="shop-now-btn">SHOP NOW</button>
          </div>
        </div>
      </header>
      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* About Hero */}
      <section className="about-hero" style={{ '--about-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="about-hero-overlay">
          <div className="about-hero-container">
            <div className="about-hero-content">
              <p className="about-hero-subtitle">Who we really are</p>
              <h1 className="about-hero-title">What We Do</h1>
            </div>
            <div className="shop-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Services</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services / About Content */}
      <section className="about-services">
        <div className="about-services-container">
          <div className="about-image-column">
            <div className="about-image-card">
              <div className="about-image-accent" />
              <img src={gardenerImage} alt="Qualified gardener" className="about-main-image" />
            </div>
          </div>

          <div className="about-text-column">
            <p className="about-section-label">// Reliable Services</p>
            <h2 className="about-section-title">
              We are Qualified &amp; <br />
              Professional<span className="about-title-dot">.</span>
            </h2>
            <p className="about-section-lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
            <p className="about-section-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <div className="about-services-grid">
              <div className="about-service-item">
                <span className="about-service-dot" />
                <span>24/7 Online Support</span>
              </div>
              <div className="about-service-item">
                <span className="about-service-dot" />
                <span>Expert Team</span>
              </div>
              <div className="about-service-item">
                <span className="about-service-dot" />
                <span>Pure Equipment</span>
              </div>
              <div className="about-service-item">
                <span className="about-service-dot" />
                <span>Unlimited Product</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Grid */}
      <section className="about-services-list">
        <div className="about-services-list-container">
          <h2 className="about-services-heading">Our Services</h2>

          <div className="about-services-cards">
            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage1} alt="Organic Vegetables" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Organic Vegetables</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
              </div>
            </article>

            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage2} alt="Organic Meat" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Organic Meat</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
              </div>
            </article>

            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage3} alt="Firm Fresh Fruits" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Firm Fresh Fruits</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
              </div>
            </article>

            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage4} alt="Organic Vegetables" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Organic Vegetables</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
              </div>
            </article>

            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage5} alt="Organic Vegetables" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Organic Vegetables</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
              </div>
            </article>

            <article className="about-service-card">
              <div className="about-service-image-wrapper">
                <img src={serviceImage6} alt="Organic Vegetables" className="about-service-image" />
              </div>
              <div className="about-service-content">
                <h3 className="about-service-title">Organic Vegetables</h3>
                <p className="about-service-text">
                  Lorem ipsum dolor sit amet cons ectet ur adipiscing elit sed do eiusmod te incididunt ut labore.
                </p>
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

export default AboutPage


