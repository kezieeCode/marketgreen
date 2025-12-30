// API configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://marketgreen-backend.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

