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
  const { token, isAuthenticated, isLoading: authLoading } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Wait for auth to finish loading before checking authentication
    if (authLoading) {
      return
    }
    
    // Check if user is authenticated
    if (!token || !isAuthenticated()) {
      navigate('/signup')
      return
    }
    
    // Only fetch messages if authenticated
    fetchMessages()
  }, [token, isAuthenticated, navigate, authLoading])

  const fetchMessages = async () => {
    if (!token) {
      setIsLoading(false)
      setMessages([])
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      // Fetch all notifications (API filter only supports 'unread', so we fetch all and filter client-side)
      const url = API_ENDPOINTS.NOTIFICATIONS.LIST('all')
      
      console.log('📬 Fetching notifications from:', url)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      console.log('📡 Notifications API Response Status:', response.status, response.statusText)

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/signup')
          return
        }
        if (response.status === 404) {
          setMessages([])
          setIsLoading(false)
          return
        }
        throw new Error('Failed to fetch notifications')
      }

      const data = await response.json()
      console.log('✅ Notifications API Response:', data)
      
      // Handle different response formats
      const notificationsList = Array.isArray(data) 
        ? data 
        : (data.notifications || data.items || data.data || [])
      
      // Normalize notification data to match UI expectations
      const normalizedMessages = notificationsList.map(notification => ({
        id: notification.id || notification.notification_id,
        subject: notification.title || notification.subject || notification.message || 'Notification',
        sender: notification.sender || 'MarketGreen',
        sender_email: notification.sender_email || notification.senderEmail || 'noreply@marketgreen.com',
        preview: notification.message || notification.description || notification.body || '',
        body: notification.body || notification.message || notification.description || '',
        is_read: notification.is_read !== undefined ? notification.is_read : (notification.isRead !== undefined ? notification.isRead : false),
        is_important: notification.is_important !== undefined ? notification.is_important : (notification.isImportant !== undefined ? notification.isImportant : false),
        created_at: notification.created_at || notification.createdAt || notification.timestamp || notification.date,
        type: notification.type || notification.category || 'notification'
      }))
      
      setMessages(normalizedMessages)
    } catch (err) {
      console.error('❌ Error fetching notifications:', err)
      setError(err.message || 'Failed to load notifications')
      setMessages([])
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
    if (!token) return

    // Optimistic update
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, is_read: true } : msg
    ))
    
    try {
      const url = API_ENDPOINTS.NOTIFICATIONS.MARK_READ(messageId)
      console.log('✅ Marking notification as read:', url)
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      console.log('📡 Mark as read Response Status:', response.status, response.statusText)

      if (!response.ok) {
        // Revert optimistic update on error
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, is_read: false } : msg
        ))
        console.error('Failed to mark notification as read:', response.status)
      }
    } catch (err) {
      console.error('❌ Error marking notification as read:', err)
      // Revert optimistic update on error
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_read: false } : msg
      ))
    }
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
            <button className="shop-now-btn" onClick={() => navigate('/shop')}>SHOP NOW</button>
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
          {authLoading || isLoading ? (
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
