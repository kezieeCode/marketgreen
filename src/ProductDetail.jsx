import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import './App.css'
import logo from './assets/images/logo.png'
import delightImage from './assets/images/pictures/delight.png'
import tomatoesImage from './assets/images/pictures/tomatoes.png'
import juiceImage from './assets/images/pictures/juice.png'
import orangeImage from './assets/images/pictures/orange.png'
import avocadoImage from './assets/images/pictures/avocado.png'
import guavaImage from './assets/images/pictures/guava.png'
import masromImage from './assets/images/pictures/masrom.png'
import kiwiImage from './assets/images/pictures/kiwi.png'
import fruitsComboImage from './assets/images/products/fruits.png'
import discountImage from './assets/images/products/discount.png'
import vegetablePackImage from './assets/images/products/vegies.png'
import staplesKitImage from './assets/images/products/grains.png'
import dairyPackImage from './assets/images/products/milk.png'
import snacksComboImage from './assets/images/products/munchies.png'
import breakfastImage from './assets/images/products/breakfast.png'
import healthKitImage from './assets/images/products/health.png'
import bakeryImage from './assets/images/products/bakery.png'
import curatedIcon from './assets/images/vector/curated.png'
import deliveryIcon from './assets/images/vector/delivery.png'
import handmadeIcon from './assets/images/vector/handmade.png'
import naturalIcon from './assets/images/vector/natural.png'
import paymentImage from './assets/images/vector/payment.png'

