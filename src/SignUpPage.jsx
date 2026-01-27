import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './assets/images/logo.png'
import { API_ENDPOINTS } from './config/api.js'

function SignUpPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    if (name === 'password' && passwordErrors.length > 0) {
      setPasswordErrors([])
    }
    setError('')
  }

  const handleMarketingChange = (e) => {
    setMarketingEmails(e.target.checked)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPasswordErrors([])
    setFieldErrors({})

    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:46',message:'Frontend - signup request initiated',data:{apiEndpoint:API_ENDPOINTS.AUTH.SIGNUP,hasEmail:!!formData.email,hasUsername:!!formData.username,hasPassword:!!formData.password},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    try {
      console.log('Calling signup API:', API_ENDPOINTS.AUTH.SIGNUP)
      
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          marketingEmails: marketingEmails
        })
      })

      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:68',message:'Frontend - signup response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,contentType:response.headers.get('content-type')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      // Check if response is ok before trying to parse JSON
      let data
      try {
        const responseText = await response.text()
        console.log('Raw response text:', responseText)
        console.log('Response status:', response.status)
        console.log('Response statusText:', response.statusText)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
        
        try {
          data = JSON.parse(responseText)
          console.log('Parsed response data:', data)
        } catch (parseError) {
          console.error('JSON parse error:', parseError)
          console.error('Failed to parse response text:', responseText)
          setError(`Server error: ${response.status} ${response.statusText}. Response: ${responseText.substring(0, 200)}`)
          setIsLoading(false)
          return
        }
        
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:73',message:'Frontend - signup response parsed',data:{hasError:!!data.error,hasField:!!data.field,errorMessage:data.error?.substring(0,100)||null,fullResponse:JSON.stringify(data).substring(0,500)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
      } catch (textError) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:75',message:'Frontend - response text error',data:{status:response.status,statusText:response.statusText,textError:textError.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        console.error('Error reading response:', textError)
        console.error('Response status:', response.status)
        console.error('Response statusText:', response.statusText)
        setError(`Server error: ${response.status} ${response.statusText}`)
        setIsLoading(false)
        return
      }

      if (response.ok) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:81',message:'Frontend - signup success',data:{hasSession:!!data.session,hasUser:!!data.user},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        // Store session token if available
        if (data.session?.access_token) {
          localStorage.setItem('token', data.session.access_token)
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        
        // Show success message and redirect
        alert('Account created successfully!')
        navigate('/')
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:91',message:'Frontend - signup error response',data:{status:response.status,error:data.error,field:data.field,hasRequirements:!!data.requirements,fullErrorData:JSON.stringify(data)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        console.error('Signup error response:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          field: data.field,
          requirements: data.requirements,
          fullResponse: data
        })
        // Handle validation errors
        if (data.field === 'password' && data.requirements) {
          setPasswordErrors(data.requirements)
        } else if (data.field) {
          setFieldErrors({ [data.field]: data.error })
        } else {
          setError(data.error || 'An error occurred during signup')
        }
      }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/a231184e-915a-41f4-b027-e9b8c209d3b3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'SignUpPage.jsx:100',message:'Frontend - signup network error',data:{errorMessage:error.message,errorName:error.name,isFailedFetch:error.message.includes('Failed to fetch'),isNetworkError:error.message.includes('NetworkError'),errorStack:error.stack?.substring(0,300)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error('Signup network error:', error)
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      console.error('API endpoint:', API_ENDPOINTS.AUTH.SIGNUP)
      // Show more specific error message
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.error(`Cannot connect to server at ${API_ENDPOINTS.AUTH.SIGNUP}`)
        setError(`Cannot connect to server. Make sure the backend is running at ${API_ENDPOINTS.AUTH.SIGNUP}`)
      } else {
        console.error(`Network error: ${error.message}`)
        setError(`Network error: ${error.message}. Please check your connection and try again.`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setFieldErrors({})

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store session token and refresh token
        if (data.session?.access_token) {
          localStorage.setItem('token', data.session.access_token)
          if (data.session.refresh_token) {
            localStorage.setItem('refresh_token', data.session.refresh_token)
          }
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        
        // Show success message
        console.log('Login successful:', data.message)
        
        // Redirect to home page
        navigate('/')
      } else {
        // Handle different error scenarios
        if (data.field === 'email') {
          setFieldErrors({ email: data.error })
        } else if (data.field === 'credentials') {
          setError(data.error || 'Invalid email or password')
        } else if (response.status === 403) {
          // Email not confirmed
          setError(data.error || 'Please verify your email before logging in')
        } else if (response.status === 429) {
          // Too many requests
          setError(data.error || 'Too many login attempts. Please try again later')
        } else {
          setError(data.error || 'An error occurred during login')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e)
    } else {
      handleSignup(e)
    }
  }

  return (
    <div className="App signup-page">
      <div className="signup-container">
        {/* Left Column - Sign Up Form */}
        <div className="signup-form-column">
          <div className="signup-form-overlay"></div>
          <div className="signup-form-wrapper">
            <div className="signup-header">
              <div className="signup-logo-wrapper">
                <img src={logo} alt="MarketGreen Logo" className="signup-logo" />
              </div>
              <h1 className="signup-title">
                Welcome to <span className="signup-market">Market</span>
                <span className="signup-green">Green</span>
              </h1>
              <p className="signup-subtitle">
                {isLogin ? (
                  <>Don't have an account? <a href="#signup" className="signup-link" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Sign up</a></>
                ) : (
                  <>Already have an account? <a href="#login" className="signup-link" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Log in</a></>
                )}
              </p>
            </div>

            {error && (
              <div className="signup-error-message">
                {error}
              </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-field-group">
                <label htmlFor="email" className="signup-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`signup-input ${fieldErrors.email ? 'signup-input-error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {fieldErrors.email && (
                  <span className="signup-field-error">{fieldErrors.email}</span>
                )}
              </div>

              {!isLogin && (
                <div className="signup-field-group">
                  <label htmlFor="username" className="signup-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`signup-input ${fieldErrors.username ? 'signup-input-error' : ''}`}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  {fieldErrors.username && (
                    <span className="signup-field-error">{fieldErrors.username}</span>
                  )}
                </div>
              )}

              <div className="signup-field-group">
                <label htmlFor="password" className="signup-label">Password</label>
                <div className="signup-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`signup-input ${fieldErrors.password || passwordErrors.length > 0 ? 'signup-input-error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {showPassword ? (
                        <path d="M8 2C4.5 2 1.73 4.11 0 7C1.73 9.89 4.5 12 8 12C11.5 12 14.27 9.89 16 7C14.27 4.11 11.5 2 8 2ZM8 10C6.34 10 5 8.66 5 7C5 5.34 6.34 4 8 4C9.66 4 11 5.34 11 7C11 8.66 9.66 10 8 10ZM8 5.5C7.17 5.5 6.5 6.17 6.5 7C6.5 7.83 7.17 8.5 8 8.5C8.83 8.5 9.5 7.83 9.5 7C9.5 6.17 8.83 5.5 8 5.5Z" fill="currentColor"/>
                      ) : (
                        <>
                          <path d="M8 2C4.5 2 1.73 4.11 0 7C1.73 9.89 4.5 12 8 12C11.5 12 14.27 9.89 16 7C14.27 4.11 11.5 2 8 2ZM8 10C6.34 10 5 8.66 5 7C5 5.34 6.34 4 8 4C9.66 4 11 5.34 11 7C11 8.66 9.66 10 8 10Z" fill="currentColor"/>
                          <path d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="signup-field-error">{fieldErrors.password}</span>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="signup-password-requirements">
                    {passwordErrors.length > 0 ? (
                      passwordErrors.map((req, index) => (
                        <div key={index} className="signup-requirement-item signup-requirement-error">
                          <span className="signup-requirement-dot"></span>
                          <span>{req}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="signup-requirement-item">
                          <span className="signup-requirement-dot"></span>
                          <span>Use 8 or more characters</span>
                        </div>
                        <div className="signup-requirement-item">
                          <span className="signup-requirement-dot"></span>
                          <span>One Uppercase character</span>
                        </div>
                        <div className="signup-requirement-item">
                          <span className="signup-requirement-dot"></span>
                          <span>One lowercase character</span>
                        </div>
                        <div className="signup-requirement-item">
                          <span className="signup-requirement-dot"></span>
                          <span>One special character</span>
                        </div>
                        <div className="signup-requirement-item">
                          <span className="signup-requirement-dot"></span>
                          <span>One number</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="signup-checkbox-group">
                    <input 
                      type="checkbox" 
                      id="marketing" 
                      className="signup-checkbox" 
                      checked={marketingEmails}
                      onChange={handleMarketingChange}
                    />
                    <label htmlFor="marketing" className="signup-checkbox-label">
                      I want to receive emails about the product, feature updates, events, and marketing promotions.
                    </label>
                  </div>

                  <p className="signup-terms">
                    By creating an account, you agree to the{' '}
                    <a href="#terms" className="signup-link">Terms of use</a> and{' '}
                    <a href="#privacy" className="signup-link">Privacy Policy</a>.
                  </p>
                </>
              )}

              <button 
                type="submit" 
                className="signup-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isLogin ? 'Log in' : 'Create an account')}
              </button>

              {!isLogin && (
                <p className="signup-login-prompt">
                  Already have an account? <a href="#login" className="signup-link" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Log in</a>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Right Column - Cart with Fruits Image */}
        <div className="signup-graphic-column">
          <div className="signup-graphic-overlay"></div>
          <div className="signup-graphic-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=1600&fit=crop&q=80" 
              alt="Shopping cart filled with fresh fruits" 
              className="signup-cart-image" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

