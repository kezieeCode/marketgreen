import { createContext, useContext, useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(parsedUser)
        setIsLoading(false)
        // Fetch fresh user info from API to ensure data is up to date
        // But don't wait for it - use stored data immediately
        fetchUserInfo(storedToken).catch(() => {
          // If API call fails, keep using stored user data
          console.warn('Failed to fetch fresh user info, using stored data')
        })
      } catch (error) {
        console.error('Error loading auth state:', error)
        // Clear invalid data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refresh_token')
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUserInfo = async (authToken) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const userData = await response.json()
        // Merge with existing user data to preserve all fields (especially username)
        setUser(prevUser => {
          const mergedUser = { 
            ...prevUser, 
            ...userData,
            // Preserve username if it exists in prevUser but not in new data
            username: userData.username || prevUser?.username || userData.email?.split('@')[0]
          }
          localStorage.setItem('user', JSON.stringify(mergedUser))
          return mergedUser
        })
      } else {
        // Token might be invalid, clear auth state only on auth errors
        if (response.status === 401 || response.status === 403) {
          logout()
        }
        // For other errors, keep existing user data
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
      // Don't clear auth on network errors, keep existing user data
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Store session token and refresh token
        if (data.session?.access_token) {
          const accessToken = data.session.access_token
          setToken(accessToken)
          localStorage.setItem('token', accessToken)
          
          if (data.session.refresh_token) {
            localStorage.setItem('refresh_token', data.session.refresh_token)
          }

          // Store user data if provided in response
          if (data.user) {
            setUser(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
          } else {
            // Fetch user info if not provided in login response
            await fetchUserInfo(accessToken)
          }

          return { success: true, data }
        } else {
          return { success: false, error: 'No access token received' }
        }
      } else {
        return { 
          success: false, 
          error: data.error || 'Login failed',
          field: data.field,
          status: response.status
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  const logout = async () => {
    const currentToken = token || localStorage.getItem('token')
    
    // Call logout API endpoint if we have a token
    if (currentToken) {
      try {
        const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        })

        // Even if the API call fails, we should still clear local state
        // The token might be expired or invalid, but we want to log the user out locally
        if (!response.ok) {
          console.warn('Logout API call failed, but clearing local session:', response.status)
        }
      } catch (error) {
        console.error('Error calling logout API:', error)
        // Continue with local logout even if API call fails
      }
    }

    // Clear local state regardless of API call result
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refresh_token')
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
    fetchUserInfo
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
