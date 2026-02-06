import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import CartDropdown from '../../components/CartDropdown.jsx'
import UserMenuDropdown from '../../components/UserMenuDropdown.jsx'
import { API_ENDPOINTS } from '../../config/api.js'
import logo from '../../assets/images/logo.png'
import backgroundMenuImage from '../../assets/images/pictures/background-menu.png'
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
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [toast, setToast] = useState(null)
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

  const [activityItems, setActivityItems] = useState([])
  const [isLoadingActivity, setIsLoadingActivity] = useState(false)

  // Use refs to prevent infinite loops
  const hasLoadedRef = useRef(false)
  const isLoadingRef = useRef(false)

  const loadAccountData = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (isLoadingRef.current) return
    isLoadingRef.current = true

    setIsLoading(true)
    setError(null)
    try {
      // Only fetch user info once on initial load, not on every render
      if (token && !hasLoadedRef.current) {
        fetchUserInfo(token).catch(() => {
          // Silently fail - user data might already be in context
        })
      }

      // Load account stats (now uses mock data)
      await fetchAccountStats()

      // Initialize form data from user (only if not already set or user changed)
      if (user) {
        const newFormData = {
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
        }
        
        // Only update if data actually changed (prevent unnecessary re-renders)
        setFormData(prev => {
          const hasChanged = Object.keys(newFormData).some(
            key => prev[key] !== newFormData[key]
          )
          return hasChanged ? newFormData : prev
        })
      } else if (!hasLoadedRef.current) {
        // Initialize with empty/default values only on first load
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
      
      hasLoadedRef.current = true
    } catch (err) {
      console.error('Error loading account data:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
      isLoadingRef.current = false
    }
  }, [token, user, fetchUserInfo])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signup')
      return
    }
    
    // Only load data once when component mounts or token changes
    if (token && !hasLoadedRef.current) {
      loadAccountData()
    }
  }, [token]) // Only depend on token, not isAuthenticated or navigate

  const fetchAccountStats = async () => {
    if (!token) {
      // Use default stats if not authenticated
      setAccountStats({
        totalOrders: 0,
        totalSpent: 0,
        wishlistItems: 0,
        vouchers: 0
      })
      return
    }

    try {
      // Fetch total spent from API
      let totalSpent = 0
      try {
        const totalSpentResponse = await fetch(API_ENDPOINTS.ACCOUNT.TOTAL_SPENT, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (totalSpentResponse.ok) {
          const totalSpentData = await totalSpentResponse.json()
          // Handle different possible response formats
          totalSpent = Number(totalSpentData.totalSpent || totalSpentData.total_spent || totalSpentData.amount || 0)
        } else {
          console.warn('Failed to fetch total spent:', totalSpentResponse.status)
        }
      } catch (totalSpentError) {
        console.error('Error fetching total spent:', totalSpentError)
      }

      // Fetch voucher count from API
      let vouchers = 0
      try {
        const vouchersCountResponse = await fetch(API_ENDPOINTS.COUPONS.COUNT, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (vouchersCountResponse.ok) {
          const vouchersCountData = await vouchersCountResponse.json()
          // Handle different possible response formats
          vouchers = Number(vouchersCountData.count || vouchersCountData.total || vouchersCountData.vouchers || 0)
        } else {
          console.warn('Failed to fetch voucher count:', vouchersCountResponse.status)
        }
      } catch (vouchersCountError) {
        console.error('Error fetching voucher count:', vouchersCountError)
      }

      // Fetch other stats (orders, wishlist)
      const [ordersRes, wishlistRes] = await Promise.allSettled([
        fetch(API_ENDPOINTS.ORDERS.LIST, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(API_ENDPOINTS.WISHLIST.LIST, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])

      let totalOrders = 0
      let wishlistItems = 0

      if (ordersRes.status === 'fulfilled' && ordersRes.value.ok) {
        const ordersData = await ordersRes.value.json()
        const orders = Array.isArray(ordersData) ? ordersData : (ordersData.orders || [])
        totalOrders = orders.length
      }

      if (wishlistRes.status === 'fulfilled' && wishlistRes.value.ok) {
        const wishlistData = await wishlistRes.value.json()
        const items = Array.isArray(wishlistData) ? wishlistData : (wishlistData.items || wishlistData.wishlist || [])
        wishlistItems = items.length
      }

      setAccountStats({ totalOrders, totalSpent, wishlistItems, vouchers })
    } catch (err) {
      console.error('Error fetching stats:', err)
      // Use default stats if API fails
      setAccountStats({
        totalOrders: 0,
        totalSpent: 0,
        wishlistItems: 0,
        vouchers: 0
      })
    }
  }

  const fetchActivity = async () => {
    if (!token) {
      setActivityItems([])
      return
    }

    setIsLoadingActivity(true)
    try {
      const response = await fetch(API_ENDPOINTS.ACCOUNT.ACTIVITY(20), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Handle both array response and object with activities property
        const activities = Array.isArray(data) ? data : (data.activities || data.items || data.activity || [])
        setActivityItems(activities)
      } else {
        console.warn('Failed to fetch activity:', response.status)
        setActivityItems([])
      }
    } catch (error) {
      console.error('Error fetching activity:', error)
      setActivityItems([])
    } finally {
      setIsLoadingActivity(false)
    }
  }

  // Fetch activity when activity tab is selected
  useEffect(() => {
    if (activeTab === 'activity' && token) {
      fetchActivity()
    }
  }, [activeTab, token])

  const formatActivityDate = (dateString) => {
    if (!dateString) return 'Recently'
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7)
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
      }
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return 'Recently'
    }
  }

  const getActivityIcon = (type) => {
    const typeLower = (type || '').toLowerCase()
    if (typeLower.includes('order')) return '📦'
    if (typeLower.includes('wishlist')) return '💝'
    if (typeLower.includes('voucher') || typeLower.includes('coupon')) return '🎫'
    if (typeLower.includes('profile')) return '👤'
    if (typeLower.includes('review')) return '⭐'
    if (typeLower.includes('payment')) return '💳'
    return '📋'
  }

  const getActivityTitle = (activity) => {
    return activity.title || activity.type || activity.action || 'Activity'
  }

  const getActivityDescription = (activity) => {
    return activity.description || activity.message || activity.details || ''
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    
    if (!token) {
      showToast('Please log in to update your profile', 'error')
      return
    }

    setIsSavingProfile(true)

    try {
      // Format the request body to match the API endpoint
      const requestBody = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode
      }

      console.log('📝 Updating profile with data:', requestBody)
      console.log('🔗 API Endpoint:', API_ENDPOINTS.ACCOUNT.UPDATE)

      const response = await fetch(API_ENDPOINTS.ACCOUNT.UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })

      console.log('📡 Profile Update Response Status:', response.status, response.statusText)

      if (response.ok) {
        const updatedUser = await response.json()
        console.log('✅ Profile updated successfully:', updatedUser)
        
        // Refresh user info to get updated data
        await fetchUserInfo(token)
        
        // Update form data with the response
        if (updatedUser) {
          setFormData({
            username: updatedUser.username || formData.username,
            email: updatedUser.email || formData.email,
            phone: updatedUser.phone || formData.phone,
            firstName: updatedUser.firstName || updatedUser.first_name || formData.firstName,
            lastName: updatedUser.lastName || updatedUser.last_name || formData.lastName,
            address: updatedUser.address || formData.address,
            city: updatedUser.city || formData.city,
            state: updatedUser.state || formData.state,
            country: updatedUser.country || formData.country,
            zipCode: updatedUser.zipCode || updatedUser.zip_code || formData.zipCode,
            dateOfBirth: updatedUser.dateOfBirth || updatedUser.date_of_birth || formData.dateOfBirth,
            gender: updatedUser.gender || formData.gender
          })
        }
        
        setIsEditing(false)
        showToast('Profile updated successfully!', 'success')
      } else {
        let errorMessage = 'Failed to update profile'
        try {
          const errorData = await response.json()
          console.error('❌ Profile Update Error Response:', errorData)
          errorMessage = errorData.message || errorData.error || errorMessage
          
          if (errorData.details) {
            errorMessage = `${errorMessage}. ${errorData.details}`
          }
        } catch (parseError) {
          const errorText = await response.text()
          console.error('❌ Profile Update Error Text:', errorText)
          errorMessage = `${errorMessage}. ${errorText || 'Unknown error'}`
        }
        
        showToast(errorMessage, 'error')
      }
    } catch (err) {
      console.error('❌ Error updating profile:', err)
      showToast('Failed to update profile. Please try again.', 'error')
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    
    if (!token) {
      showToast('Please log in to change your password', 'error')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match', 'error')
      return
    }

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      showToast('Please fill in all password fields', 'error')
      return
    }

    setIsChangingPassword(true)

    try {
      const requestBody = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }

      console.log('🔐 Changing password')
      console.log('🔗 API Endpoint:', API_ENDPOINTS.ACCOUNT.CHANGE_PASSWORD)

      const response = await fetch(API_ENDPOINTS.ACCOUNT.CHANGE_PASSWORD, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      })

      console.log('📡 Change Password Response Status:', response.status, response.statusText)

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Password changed successfully:', data)
        
        // Clear form
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        showToast('Password changed successfully!', 'success')
      } else {
        let errorMessage = 'Failed to change password'
        try {
          const errorData = await response.json()
          console.error('❌ Change Password Error Response:', errorData)
          errorMessage = errorData.message || errorData.error || errorMessage
          
          if (errorData.details) {
            errorMessage = `${errorMessage}. ${errorData.details}`
          }
        } catch (parseError) {
          const errorText = await response.text()
          console.error('❌ Change Password Error Text:', errorText)
          errorMessage = `${errorMessage}. ${errorText || 'Unknown error'}`
        }
        
        showToast(errorMessage, 'error')
      }
    } catch (err) {
      console.error('❌ Error changing password:', err)
      showToast('Failed to change password. Please try again.', 'error')
    } finally {
      setIsChangingPassword(false)
    }
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
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}
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
                          <button type="submit" className="account-save-btn" disabled={isSavingProfile}>
                            {isSavingProfile ? (
                              <>
                                <span className="account-save-btn-spinner"></span>
                                Saving...
                              </>
                            ) : (
                              'Save Changes'
                            )}
                          </button>
                          <button type="button" className="account-cancel-btn" onClick={() => {
                            setIsEditing(false)
                            loadAccountData()
                          }} disabled={isSavingProfile}>Cancel</button>
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
                        <button type="submit" className="account-save-btn" disabled={isChangingPassword}>
                          {isChangingPassword ? (
                            <>
                              <span className="account-save-btn-spinner"></span>
                              Changing...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </button>
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
                    {isLoadingActivity ? (
                      <div className="account-loading">
                        <div className="account-loading-spinner"></div>
                        <p>Loading activity...</p>
                      </div>
                    ) : activityItems.length === 0 ? (
                      <div className="account-activity-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#999"/>
                        </svg>
                        <p>No recent activity</p>
                      </div>
                    ) : (
                      <div className="account-activity-list">
                        {activityItems.map((activity, index) => (
                          <div key={activity.id || activity.activity_id || index} className="account-activity-item">
                            <div className="account-activity-icon">{getActivityIcon(activity.type || activity.action)}</div>
                            <div className="account-activity-content">
                              <h4>{getActivityTitle(activity)}</h4>
                              <p>{getActivityDescription(activity)}</p>
                              <span className="account-activity-date">
                                {formatActivityDate(activity.created_at || activity.createdAt || activity.timestamp || activity.date)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
