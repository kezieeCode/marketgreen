import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { API_CONFIG } from '../../config/api.js'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/login`, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Store auth token - admin API returns session.access_token
        if (data.session?.access_token) {
          localStorage.setItem('admin_token', data.session.access_token)
          // Also store refresh token if available
          if (data.session.refresh_token) {
            localStorage.setItem('admin_refresh_token', data.session.refresh_token)
          }
        } else if (data.token) {
          localStorage.setItem('admin_token', data.token)
        } else if (data.access_token) {
          localStorage.setItem('admin_token', data.access_token)
        }
        // Store user info
        if (data.user) {
          localStorage.setItem('admin_user', JSON.stringify(data.user))
        } else if (data.admin) {
          localStorage.setItem('admin_user', JSON.stringify(data.admin))
        }
        onLogin(true)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Login failed' }))
        setErrors({ submit: errorData.error || errorData.message || 'Invalid email or password' })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ submit: error.message || 'Login failed. Please check your connection and try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background Image Section */}
      <div className="login-background">
        <div className="login-background-overlay"></div>
        {/* Decorative Elements - moved outside content to position relative to background */}
        <div className="login-decorative-items">
          <div className="decorative-item item-1">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&q=90&auto=format" 
              alt="Fresh Vegetables"
              className="decorative-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop&q=90&auto=format'
              }}
            />
          </div>
          <div className="decorative-item item-2">
            <img 
              src="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&q=90&auto=format" 
              alt="Fresh Fruits"
              className="decorative-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1610348725531-843dff563e2d?w=400&h=400&fit=crop&q=90&auto=format'
              }}
            />
          </div>
          <div className="decorative-item item-3">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=90&auto=format" 
              alt="Organic Produce"
              className="decorative-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop&q=90&auto=format'
              }}
            />
          </div>
        </div>
        <div className="login-background-content">
          <div className="login-branding">
            <img src={logo} alt="MarketGreen Logo" className="login-logo" />
            <h1 className="login-brand-title">
              <span className="login-brand-market">Market</span>
              <span className="login-brand-green">Green</span>
            </h1>
            <p className="login-brand-tagline">Fresh Groceries, Delivered Fresh</p>
          </div>

          <div className="login-features">
            <div className="login-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Manage Inventory</span>
            </div>
            <div className="login-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V5A2 2 0 0 0 14 3H10A2 2 0 0 0 8 5V21L12 19L16 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Track Orders</span>
            </div>
            <div className="login-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 15.3516 17.6215 15.8519 18.1646 16.5523C18.7076 17.2528 19.0025 18.1137 19.0025 19C19.0025 19.8863 18.7076 20.7472 18.1646 21.4477C17.6215 22.1481 16.8604 22.6484 16 22.87M16 3.13C15.1396 3.35159 14.3785 3.85192 13.8354 4.55232C13.2924 5.25272 12.9975 6.11365 12.9975 7C12.9975 7.88635 13.2924 8.74728 13.8354 9.44768C14.3785 10.1481 15.1396 10.6484 16 10.87M16 3.13V10.87M16 10.87V22.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Customer Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h2 className="login-form-title">Welcome Back</h2>
            <p className="login-form-subtitle">Sign in to your admin account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="login-error-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {errors.submit}
              </div>
            )}

            <div className="login-form-group">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 6.66667L9.0755 11.0504C9.63533 11.4236 10.3647 11.4236 10.9245 11.0504L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  className={`login-input ${errors.email ? 'error' : ''}`}
                  placeholder="admin@marketgreen.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="login-field-error">{errors.email}</span>}
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.83333 9.16667V5.83333C5.83333 4.72876 6.27232 3.66894 7.05372 2.88754C7.83512 2.10614 8.89494 1.66667 9.99999 1.66667C11.105 1.66667 12.1649 2.10614 12.9463 2.88754C13.7277 3.66894 14.1667 4.72876 14.1667 5.83333V9.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 3.33333C5.83333 3.33333 2.27499 5.73333 0.833328 9.16667C2.27499 12.6 5.83333 15 10 15C14.1667 15 17.725 12.6 19.1667 9.16667C17.725 5.73333 14.1667 3.33333 10 3.33333ZM10 12.5C8.15833 12.5 6.66666 11.0083 6.66666 9.16667C6.66666 7.325 8.15833 5.83333 10 5.83333C11.8417 5.83333 13.3333 7.325 13.3333 9.16667C13.3333 11.0083 11.8417 12.5 10 12.5ZM10 7.5C9.07952 7.5 8.33333 8.24619 8.33333 9.16667C8.33333 10.0871 9.07952 10.8333 10 10.8333C10.9205 10.8333 11.6667 10.0871 11.6667 9.16667C11.6667 8.24619 10.9205 7.5 10 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 2.5L17.5 17.5M8.33333 8.33333C7.89131 8.77535 7.66666 9.37065 7.66666 10C7.66666 10.6293 7.89131 11.2246 8.33333 11.6667M8.33333 8.33333L11.6667 11.6667M8.33333 8.33333L5.83333 5.83333M11.6667 11.6667C12.1087 11.2246 12.3333 10.6293 12.3333 10C12.3333 9.37065 12.1087 8.77535 11.6667 8.33333M11.6667 11.6667L14.1667 14.1667M5.83333 5.83333C4.27499 6.99167 3.10833 8.49167 2.5 10C3.94166 13.4333 7.5 15.8333 12.5 15.8333C13.6083 15.8333 14.6583 15.6667 15.625 15.375M5.83333 5.83333L2.5 2.5M14.1667 14.1667C15.725 13.0083 16.8917 11.5083 17.5 10C16.0583 6.56667 12.5 4.16667 7.5 4.16667C6.39166 4.16667 5.34166 4.33333 4.375 4.625M14.1667 14.1667L17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="login-field-error">{errors.password}</span>}
            </div>

            <div className="login-form-options">
              <label className="login-checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="login-forgot-link">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="login-spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.16667 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              Protected by enterprise-grade security
            </p>
            <div className="login-footer-badges">
              <span className="login-badge">SSL Secured</span>
              <span className="login-badge">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
