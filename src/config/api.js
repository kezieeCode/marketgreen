// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://marketgreen-backend.onrender.com'

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`
  }
}