// Mock product data - in a real app, this would come from an API
const products = {
  'mix-berry-delight': {
    id: 'mix-berry-delight',
    name: 'Mix Berry Delight',
    price: 121.66,
    originalPrice: 158.00,
    rating: 4,
    reviews: 3,
    categories: ['Fruits', 'Berry'],
    images: [delightImage, fruitsComboImage, tomatoesImage, juiceImage],
    description: `Indulge in the perfect harmony of nature's sweetest treasures with our Mix Berry Delight. This premium collection features a carefully curated blend of five antioxidant-rich berries: plump strawberries, sweet blueberries, tart raspberries, juicy blackberries, and tangy cranberries. Each berry is hand-selected at peak ripeness from trusted local farms, ensuring exceptional flavor and maximum nutritional value.

Our Mix Berry Delight is a powerhouse of health benefits. These berries are rich in vitamin C, vitamin K, manganese, and dietary fiber. They're loaded with powerful antioxidants like anthocyanins and flavonoids that help combat free radicals, reduce inflammation, and support cardiovascular health. Regular consumption can boost your immune system, improve cognitive function, and promote healthy, glowing skin.

The natural sweetness of these berries makes them perfect for a variety of uses. Enjoy them fresh as a healthy snack, blend them into smoothies and shakes, add them to yogurt or oatmeal, use them in baking, or create refreshing fruit salads. They're also excellent for making jams, preserves, and desserts. Each bite delivers a burst of natural flavor that satisfies your sweet tooth while nourishing your body.

Our berries are carefully packaged to maintain freshness and are delivered in optimal condition. They're perfect for families looking to incorporate more fruits into their diet, fitness enthusiasts seeking natural energy sources, or anyone who appreciates the finest quality produce. Experience the delightful combination of flavors and textures that only nature can provide.`
  },
  'red-hot-tomato': {
    id: 'red-hot-tomato',
    name: 'Red Hot Tomato',
    price: 118.26,
    originalPrice: 162.00,
    rating: 5,
    reviews: 12,
    categories: ['Vegetables', 'Fresh'],
    images: [tomatoesImage, delightImage, fruitsComboImage, juiceImage],
    description: `Experience the perfect balance of sweetness and acidity with our premium Red Hot Tomatoes. These vibrant, ruby-red tomatoes are hand-selected from local farms, ensuring peak ripeness and exceptional flavor. Each tomato is carefully grown using sustainable farming practices, resulting in a firm texture and rich, juicy interior.

Our Red Hot Tomatoes are packed with essential nutrients including lycopene, vitamin C, potassium, and folate. They're perfect for salads, sandwiches, sauces, and cooking. The natural sweetness makes them ideal for fresh consumption, while their robust flavor profile enhances any culinary creation. These tomatoes are non-GMO, pesticide-free, and delivered fresh to maintain their nutritional value and taste.

Whether you're preparing a classic Caprese salad, a hearty pasta sauce, or simply enjoying them fresh with a sprinkle of salt, these Red Hot Tomatoes will elevate your dishes with their superior quality and flavor.`
  },
  'vegetables-juices': {
    id: 'vegetables-juices',
    name: 'Vegetables Juices',
    price: 68.00,
    originalPrice: 85.00,
    rating: 5,
    reviews: 8,
    categories: ['Beverages', 'Juices'],
    images: [juiceImage, tomatoesImage, delightImage, fruitsComboImage],
    description: `Revitalize your body with our premium blend of fresh vegetable juices. This nutrient-dense combination features a carefully crafted mix of organic carrots, celery, spinach, kale, cucumber, and beets. Each bottle is cold-pressed to preserve maximum vitamins, minerals, and enzymes without any heat processing.

Our vegetable juices are rich in antioxidants, vitamins A, C, and K, as well as essential minerals like iron, potassium, and magnesium. The natural combination of vegetables provides a balanced, earthy flavor that's both refreshing and energizing. Perfect for detoxification, immune support, and maintaining optimal health.

This juice blend is 100% natural with no added sugars, preservatives, or artificial ingredients. It's an excellent way to increase your daily vegetable intake, support digestion, and boost your energy levels naturally. Enjoy it as a morning pick-me-up, post-workout recovery drink, or as part of your wellness routine.`
  },
  'orange-fresh-juice': {
    id: 'orange-fresh-juice',
    name: 'Orange Fresh Juice',
    price: 73.60,
    originalPrice: 92.00,
    rating: 5,
    reviews: 15,
    categories: ['Beverages', 'Juices'],
    images: [orangeImage, juiceImage, tomatoesImage, delightImage],
    description: `Savor the sunshine in every sip with our 100% pure Orange Fresh Juice. Made from hand-picked, sun-ripened oranges, this juice is freshly squeezed daily to capture the natural sweetness and vibrant flavor of premium citrus fruits. Each bottle contains the juice of approximately 8-10 fresh oranges, ensuring you get the full nutritional benefits.

Packed with vitamin C, folate, and potassium, our orange juice supports immune health, promotes collagen production, and helps maintain healthy blood pressure. The natural sugars provide quick energy, while the high vitamin C content aids in iron absorption and supports overall wellness.

Our Orange Fresh Juice is never from concentrate, contains no added sugars or preservatives, and is pasteurized to ensure safety while maintaining maximum flavor and nutrients. Perfect for breakfast, as a refreshing midday drink, or as a natural source of hydration. Start your day with the bright, tangy taste of fresh oranges and feel the natural energy boost.`
  },
  'avocado': {
    id: 'avocado',
    name: 'Avocado',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4,
    reviews: 7,
    categories: ['Fruits', 'Fresh'],
    images: [avocadoImage, fruitsComboImage, tomatoesImage, juiceImage],
    description: `Discover the creamy, nutrient-rich goodness of our premium Avocados. These perfectly ripened avocados are hand-selected for their optimal texture and flavor. Rich in healthy monounsaturated fats, fiber, and essential vitamins, avocados are a superfood that supports heart health, aids in weight management, and promotes glowing skin.

Our avocados are sourced from trusted growers who follow sustainable farming practices. Each avocado is carefully packed to ensure it arrives at peak ripeness. Perfect for making guacamole, adding to salads, spreading on toast, or enjoying fresh.`
  },
  'guava': {
    id: 'guava',
    name: 'Guava',
    price: 73.60,
    originalPrice: 92.00,
    rating: 5,
    reviews: 10,
    categories: ['Fruits', 'Tropical'],
    images: [guavaImage, fruitsComboImage, delightImage, tomatoesImage],
    description: `Experience the exotic sweetness of our premium Guavas. These tropical fruits are packed with vitamin C, fiber, and antioxidants. Known for their unique flavor profile that combines sweetness with a hint of tartness, guavas are perfect for eating fresh, making juices, or adding to fruit salads.`
  },
  'masrom': {
    id: 'masrom',
    name: 'Masrom',
    price: 58.50,
    originalPrice: 78.00,
    rating: 3,
    reviews: 5,
    categories: ['Vegetables', 'Fresh'],
    images: [masromImage, tomatoesImage, delightImage, fruitsComboImage],
    description: `Fresh and flavorful Masrom vegetables, carefully selected for their quality and taste. These vegetables are perfect for adding nutrition and flavor to your meals.`
  },
  'kiwi': {
    id: 'kiwi',
    name: 'Kiwi',
    price: 135.00,
    originalPrice: 180.00,
    rating: 4,
    reviews: 9,
    categories: ['Fruits', 'Fresh'],
    images: [kiwiImage, fruitsComboImage, delightImage, tomatoesImage],
    description: `Enjoy the tangy sweetness of our premium Kiwis. These small but mighty fruits are packed with vitamin C, vitamin K, and fiber. Their vibrant green flesh and unique flavor make them a favorite for fruit salads, smoothies, or simply eating fresh.`
  },
  'fresh-fruits-combo': {
    id: 'fresh-fruits-combo',
    name: 'Fresh Fruits Combo',
    price: 118.26,
    originalPrice: 162.00,
    rating: 4,
    reviews: 6,
    categories: ['Fruits', 'Combo'],
    images: [fruitsComboImage, delightImage, tomatoesImage, juiceImage],
    description: `A delightful combination of fresh, seasonal fruits carefully selected for their quality and flavor. This combo includes a variety of fruits perfect for families, offering a healthy and delicious snack option.`
  },
  'vegetable-essentials-pack': {
    id: 'vegetable-essentials-pack',
    name: 'Vegetable Essentials Pack',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4,
    reviews: 5,
    categories: ['Vegetables', 'Pack'],
    images: [vegetablePackImage, tomatoesImage, delightImage, fruitsComboImage],
    description: `A comprehensive pack of essential vegetables for your kitchen. This pack includes a variety of fresh, organic vegetables perfect for daily cooking needs.`
  },
  'organic-staples-kit': {
    id: 'organic-staples-kit',
    name: 'Organic Staples Kit',
    price: 73.60,
    originalPrice: 92.00,
    rating: 5,
    reviews: 8,
    categories: ['Grains', 'Organic'],
    images: [staplesKitImage, vegetablePackImage, fruitsComboImage, delightImage],
    description: `A complete kit of organic staple foods including grains, pulses, and essential pantry items. All products are certified organic and sourced from trusted suppliers.`
  },
  'dairy-delight-pack': {
    id: 'dairy-delight-pack',
    name: 'Dairy Delight Pack',
    price: 58.50,
    originalPrice: 78.00,
    rating: 4,
    reviews: 7,
    categories: ['Dairy', 'Pack'],
    images: [dairyPackImage, delightImage, fruitsComboImage, tomatoesImage],
    description: `A selection of premium dairy products including milk, cheese, yogurt, and butter. All products are fresh and sourced from local dairy farms.`
  },
  'snacks-munchies-combo': {
    id: 'snacks-munchies-combo',
    name: 'Snacks & Munchies Combo',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4,
    reviews: 4,
    categories: ['Snacks', 'Combo'],
    images: [snacksComboImage, breakfastImage, fruitsComboImage, delightImage],
    description: `A fun collection of snacks and munchies perfect for parties, movie nights, or anytime snacking. Includes a variety of chips, crackers, and other tasty treats.`
  },
  'breakfast-essentials': {
    id: 'breakfast-essentials',
    name: 'Breakfast Essentials',
    price: 73.60,
    originalPrice: 92.00,
    rating: 5,
    reviews: 11,
    categories: ['Breakfast', 'Essentials'],
    images: [breakfastImage, snacksComboImage, fruitsComboImage, delightImage],
    description: `Everything you need for a perfect breakfast. This pack includes cereals, bread, spreads, and other breakfast essentials to start your day right.`
  },
  'healthy-living-kit': {
    id: 'healthy-living-kit',
    name: 'Healthy Living Kit',
    price: 58.50,
    originalPrice: 78.00,
    rating: 4,
    reviews: 6,
    categories: ['Health', 'Kit'],
    images: [healthKitImage, fruitsComboImage, delightImage, tomatoesImage],
    description: `A curated collection of health-focused products designed to support your wellness journey. Includes superfoods, supplements, and nutritious snacks.`
  },
  'bakery-favorites': {
    id: 'bakery-favorites',
    name: 'Bakery Favorites',
    price: 135.00,
    originalPrice: 180.00,
    rating: 5,
    reviews: 13,
    categories: ['Bakery', 'Bread'],
    images: [bakeryImage, breakfastImage, fruitsComboImage, delightImage],
    description: `A selection of freshly baked bread, pastries, and bakery items. All items are baked daily using traditional methods and premium ingredients.`
  }
}

