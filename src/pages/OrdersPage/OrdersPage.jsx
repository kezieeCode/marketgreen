import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useNavigation } from '../../context/NavigationContext.jsx'
import CartDropdown from '../../components/CartDropdown.jsx'
import UserMenuDropdown from '../../components/UserMenuDropdown.jsx'
import { API_ENDPOINTS } from '../../config/api.js'
import logo from '../../assets/images/logo.png'
import backgroundMenuImage from '../../assets/images/pictures/background-menu.png'
import fruitsComboImage from '../../assets/images/products/fruits.png'
import vegetablePackImage from '../../assets/images/products/vegies.png'
import dairyPackImage from '../../assets/images/products/milk.png'
import staplesKitImage from '../../assets/images/products/grains.png'
import './OrdersPage.css'

function OrdersPage() {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()
  const { setNavigating } = useNavigation()
  const { token, isAuthenticated, isLoading: authLoading } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    // Wait for auth context to finish loading from localStorage
    if (authLoading) {
      return
    }
    
    // Check authentication after loading is complete
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    
    // Only fetch orders if authenticated
    fetchOrders()
  }, [token, isAuthenticated, navigate, authLoading])

  const fetchOrders = async () => {
    setIsLoading(true)
    setError(null)
    
    // Get token directly from localStorage as fallback
    const authToken = token || localStorage.getItem('token')
    
    console.log('🛒 OrdersPage: Fetching orders from API...')
    console.log('📍 API Endpoint:', API_ENDPOINTS.ORDERS.LIST)
    console.log('🔑 Token from context:', token ? `${token.substring(0, 20)}...` : 'No token')
    console.log('🔑 Token from localStorage:', authToken ? `${authToken.substring(0, 20)}...` : 'No token')
    console.log('🔑 Final token being used:', authToken ? 'Token available' : 'NO TOKEN - This is the problem!')
    
    if (!authToken) {
      console.error('❌ OrdersPage: No authentication token available!')
      setError('Authentication required. Please log in again.')
      setIsLoading(false)
      navigate('/signup')
      return
    }
    
    try {
      const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
      
      console.log('📤 OrdersPage: Request Headers:', requestHeaders)
      console.log('📤 OrdersPage: Making fetch request...')
      
      const response = await fetch(API_ENDPOINTS.ORDERS.LIST, {
        method: 'GET',
        headers: requestHeaders,
        // Removed credentials: 'include' - not needed for Bearer token auth
        // and causes CORS issues when backend uses wildcard Access-Control-Allow-Origin
      })

      console.log('📡 OrdersPage: Response received')
      console.log('📊 Response Status:', response.status)
      console.log('📋 Response Status Text:', response.statusText)
      console.log('🔗 Response URL:', response.url)
      console.log('📦 Response Headers:', Object.fromEntries(response.headers.entries()))
      
      // Check if response has content
      const contentType = response.headers.get('content-type')
      console.log('📄 Content-Type:', contentType)
      
      // Get response text first to see what we're actually getting
      const responseText = await response.text()
      console.log('📝 OrdersPage: Raw Response Text:', responseText)
      console.log('📏 OrdersPage: Response Text Length:', responseText.length)

      if (!response.ok) {
        console.warn('⚠️ OrdersPage: Response not OK')
        console.warn('❌ Status:', response.status)
        
        if (response.status === 401) {
          console.warn('🔒 OrdersPage: Unauthorized - redirecting to signup')
          setError('Session expired. Please log in again.')
          navigate('/signup')
          return
        }
        
        // Try to parse error message
        try {
          const errorData = JSON.parse(responseText)
          console.error('📄 OrdersPage: Error response data:', errorData)
          setError(errorData.message || errorData.error || `Server error: ${response.status}`)
        } catch (e) {
          console.error('📄 OrdersPage: Could not parse error response as JSON')
          console.error('📄 OrdersPage: Error response text:', responseText)
          setError(`Server error: ${response.status} - ${response.statusText}`)
        }
        
        setIsLoading(false)
        return
      }

      // Parse JSON response
      let data
      try {
        data = responseText ? JSON.parse(responseText) : null
        console.log('✅ OrdersPage: Successfully parsed JSON response')
        console.log('📦 OrdersPage: Parsed API Response:', data)
        console.log('📊 OrdersPage: Response Type:', Array.isArray(data) ? 'Array' : typeof data)
        
        if (!data) {
          console.warn('⚠️ OrdersPage: Response is null or empty')
          setOrders([])
          setIsLoading(false)
          return
        }
      } catch (parseError) {
        console.error('❌ OrdersPage: Failed to parse JSON response')
        console.error('📄 OrdersPage: Parse error:', parseError)
        console.error('📄 OrdersPage: Response text that failed to parse:', responseText)
        setError('Invalid response format from server')
        setIsLoading(false)
        return
      }
      
      // Extract orders list
      let ordersList = []
      if (Array.isArray(data)) {
        ordersList = data
        console.log('📋 OrdersPage: Response is an array')
      } else if (data.orders && Array.isArray(data.orders)) {
        ordersList = data.orders
        console.log('📋 OrdersPage: Found orders array in response.orders')
      } else if (data.data && Array.isArray(data.data)) {
        ordersList = data.data
        console.log('📋 OrdersPage: Found orders array in response.data')
      } else if (data.results && Array.isArray(data.results)) {
        ordersList = data.results
        console.log('📋 OrdersPage: Found orders array in response.results')
      } else {
        console.warn('⚠️ OrdersPage: Unexpected response structure')
        console.warn('📋 OrdersPage: Response keys:', Object.keys(data))
        ordersList = []
      }
      
      console.log('📋 OrdersPage: Processed Orders List:', ordersList)
      console.log('🔢 OrdersPage: Number of orders:', ordersList.length)
      
      if (ordersList.length > 0) {
        console.log('📝 OrdersPage: First order sample:', JSON.stringify(ordersList[0], null, 2))
      } else {
        console.warn('⚠️ OrdersPage: Orders list is empty!')
        console.warn('📋 OrdersPage: This might be expected if user has no orders')
      }
      
      setOrders(ordersList)
    } catch (err) {
      console.error('❌ OrdersPage: Error fetching orders:', err)
      console.error('📋 OrdersPage: Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      })
      setError(`Failed to fetch orders: ${err.message}`)
    } finally {
      setIsLoading(false)
      console.log('🏁 OrdersPage: Fetch completed')
    }
  }

  // Mock orders for demo purposes
  const getMockOrders = () => {
    const now = Date.now()
    return [
      {
        id: 1,
        order_id: 'ORD-12345',
        status: 'completed',
        total_amount: 15450.00,
        subtotal: 15000.00,
        shipping_amount: 450.00,
        tax_amount: 0,
        discount_amount: 0,
        created_at: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
        payment_method: 'paystack',
        payment_status: 'paid',
        reference: 'REF-12345',
        tracking_number: 'TRK-789456123',
        estimated_delivery: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
        delivered_at: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { status: 'ordered', date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'confirmed', date: new Date(now - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'processing', date: new Date(now - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'shipped', date: new Date(now - 1.5 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'delivered', date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), completed: true }
        ],
        items: [
          {
            product: { name: 'Fresh Fruits Combo', image_url: fruitsComboImage, price: 118.26 },
            quantity: 2,
            price: 118.26
          },
          {
            product: { name: 'Vegetable Pack', image_url: vegetablePackImage, price: 68.00 },
            quantity: 1,
            price: 68.00
          }
        ],
        shipping_address: {
          full_name: 'John Doe',
          street: '123 Main Street',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          phone: '+234 123 456 7890'
        }
      },
      {
        id: 2,
        order_id: 'ORD-12346',
        status: 'shipped',
        total_amount: 8500.00,
        subtotal: 8000.00,
        shipping_amount: 500.00,
        tax_amount: 0,
        discount_amount: 0,
        created_at: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
        payment_method: 'paystack',
        payment_status: 'paid',
        reference: 'REF-12346',
        tracking_number: 'TRK-456789321',
        estimated_delivery: new Date(now + 1 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { status: 'ordered', date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'confirmed', date: new Date(now - 5 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'processing', date: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'shipped', date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'delivered', date: null, completed: false }
        ],
        items: [
          {
            product: { name: 'Dairy Pack', image_url: dairyPackImage, price: 58.50 },
            quantity: 3,
            price: 58.50
          }
        ],
        shipping_address: {
          full_name: 'John Doe',
          street: '123 Main Street',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          phone: '+234 123 456 7890'
        }
      },
      {
        id: 3,
        order_id: 'ORD-12347',
        status: 'pending',
        total_amount: 12500.00,
        subtotal: 12000.00,
        shipping_amount: 500.00,
        tax_amount: 0,
        discount_amount: 0,
        created_at: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
        payment_method: 'cash_on_delivery',
        payment_status: 'pending',
        tracking_number: null,
        estimated_delivery: new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          { status: 'ordered', date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), completed: true },
          { status: 'confirmed', date: null, completed: false },
          { status: 'processing', date: null, completed: false },
          { status: 'shipped', date: null, completed: false },
          { status: 'delivered', date: null, completed: false }
        ],
        items: [
          {
            product: { name: 'Staples Kit', image_url: staplesKitImage, price: 73.60 },
            quantity: 1,
            price: 73.60
          }
        ],
        shipping_address: {
          full_name: 'John Doe',
          street: '123 Main Street',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          phone: '+234 123 456 7890'
        }
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

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower.includes('pending') || statusLower.includes('processing')) {
      return '#FF9800'
    }
    if (statusLower.includes('completed') || statusLower.includes('delivered')) {
      return '#4CAF50'
    }
    if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return '#f44336'
    }
    if (statusLower.includes('shipped')) {
      return '#2196F3'
    }
    return '#666'
  }

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower.includes('pending') || statusLower.includes('processing')) {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM9.5 5H10.5V10.5H9.5V5ZM9.5 11.5H10.5V12.5H9.5V11.5Z" fill="currentColor"/>
        </svg>
      )
    }
    if (statusLower.includes('completed') || statusLower.includes('delivered')) {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
        </svg>
      )
    }
    if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="currentColor"/>
        </svg>
      )
    }
    if (statusLower.includes('shipped')) {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8L12 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V8ZM12 2.5L17.5 8H12V2.5ZM18 18H2V2H10V9H18V18Z" fill="currentColor"/>
        </svg>
      )
    }
    return null
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  const formatDeliveryDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      const today = new Date()
      const diffTime = date - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) {
        return `Delivered on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      } else if (diffDays === 0) {
        return 'Today'
      } else if (diffDays === 1) {
        return 'Tomorrow'
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      }
    } catch {
      return dateString
    }
  }

  const getTimelineSteps = (order) => {
    const defaultSteps = [
      { label: 'Ordered', key: 'ordered' },
      { label: 'Confirmed', key: 'confirmed' },
      { label: 'Processing', key: 'processing' },
      { label: 'Shipped', key: 'shipped' },
      { label: 'Delivered', key: 'delivered' }
    ]

    if (order.timeline && Array.isArray(order.timeline)) {
      return defaultSteps.map(step => {
        const timelineItem = order.timeline.find(t => t.status === step.key)
        return {
          ...step,
          completed: timelineItem?.completed || false,
          date: timelineItem?.date || null
        }
      })
    }

    // Fallback: determine from status
    const statusLower = order.status?.toLowerCase() || ''
    return defaultSteps.map((step, index) => {
      let completed = false
      if (statusLower.includes('completed') || statusLower.includes('delivered')) {
        completed = true
      } else if (statusLower.includes('shipped')) {
        completed = index < 4
      } else if (statusLower.includes('processing')) {
        completed = index < 3
      } else if (statusLower.includes('confirmed')) {
        completed = index < 2
      } else if (statusLower.includes('pending') || statusLower.includes('ordered')) {
        completed = index < 1
      }
      return { ...step, completed, date: null }
    })
  }

  const handleTrackPackage = (trackingNumber) => {
    if (!trackingNumber) {
      alert('Tracking number not available yet. It will be assigned once your order is shipped.')
      return
    }
    // In a real app, this would open a tracking page or external tracking service
    // For now, we'll show an alert with the tracking number
    window.open(`https://tracking.example.com/${trackingNumber}`, '_blank')
  }

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => {
        const statusLower = order.status?.toLowerCase() || ''
        if (filterStatus === 'pending') {
          return statusLower.includes('pending') || statusLower.includes('processing')
        }
        if (filterStatus === 'completed') {
          return statusLower.includes('completed') || statusLower.includes('delivered')
        }
        if (filterStatus === 'cancelled') {
          return statusLower.includes('cancelled') || statusLower.includes('failed')
        }
        if (filterStatus === 'shipped') {
          return statusLower.includes('shipped')
        }
        return true
      })

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="App orders-page">
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

      {/* Orders Hero */}
      <section className="orders-hero" style={{ '--orders-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="orders-hero-overlay">
          <div className="orders-hero-container">
            <div className="orders-hero-content">
              <p className="orders-hero-subtitle">Track and manage all your orders in one place</p>
              <h1 className="orders-hero-title">My Orders</h1>
            </div>
            <div className="orders-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="orders-content">
        <div className="orders-content-container">
          {/* Filters */}
          <div className="orders-filters">
            <div className="orders-filter-tabs">
              <button
                className={`orders-filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All Orders ({orders.length})
              </button>
              <button
                className={`orders-filter-tab ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending ({orders.filter(o => o.status?.toLowerCase().includes('pending') || o.status?.toLowerCase().includes('processing')).length})
              </button>
              <button
                className={`orders-filter-tab ${filterStatus === 'shipped' ? 'active' : ''}`}
                onClick={() => setFilterStatus('shipped')}
              >
                Shipped ({orders.filter(o => o.status?.toLowerCase().includes('shipped')).length})
              </button>
              <button
                className={`orders-filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('completed')}
              >
                Completed ({orders.filter(o => o.status?.toLowerCase().includes('completed') || o.status?.toLowerCase().includes('delivered')).length})
              </button>
              <button
                className={`orders-filter-tab ${filterStatus === 'cancelled' ? 'active' : ''}`}
                onClick={() => setFilterStatus('cancelled')}
              >
                Cancelled ({orders.filter(o => o.status?.toLowerCase().includes('cancelled') || o.status?.toLowerCase().includes('failed')).length})
              </button>
            </div>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="orders-loading">
              <div className="orders-loading-spinner"></div>
              <p>Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="orders-error">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f44336"/>
              </svg>
              <h3>Error Loading Orders</h3>
              <p>{error}</p>
              <button className="orders-retry-btn" onClick={fetchOrders}>Try Again</button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="orders-empty">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" fill="#ccc"/>
              </svg>
              <h3>No Orders Found</h3>
              <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button className="orders-shop-btn" onClick={() => navigate('/shop')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => (
                <div key={order.id || order.order_id} className="order-card">
                  <div className="order-card-header" onClick={() => toggleOrderDetails(order.id || order.order_id)}>
                    <div className="order-header-left">
                      <div className="order-id-section">
                        <h3 className="order-id">Order #{order.id || order.order_id || 'N/A'}</h3>
                        <p className="order-date">{formatDate(order.created_at || order.createdAt || order.date)}</p>
                      </div>
                      <div className="order-items-count">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{order.items?.length || order.order_items?.length || 0} items</span>
                      </div>
                    </div>
                    <div className="order-header-right">
                      <div 
                        className="order-status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        <span className="order-status-icon">{getStatusIcon(order.status)}</span>
                        <span className="order-status-text">{order.status || 'Unknown'}</span>
                      </div>
                      <div className="order-total">
                        <span className="order-total-label">Total:</span>
                        <span className="order-total-amount">
                          ₦{Number(order.total_amount || order.total || 0).toFixed(2)}
                        </span>
                      </div>
                      <button className="order-expand-btn">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={expandedOrder === (order.id || order.order_id) ? 'expanded' : ''}
                        >
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {expandedOrder === (order.id || order.order_id) && (
                    <div className="order-card-details">
                      {/* Tracking Section */}
                      <div className="order-tracking-section">
                        <div className="order-tracking-header">
                          <h4 className="order-details-title">Order Tracking</h4>
                          {order.tracking_number && (
                            <button 
                              className="track-package-btn"
                              onClick={() => handleTrackPackage(order.tracking_number)}
                            >
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2L3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V7L10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 2V10L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Track Package
                            </button>
                          )}
                        </div>
                        
                        {order.tracking_number ? (
                          <div className="tracking-number-display">
                            <span className="tracking-label">Tracking Number:</span>
                            <span className="tracking-number">{order.tracking_number}</span>
                            <button 
                              className="copy-tracking-btn"
                              onClick={() => {
                                navigator.clipboard.writeText(order.tracking_number)
                                alert('Tracking number copied to clipboard!')
                              }}
                              title="Copy tracking number"
                            >
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3C7.44772 3 7 3.44772 7 4C7 4.55228 7.44772 5 8 5H12C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3H8Z" fill="currentColor"/>
                                <path d="M6 4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2H6V4Z" fill="currentColor"/>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="tracking-number-display no-tracking">
                            <span className="tracking-label">Tracking Number:</span>
                            <span className="tracking-number">Not available yet</span>
                            <span className="tracking-note">Tracking number will be assigned once your order is shipped</span>
                          </div>
                        )}

                        {order.estimated_delivery && (
                          <div className="estimated-delivery">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 2H5C3.89543 2 3 2.89543 3 4V16C3 17.1046 3.89543 18 5 18H15C16.1046 18 17 17.1046 17 16V4C17 2.89543 16.1046 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M13 1V4M7 1V4M3 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="delivery-info">
                              <span className="delivery-label">Estimated Delivery:</span>
                              <span className="delivery-date">{formatDeliveryDate(order.estimated_delivery)}</span>
                            </div>
                          </div>
                        )}

                        {/* Delivery Timeline */}
                        <div className="delivery-timeline">
                          {getTimelineSteps(order).map((step, index) => (
                            <div key={step.key} className={`timeline-step ${step.completed ? 'completed' : ''} ${index === getTimelineSteps(order).length - 1 ? 'last' : ''}`}>
                              <div className="timeline-marker">
                                {step.completed ? (
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="8" fill="#4CAF50"/>
                                    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                ) : (
                                  <div className="timeline-marker-pending"></div>
                                )}
                              </div>
                              <div className="timeline-content">
                                <div className="timeline-label">{step.label}</div>
                                {step.date && (
                                  <div className="timeline-date">{formatDate(step.date)}</div>
                                )}
                              </div>
                              {index < getTimelineSteps(order).length - 1 && (
                                <div className={`timeline-line ${step.completed ? 'completed' : ''}`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="order-details-section">
                        <h4 className="order-details-title">Order Items</h4>
                        <div className="order-items-list">
                          {(order.items || order.order_items || []).map((item, index) => (
                            <div key={index} className="order-item">
                              <div className="order-item-image">
                                {item.product?.image_url || item.image_url ? (
                                  <img 
                                    src={item.product?.image_url || item.image_url} 
                                    alt={item.product?.name || item.name || 'Product'} 
                                  />
                                ) : (
                                  <div className="order-item-placeholder">
                                    <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="order-item-info">
                                <h5 className="order-item-name">{item.product?.name || item.name || 'Product'}</h5>
                                <p className="order-item-meta">
                                  Quantity: {item.quantity || 1} × ₦{Number(item.price || item.product?.price || 0).toFixed(2)}
                                </p>
                              </div>
                              <div className="order-item-total">
                                ₦{Number((item.quantity || 1) * (item.price || item.product?.price || 0)).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="order-details-grid">
                        <div className="order-details-section">
                          <h4 className="order-details-title">Shipping Address</h4>
                          <div className="order-address">
                            {order.shipping_address ? (
                              <>
                                <p><strong>{order.shipping_address.full_name || order.shipping_address.name}</strong></p>
                                <p>{order.shipping_address.street || order.shipping_address.address}</p>
                                <p>
                                  {order.shipping_address.city}, {order.shipping_address.state}
                                  {order.shipping_address.country && `, ${order.shipping_address.country}`}
                                </p>
                                <p>Phone: {order.shipping_address.phone}</p>
                              </>
                            ) : (
                              <p>No shipping address available</p>
                            )}
                          </div>
                        </div>

                        <div className="order-details-section">
                          <h4 className="order-details-title">Payment Information</h4>
                          <div className="order-payment-info">
                            <p><strong>Payment Method:</strong> {order.payment_method || 'N/A'}</p>
                            <p><strong>Payment Status:</strong> {order.payment_status || order.status || 'N/A'}</p>
                            {order.reference && (
                              <p><strong>Reference:</strong> {order.reference}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="order-summary">
                        <div className="order-summary-row">
                          <span>Subtotal:</span>
                          <span>₦{Number(order.subtotal || order.subtotal_amount || 0).toFixed(2)}</span>
                        </div>
                        {order.shipping_amount > 0 && (
                          <div className="order-summary-row">
                            <span>Shipping:</span>
                            <span>₦{Number(order.shipping_amount || 0).toFixed(2)}</span>
                          </div>
                        )}
                        {order.tax_amount > 0 && (
                          <div className="order-summary-row">
                            <span>Tax:</span>
                            <span>₦{Number(order.tax_amount || 0).toFixed(2)}</span>
                          </div>
                        )}
                        {order.discount_amount > 0 && (
                          <div className="order-summary-row discount">
                            <span>Discount:</span>
                            <span>-₦{Number(order.discount_amount || 0).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="order-summary-row total">
                          <span>Total:</span>
                          <span>₦{Number(order.total_amount || order.total || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default OrdersPage
