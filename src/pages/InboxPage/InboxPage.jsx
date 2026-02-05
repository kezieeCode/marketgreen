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
import './InboxPage.css'

function InboxPage() {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()
  const { setNavigating } = useNavigation()
  const { token, isAuthenticated } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    fetchMessages()
  }, [token, isAuthenticated, navigate])

  const fetchMessages = async () => {
    setIsLoading(true)
    setError(null)
    
    // Disabled API calls - using mock data directly for now
    // TODO: Enable when backend API is ready
    setTimeout(() => {
      setMessages(getMockMessages())
      setIsLoading(false)
    }, 500) // Small delay to simulate loading
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const response = await fetch(API_ENDPOINTS.INBOX.LIST, {
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
        if (response.status === 404) {
          setMessages(getMockMessages())
          setIsLoading(false)
          return
        }
        throw new Error('Failed to fetch messages')
      }

      const data = await response.json()
      const messagesList = Array.isArray(data) ? data : (data.messages || [])
      setMessages(messagesList)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setMessages(getMockMessages())
    } finally {
      setIsLoading(false)
    }
    */
  }

  // Mock messages for demo purposes
  const getMockMessages = () => {
    return [
      {
        id: 1,
        subject: 'Welcome to MarketGreen!',
        sender: 'MarketGreen Team',
        sender_email: 'noreply@marketgreen.com',
        preview: 'Thank you for joining MarketGreen! We\'re excited to have you as part of our community. Explore our fresh produce and enjoy fast delivery...',
        body: 'Thank you for joining MarketGreen! We\'re excited to have you as part of our community. Explore our fresh produce and enjoy fast delivery to your doorstep. Get started by browsing our featured products and don\'t forget to check out our special offers!',
        is_read: false,
        is_important: true,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: 'notification'
      },
      {
        id: 2,
        subject: 'Your Order #12345 Has Been Shipped',
        sender: 'MarketGreen Orders',
        sender_email: 'orders@marketgreen.com',
        preview: 'Great news! Your order has been shipped and is on its way to you. Track your delivery in real-time...',
        body: 'Great news! Your order #12345 has been shipped and is on its way to you. You can track your delivery in real-time using the tracking number: TRK-789456123. Expected delivery date: Tomorrow by 5 PM. Thank you for shopping with MarketGreen!',
        is_read: false,
        is_important: true,
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        type: 'order'
      },
      {
        id: 3,
        subject: 'Special Offer: 25% Off Fresh Fruits',
        sender: 'MarketGreen Promotions',
        sender_email: 'promotions@marketgreen.com',
        preview: 'Don\'t miss out on our weekend special! Get 25% off on all fresh fruits. Use code FRESH25 at checkout...',
        body: 'Don\'t miss out on our weekend special! Get 25% off on all fresh fruits. Use code FRESH25 at checkout. This offer is valid until Sunday midnight. Stock up on your favorite fruits and enjoy the savings!',
        is_read: true,
        is_important: false,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: 'promotion'
      },
      {
        id: 4,
        subject: 'Order Confirmation #12344',
        sender: 'MarketGreen Orders',
        sender_email: 'orders@marketgreen.com',
        preview: 'Thank you for your order! We\'ve received your order and it\'s being processed. You\'ll receive another email when it ships...',
        body: 'Thank you for your order! We\'ve received your order #12344 and it\'s being processed. You\'ll receive another email when it ships. Order total: ₦15,450.00. Estimated delivery: 2-3 business days.',
        is_read: true,
        is_important: false,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'order'
      },
      {
        id: 5,
        subject: 'Your Account Security Alert',
        sender: 'MarketGreen Security',
        sender_email: 'security@marketgreen.com',
        preview: 'We noticed a new login to your account. If this was you, no action is needed. If not, please secure your account immediately...',
        body: 'We noticed a new login to your account from a new device. If this was you, no action is needed. If you don\'t recognize this activity, please secure your account immediately by changing your password.',
        is_read: false,
        is_important: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'security'
      },
      {
        id: 6,
        subject: 'New Product Alert: Organic Vegetables',
        sender: 'MarketGreen Products',
        sender_email: 'products@marketgreen.com',
        preview: 'Check out our new range of organic vegetables! Fresh from local farms, now available in our store...',
        body: 'Check out our new range of organic vegetables! Fresh from local farms, now available in our store. From crisp lettuce to juicy tomatoes, we\'ve got everything you need for a healthy meal.',
        is_read: true,
        is_important: false,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'product'
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins} min ago`
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'order':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'promotion':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
          </svg>
        )
      case 'security':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L3 4V9C3 13.55 6.36 17.74 10 19C13.64 17.74 17 13.55 17 9V4L10 1ZM10 10.99H17C16.47 14.11 14.24 16.78 11 17.93V11H4V5.3L10 2.19V10.99Z" fill="currentColor"/>
          </svg>
        )
      case 'product':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V17C18 17.6 17.6 18 17 18H3C2.4 18 2 17.6 2 17V3ZM3 3V4.5L10 9.5L17 4.5V3H3ZM17 5.5L10 10.5L3 5.5V17H17V5.5Z" fill="currentColor"/>
          </svg>
        )
    }
  }

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'order':
        return '#2196F3'
      case 'promotion':
        return '#FF9800'
      case 'security':
        return '#f44336'
      case 'product':
        return '#4CAF50'
      default:
        return '#666'
    }
  }

  const markAsRead = async (messageId) => {
    // Disabled API calls - just update local state for now
    // TODO: Enable when backend API is ready
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, is_read: true } : msg
    ))
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const response = await fetch(API_ENDPOINTS.INBOX.MARK_READ(messageId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        ))
      }
    } catch (err) {
      console.error('Error marking message as read:', err)
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ))
    }
    */
  }

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (!message.is_read) {
      markAsRead(message.id)
    }
  }

  const filteredMessages = messages.filter(message => {
    // Filter by type
    if (filterType === 'unread' && message.is_read) return false
    if (filterType === 'read' && !message.is_read) return false
    if (filterType === 'important' && !message.is_important) return false
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        message.subject?.toLowerCase().includes(query) ||
        message.sender?.toLowerCase().includes(query) ||
        message.preview?.toLowerCase().includes(query) ||
        message.body?.toLowerCase().includes(query)
      )
    }
    
    return true
  })

  const unreadCount = messages.filter(m => !m.is_read).length
  const importantCount = messages.filter(m => m.is_important).length

  return (
    <div className="App inbox-page">
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

      {/* Inbox Hero */}
      <section className="inbox-hero" style={{ '--inbox-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="inbox-hero-overlay">
          <div className="inbox-hero-container">
            <div className="inbox-hero-content">
              <p className="inbox-hero-subtitle">Stay updated with all your notifications and messages</p>
              <h1 className="inbox-hero-title">Inbox</h1>
              {unreadCount > 0 && (
                <div className="inbox-unread-badge">
                  {unreadCount} unread message{unreadCount > 1 ? 's' : ''}
                </div>
              )}
            </div>
            <div className="inbox-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>Inbox</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inbox Content */}
      <section className="inbox-content">
        <div className="inbox-content-container">
          {/* Search and Filters */}
          <div className="inbox-controls">
            <div className="inbox-search">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="inbox-search-input"
              />
            </div>
            <div className="inbox-filter-tabs">
              <button
                className={`inbox-filter-tab ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All ({messages.length})
              </button>
              <button
                className={`inbox-filter-tab ${filterType === 'unread' ? 'active' : ''}`}
                onClick={() => setFilterType('unread')}
              >
                Unread ({unreadCount})
              </button>
              <button
                className={`inbox-filter-tab ${filterType === 'read' ? 'active' : ''}`}
                onClick={() => setFilterType('read')}
              >
                Read ({messages.length - unreadCount})
              </button>
              <button
                className={`inbox-filter-tab ${filterType === 'important' ? 'active' : ''}`}
                onClick={() => setFilterType('important')}
              >
                Important ({importantCount})
              </button>
            </div>
          </div>

          {/* Messages List */}
          {isLoading ? (
            <div className="inbox-loading">
              <div className="inbox-loading-spinner"></div>
              <p>Loading your messages...</p>
            </div>
          ) : error ? (
            <div className="inbox-error">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f44336"/>
              </svg>
              <h3>Error Loading Messages</h3>
              <p>{error}</p>
              <button className="inbox-retry-btn" onClick={fetchMessages}>Try Again</button>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="inbox-empty">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C2 2.4 2.4 2 3 2H21C21.6 2 22 2.4 22 3V21C22 21.6 21.6 22 21 22H3C2.4 22 2 21.6 2 21V3ZM3 3V4.5L12 11.5L21 4.5V3H3ZM21 5.5L12 12.5L3 5.5V21H21V5.5Z" fill="#ccc"/>
              </svg>
              <h3>No Messages Found</h3>
              <p>{searchQuery ? 'No messages match your search.' : 'Your inbox is empty. You\'ll see notifications here when you receive messages.'}</p>
            </div>
          ) : (
            <div className="inbox-messages">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message-card ${!message.is_read ? 'unread' : ''} ${message.is_important ? 'important' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="message-card-header">
                    <div className="message-header-left">
                      <div
                        className="message-type-icon"
                        style={{ color: getMessageTypeColor(message.type) }}
                      >
                        {getMessageTypeIcon(message.type)}
                      </div>
                      <div className="message-info">
                        <div className="message-sender-row">
                          <h3 className="message-sender">{message.sender || 'MarketGreen'}</h3>
                          {message.is_important && (
                            <span className="message-important-badge">Important</span>
                          )}
                          {!message.is_read && (
                            <span className="message-unread-dot"></span>
                          )}
                        </div>
                        <p className="message-subject">{message.subject || 'No Subject'}</p>
                        <p className="message-preview">{message.preview || message.body?.substring(0, 100) || 'No preview available'}...</p>
                      </div>
                    </div>
                    <div className="message-header-right">
                      <span className="message-date">{formatDate(message.created_at || message.date)}</span>
                    </div>
                  </div>
                  
                  {selectedMessage?.id === message.id && (
                    <div className="message-card-body">
                      <div className="message-body-content">
                        <div className="message-body-header">
                          <div>
                            <p className="message-body-sender"><strong>From:</strong> {message.sender} &lt;{message.sender_email || 'noreply@marketgreen.com'}&gt;</p>
                            <p className="message-body-date"><strong>Date:</strong> {formatDate(message.created_at || message.date)}</p>
                          </div>
                        </div>
                        <div className="message-body-text">
                          {message.body || message.preview || 'No content available.'}
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

export default InboxPage