const topRatedProducts = [
  {
    id: 'red-hot-tomato',
    name: 'Red Hot Tomato',
    image: tomatoesImage,
    rating: 5,
    price: 118.26,
    originalPrice: 162.00
  },
  {
    id: 'vegetables-juices',
    name: 'Vegetables Juices',
    image: juiceImage,
    rating: 5,
    price: 68.00,
    originalPrice: 85.00
  },
  {
    id: 'orange-fresh-juice',
    name: 'Orange Fresh Juice',
    image: orangeImage,
    rating: 5,
    price: 73.60,
    originalPrice: 92.00
  }
]

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products[id] || products['mix-berry-delight']
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ))
  }

  return (
    <div className="product-detail-page">
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
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <a href="#about">About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop') }}>Shop +</a>
            <a href="#contact">Contact</a>
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

      {/* Main Content */}
      <div className="product-detail-container">
        {/* Product Images Section */}
        <div className="product-images-section">
          <div className="main-product-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="thumbnail-nav">
            <button className="nav-arrow" onClick={() => setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="nav-arrow" onClick={() => setSelectedImage(prev => (prev + 1) % product.images.length)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-section">
            <h1 className="product-detail-name">{product.name}</h1>
            <div className="product-rating-section">
              {renderStars(product.rating)}
              <span className="reviews-count">({String(product.reviews).padStart(2, '0')} Reviews)</span>
            </div>
            <div className="product-pricing">
              <span className="current-price">${product.price.toFixed(2)}</span>
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            </div>
            <div className="product-categories">
              <span className="categories-label">Categories:</span>
              <span className="categories-value">{product.categories.join(', ')}</span>
            </div>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
                min="1"
              />
              <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="add-to-cart-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ADD TO CART
            </button>
            <div className="product-actions">
              <a href="#wishlist" className="action-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2.5C6.5 1.5 4.5 1.5 3 2.5C1.5 3.5 1 5 1 6.5C1 8 1.5 9.5 3 10.5L8 13.5L13 10.5C14.5 9.5 15 8 15 6.5C15 5 14.5 3.5 13 2.5C11.5 1.5 9.5 1.5 8 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Wishlist
              </a>
              <a href="#compare" className="action-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Compare
              </a>
            </div>
            <div className="share-section">
              <span className="share-label">Share:</span>
              <div className="social-icons">
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#instagram" className="social-icon" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="safe-checkout">
              <span className="safe-checkout-text">Guaranteed Safe Checkout</span>
              <div className="payment-logos">
                <span className="payment-logo">VISA</span>
                <span className="payment-logo">MC</span>
                <span className="payment-logo">AMEX</span>
                <span className="payment-logo">DISCOVER</span>
                <span className="payment-logo">🔒</span>
                <span className="payment-logo">✓</span>
                <span className="payment-logo">PayPal</span>
              </div>
            </div>
          </div>

        {/* Right Sidebar - Top Rated Products */}
        <div className="product-sidebar">
          <div className="top-rated-section">
            <h3 className="sidebar-title">— Top Rated Product</h3>
            <div className="top-rated-list">
              {topRatedProducts.map((item, index) => (
                <div key={item.id}>
                  <div className="top-rated-item" onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.image} alt={item.name} className="top-rated-image" />
                    <div className="top-rated-info">
                      <div className="top-rated-rating">
                        {renderStars(item.rating)}
                      </div>
                      <h4 className="top-rated-name">{item.name}</h4>
                      <div className="top-rated-price">
                        <span className="current-price">${item.price.toFixed(2)}</span>
                        <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  {index < topRatedProducts.length - 1 && <div className="top-rated-divider"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Hot Sales Banner - Below Top Rated Product */}
          <div className="hot-sales-banner-inline">
            <div className="hot-sales-image-wrapper">
              <img src={discountImage} alt="Hot Sales" className="hot-sales-image" />
            </div>
          </div>
        </div>

        {/* Product Description/Reviews Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h2 className="description-heading">Enjoy the vibrant taste and health benefits of mix berries</h2>
                <p className="description-text">{product.description}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="related-products">
        <div className="related-products-container">
          <h2 className="related-products-title">Related Products.</h2>
          
          <div className="related-products-grid">
            {/* Row 1 */}
            <div className="related-product-card" onClick={() => navigate('/product/fresh-fruits-combo')}>
              <div className="related-product-image-wrapper">
                <img src={fruitsComboImage} alt="Fresh Fruits Combo" className="related-product-image" />
                <span className="related-product-badge badge-new">NEW</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Fresh Fruits Combo</h3>
              <div className="related-product-price">
                <span className="current-price">$118.26</span>
                <span className="original-price">$162.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/vegetable-essentials-pack')}>
              <div className="related-product-image-wrapper">
                <img src={vegetablePackImage} alt="Vegetable Essentials Pack" className="related-product-image" />
                <span className="related-product-badge badge-new">NEW</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Vegetable Essentials Pack</h3>
              <div className="related-product-price">
                <span className="current-price">$68.00</span>
                <span className="original-price">$85.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/organic-staples-kit')}>
              <div className="related-product-image-wrapper">
                <img src={staplesKitImage} alt="Organic Staples Kit" className="related-product-image" />
                <span className="related-product-badge badge-hot">HOT</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Organic Staples Kit</h3>
              <div className="related-product-price">
                <span className="current-price">$73.60</span>
                <span className="original-price">$92.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/dairy-delight-pack')}>
              <div className="related-product-image-wrapper">
                <img src={dairyPackImage} alt="Dairy Delight Pack" className="related-product-image" />
                <span className="related-product-badge badge-new">NEW</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Dairy Delight Pack</h3>
              <div className="related-product-price">
                <span className="current-price">$58.50</span>
                <span className="original-price">$78.00</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="related-product-card" onClick={() => navigate('/product/snacks-munchies-combo')}>
              <div className="related-product-image-wrapper">
                <img src={snacksComboImage} alt="Snacks & Munchies Combo" className="related-product-image" />
                <span className="related-product-badge badge-new">NEW</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Snacks & Munchies Combo</h3>
              <div className="related-product-price">
                <span className="current-price">$68.00</span>
                <span className="original-price">$85.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/breakfast-essentials')}>
              <div className="related-product-image-wrapper">
                <img src={breakfastImage} alt="Breakfast Essentials" className="related-product-image" />
                <span className="related-product-badge badge-hot">HOT</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Breakfast Essentials</h3>
              <div className="related-product-price">
                <span className="current-price">$73.60</span>
                <span className="original-price">$92.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/healthy-living-kit')}>
              <div className="related-product-image-wrapper">
                <img src={healthKitImage} alt="Healthy Living Kit" className="related-product-image" />
                <span className="related-product-badge badge-new">NEW</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Healthy Living Kit</h3>
              <div className="related-product-price">
                <span className="current-price">$58.50</span>
                <span className="original-price">$78.00</span>
              </div>
            </div>

            <div className="related-product-card" onClick={() => navigate('/product/bakery-favorites')}>
              <div className="related-product-image-wrapper">
                <img src={bakeryImage} alt="Bakery Favorites" className="related-product-image" />
                <span className="related-product-badge badge-sell">SELL -25%</span>
              </div>
              <div className="related-product-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <h3 className="related-product-name">Bakery Favorites</h3>
              <div className="related-product-price">
                <span className="current-price">$135.00</span>
                <span className="original-price">$180.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="product-features">
        <div className="product-features-container">
          <div className="product-feature-card">
            <img src={curatedIcon} alt="Curated Products" className="product-feature-icon" />
            <div className="product-feature-content">
              <h4 className="product-feature-title">Curated Products</h4>
              <p className="product-feature-description">Provide free home delivery for all product over $100</p>
            </div>
          </div>
          <div className="product-feature-divider"></div>
          <div className="product-feature-card">
            <img src={handmadeIcon} alt="Handmade" className="product-feature-icon" />
            <div className="product-feature-content">
              <h4 className="product-feature-title">Handmade</h4>
              <p className="product-feature-description">We ensure the product quality that is our main goal</p>
            </div>
          </div>
          <div className="product-feature-divider"></div>
          <div className="product-feature-card">
            <img src={naturalIcon} alt="Natural Food" className="product-feature-icon" />
            <div className="product-feature-content">
              <h4 className="product-feature-title">Natural Food</h4>
              <p className="product-feature-description">Return product within 3 days for any product you buy</p>
            </div>
          </div>
          <div className="product-feature-divider"></div>
          <div className="product-feature-card">
            <img src={deliveryIcon} alt="Free home delivery" className="product-feature-icon" />
            <div className="product-feature-content">
              <h4 className="product-feature-title">Free home delivery</h4>
              <p className="product-feature-description">We ensure the product quality that you can trust easily</p>
            </div>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#youtube" className="social-icon" aria-label="YouTube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  )
}

export default ProductDetail
