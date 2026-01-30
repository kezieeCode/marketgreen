import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import CartDropdown from '../components/CartDropdown.jsx'
import UserMenuDropdown from '../components/UserMenuDropdown.jsx'
import { API_ENDPOINTS } from '../config/api.js'
import logo from '../assets/images/logo.png'
import backgroundMenuImage from '../assets/images/pictures/background-menu.png'
import './AccountPage.css'

function AccountPage() {
  const navigate = useNavigate()
  const { getCartItemCount } = useCart()
  const { token, isAuthenticated, user, fetchUserInfo } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [accountStats, setAccountStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistItems: 0,
    vouchers: 0
  })
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    dateOfBirth: '',
    gender: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    newsletter: true,
    language: 'en',
    currency: 'NGN',
    theme: 'light'
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    loadAccountData()
  }, [token, isAuthenticated, navigate])

  const loadAccountData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Fetch user info (non-blocking - won't cause infinite loading)
      if (token) {
        fetchUserInfo(token).catch(() => {
          // Silently fail - user data might already be in context
        })
      }

      // Load account stats (now uses mock data)
      await fetchAccountStats()

      // Initialize form data from user
      if (user) {
        setFormData({
          username: user.username || user.email?.split('@')[0] || '',
          email: user.email || '',
          phone: user.phone || '',
          firstName: user.first_name || user.firstName || '',
          lastName: user.last_name || user.lastName || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          country: user.country || 'Nigeria',
          zipCode: user.zip_code || user.zipCode || '',
          dateOfBirth: user.date_of_birth || user.dateOfBirth || '',
          gender: user.gender || ''
        })
      } else {
        // Initialize with empty/default values if no user data
        setFormData({
          username: '',
          email: '',
          phone: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          country: 'Nigeria',
          zipCode: '',
          dateOfBirth: '',
          gender: ''
        })
      }
    } catch (err) {
      console.error('Error loading account data:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAccountStats = async () => {
    // Disabled API calls - using mock stats for now
    // TODO: Enable when backend APIs are ready
    setAccountStats({
      totalOrders: 12,
      totalSpent: 45600,
      wishlistItems: 8,
      vouchers: 4
    })
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const [ordersRes, wishlistRes, vouchersRes] = await Promise.allSettled([
        fetch(API_ENDPOINTS.ORDERS.LIST, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(API_ENDPOINTS.WISHLIST.LIST, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(API_ENDPOINTS.VOUCHERS.LIST, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      let totalOrders = 0
      let totalSpent = 0
      let wishlistItems = 0
      let vouchers = 0

      if (ordersRes.status === 'fulfilled' && ordersRes.value.ok) {
        const ordersData = await ordersRes.value.json()
        const orders = Array.isArray(ordersData) ? ordersData : (ordersData.orders || [])
        totalOrders = orders.length
        totalSpent = orders.reduce((sum, order) => sum + (Number(order.total_amount || order.total || 0)), 0)
      }

      if (wishlistRes.status === 'fulfilled' && wishlistRes.value.ok) {
        const wishlistData = await wishlistRes.value.json()
        const items = Array.isArray(wishlistData) ? wishlistData : (wishlistData.items || wishlistData.wishlist || [])
        wishlistItems = items.length
      }

      if (vouchersRes.status === 'fulfilled' && vouchersRes.value.ok) {
        const vouchersData = await vouchersRes.value.json()
        const vouchersList = Array.isArray(vouchersData) ? vouchersData : (vouchersData.vouchers || [])
        vouchers = vouchersList.filter(v => v.status === 'available' && !v.is_used).length
      }

      setAccountStats({ totalOrders, totalSpent, wishlistItems, vouchers })
    } catch (err) {
      console.error('Error fetching stats:', err)
      // Use default stats if API fails
      setAccountStats({
        totalOrders: 12,
        totalSpent: 45600,
        wishlistItems: 8,
        vouchers: 4
      })
    }
    */
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    
    // Disabled API calls - just update local state for now
    // TODO: Enable when backend API is ready
    setIsEditing(false)
    alert('Profile updated successfully! (Demo mode - changes not saved to server)')
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const response = await fetch(API_ENDPOINTS.ACCOUNT.UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        await fetchUserInfo(token)
        setIsEditing(false)
        alert('Profile updated successfully!')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update profile')
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      alert('Failed to update profile. Please try again.')
    }
    */
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    // Disabled API calls - just clear form for now
    // TODO: Enable when backend API is ready
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    alert('Password changed successfully! (Demo mode - changes not saved to server)')
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const response = await fetch(API_ENDPOINTS.ACCOUNT.CHANGE_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      })

      if (response.ok) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        alert('Password changed successfully!')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to change password')
      }
    } catch (err) {
      console.error('Error changing password:', err)
      alert('Failed to change password. Please try again.')
    }
    */
  }

  const handleUpdatePreferences = async () => {
    // Disabled API calls - just show success message for now
    // TODO: Enable when backend API is ready
    alert('Preferences updated successfully! (Demo mode - changes not saved to server)')
    
    /* API calls disabled - uncomment when backend is ready
    try {
      const response = await fetch(API_ENDPOINTS.ACCOUNT.PREFERENCES, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      })

      if (response.ok) {
        alert('Preferences updated successfully!')
      } else {
        alert('Failed to update preferences')
      }
    } catch (err) {
      console.error('Error updating preferences:', err)
      alert('Failed to update preferences. Please try again.')
    }
    */
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

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`
    }
    return user?.username || user?.email?.split('@')[0] || 'User'
  }

  const statsCards = [
    {
      icon: '📦',
      label: 'Total Orders',
      value: accountStats.totalOrders,
      color: '#2196F3',
      link: '/orders'
    },
    {
      icon: '💰',
      label: 'Total Spent',
      value: `₦${accountStats.totalSpent.toLocaleString()}`,
      color: '#4CAF50',
      link: '/orders'
    },
    {
      icon: '💝',
      label: 'Wishlist Items',
      value: accountStats.wishlistItems,
      color: '#E91E63',
      link: '/wishlist'
    },
    {
      icon: '🎫',
      label: 'Active Vouchers',
      value: accountStats.vouchers,
      color: '#FF9800',
      link: '/voucher'
    }
  ]

  return (
    <div className="App account-page">
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

      {/* Account Hero */}
      <section className="account-hero" style={{ '--account-bg-image': `url(${backgroundMenuImage})` }}>
        <div className="account-hero-overlay">
          <div className="account-hero-container">
            <div className="account-hero-content">
              <div className="account-profile-header">
                <div className="account-avatar">
                  <div className="account-avatar-circle">
                    {getInitials()}
                  </div>
                  <div className="account-avatar-badge">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#4CAF50"/>
                    </svg>
                  </div>
                </div>
                <div className="account-profile-info">
                  <h1 className="account-profile-name">{getDisplayName()}</h1>
                  <p className="account-profile-email">{user?.email || ''}</p>
                  <div className="account-profile-meta">
                    <span className="account-meta-item">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9.5 5H10.5V10.5H9.5V5ZM9.5 11.5H10.5V12.5H9.5V11.5Z" fill="currentColor"/>
                      </svg>
                      Member since {user?.created_at ? new Date(user.created_at).getFullYear() : '2024'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-breadcrumbs">
              <a href="#" onClick={handleNavigateHome}>Home</a>
              <span className="breadcrumb-separator">›</span>
              <span>My Account</span>
            </div>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="account-content">
        <div className="account-content-container">
          {/* Stats Cards */}
          <div className="account-stats-grid">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="account-stat-card"
                style={{ '--stat-color': stat.color }}
                onClick={() => stat.link && navigate(stat.link)}
              >
                <div className="account-stat-icon">{stat.icon}</div>
                <div className="account-stat-content">
                  <div className="account-stat-value">{stat.value}</div>
                  <div className="account-stat-label">{stat.label}</div>
                </div>
                {stat.link && (
                  <div className="account-stat-arrow">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="account-tabs">
            <button
              className={`account-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
              </svg>
              Profile
            </button>
            <button
              className={`account-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1L3 4V9C3 13.55 6.36 17.74 10 19C13.64 17.74 17 13.55 17 9V4L10 1ZM10 10.99H17C16.47 14.11 14.24 16.78 11 17.93V11H4V5.3L10 2.19V10.99Z" fill="currentColor"/>
              </svg>
              Security
            </button>
            <button
              className={`account-tab ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9.5 5H10.5V10.5H9.5V5ZM9.5 11.5H10.5V12.5H9.5V11.5Z" fill="currentColor"/>
              </svg>
              Preferences
            </button>
            <button
              className={`account-tab ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9 5V11L14.5 13.5L15.5 12L11 10V5H9Z" fill="currentColor"/>
              </svg>
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="account-tab-content">
            {isLoading ? (
              <div className="account-loading">
                <div className="account-loading-spinner"></div>
                <p>Loading account information...</p>
              </div>
            ) : error ? (
              <div className="account-error">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f44336"/>
                </svg>
                <h3>Error Loading Account</h3>
                <p>{error}</p>
                <button className="account-retry-btn" onClick={loadAccountData}>Try Again</button>
              </div>
            ) : (
              <>
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="account-section">
                    <div className="account-section-header">
                      <h2 className="account-section-title">Personal Information</h2>
                      {!isEditing && (
                        <button className="account-edit-btn" onClick={() => setIsEditing(true)}>
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 2.5L17.5 5.5L10 13H7V10L14.5 2.5ZM14.5 0.5C14.2 0.5 13.9 0.6 13.7 0.8L5 9.5V14H9.5L18.2 5.3C18.6 4.9 18.6 4.3 18.2 3.9L16.1 1.8C15.9 1.6 15.6 1.5 15.3 1.5H14.5V0.5ZM2 4H8V6H2V4ZM2 8H8V10H2V8ZM2 12H6V14H2V12Z" fill="currentColor"/>
                          </svg>
                          Edit Profile
                        </button>
                      )}
                    </div>
                    <form className="account-form" onSubmit={handleUpdateProfile}>
                      <div className="account-form-grid">
                        <div className="account-form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Date of Birth</label>
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({...formData, gender: e.target.value})}
                            disabled={!isEditing}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                        <div className="account-form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>State</label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="account-form-group">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      {isEditing && (
                        <div className="account-form-actions">
                          <button type="submit" className="account-save-btn">Save Changes</button>
                          <button type="button" className="account-cancel-btn" onClick={() => {
                            setIsEditing(false)
                            loadAccountData()
                          }}>Cancel</button>
                        </div>
                      )}
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="account-section">
                    <div className="account-section-header">
                      <h2 className="account-section-title">Security Settings</h2>
                    </div>
                    <form className="account-form" onSubmit={handleChangePassword}>
                      <div className="account-form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div className="account-form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div className="account-form-group">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <div className="account-form-actions">
                        <button type="submit" className="account-save-btn">Change Password</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="account-section">
                    <div className="account-section-header">
                      <h2 className="account-section-title">Preferences</h2>
                      <button className="account-save-btn" onClick={handleUpdatePreferences}>Save Preferences</button>
                    </div>
                    <div className="account-preferences">
                      <div className="account-preference-group">
                        <h3 className="account-preference-group-title">Notifications</h3>
                        <div className="account-preference-list">
                          <label className="account-preference-item">
                            <input
                              type="checkbox"
                              checked={preferences.emailNotifications}
                              onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                            />
                            <span>Email Notifications</span>
                          </label>
                          <label className="account-preference-item">
                            <input
                              type="checkbox"
                              checked={preferences.smsNotifications}
                              onChange={(e) => setPreferences({...preferences, smsNotifications: e.target.checked})}
                            />
                            <span>SMS Notifications</span>
                          </label>
                          <label className="account-preference-item">
                            <input
                              type="checkbox"
                              checked={preferences.marketingEmails}
                              onChange={(e) => setPreferences({...preferences, marketingEmails: e.target.checked})}
                            />
                            <span>Marketing Emails</span>
                          </label>
                          <label className="account-preference-item">
                            <input
                              type="checkbox"
                              checked={preferences.orderUpdates}
                              onChange={(e) => setPreferences({...preferences, orderUpdates: e.target.checked})}
                            />
                            <span>Order Updates</span>
                          </label>
                          <label className="account-preference-item">
                            <input
                              type="checkbox"
                              checked={preferences.newsletter}
                              onChange={(e) => setPreferences({...preferences, newsletter: e.target.checked})}
                            />
                            <span>Newsletter</span>
                          </label>
                        </div>
                      </div>
                      <div className="account-preference-group">
                        <h3 className="account-preference-group-title">General</h3>
                        <div className="account-form-group">
                          <label>Language</label>
                          <select
                            value={preferences.language}
                            onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                          >
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                          </select>
                        </div>
                        <div className="account-form-group">
                          <label>Currency</label>
                          <select
                            value={preferences.currency}
                            onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                          >
                            <option value="NGN">NGN (₦)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                        <div className="account-form-group">
                          <label>Theme</label>
                          <select
                            value={preferences.theme}
                            onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="account-section">
                    <div className="account-section-header">
                      <h2 className="account-section-title">Recent Activity</h2>
                    </div>
                    <div className="account-activity-list">
                      <div className="account-activity-item">
                        <div className="account-activity-icon">📦</div>
                        <div className="account-activity-content">
                          <h4>Order Placed</h4>
                          <p>You placed order #12345</p>
                          <span className="account-activity-date">2 hours ago</span>
                        </div>
                      </div>
                      <div className="account-activity-item">
                        <div className="account-activity-icon">💝</div>
                        <div className="account-activity-content">
                          <h4>Added to Wishlist</h4>
                          <p>Fresh Fruits Combo added to your wishlist</p>
                          <span className="account-activity-date">1 day ago</span>
                        </div>
                      </div>
                      <div className="account-activity-item">
                        <div className="account-activity-icon">🎫</div>
                        <div className="account-activity-content">
                          <h4>Voucher Redeemed</h4>
                          <p>You redeemed voucher code WELCOME25</p>
                          <span className="account-activity-date">3 days ago</span>
                        </div>
                      </div>
                      <div className="account-activity-item">
                        <div className="account-activity-icon">👤</div>
                        <div className="account-activity-content">
                          <h4>Profile Updated</h4>
                          <p>You updated your profile information</p>
                          <span className="account-activity-date">1 week ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccountPage
