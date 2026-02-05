// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://marketgreen-backend.onrender.com'

// Dedicated base URL for payment APIs (Paystack integration)
// Uses deployed backend by default, but can be overridden via env.
export const PAYMENTS_BASE_URL =
  import.meta.env.VITE_PAYMENTS_API_URL || 'https://marketgreen-backend.onrender.com'

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`
  },
  PRODUCTS: {
    LIST: `${API_BASE_URL}/api/products`,
    FEATURED: `${API_BASE_URL}/api/products?badge=new,hot&limit=50&offset=0`,
    BY_CATEGORY: (category) =>
      `${API_BASE_URL}/api/products?category=${encodeURIComponent(category)}`,
    DETAIL: (id) => `${API_BASE_URL}/api/products/${id}`,
    TOP_RATED: (limit = 10) => `${API_BASE_URL}/api/products/top-rated?limit=${limit}`,
    RELATED: (id) => `${API_BASE_URL}/api/products/${id}/related`
  },
  PAYMENTS: {
    PUBLIC_KEY: `${PAYMENTS_BASE_URL}/api/payments/public-key`,
    CHARGE: `${PAYMENTS_BASE_URL}/api/payments/charge`,
    INITIALIZE: `${PAYMENTS_BASE_URL}/api/payments/initialize`,
    VERIFY: (reference) => `${PAYMENTS_BASE_URL}/api/payments/verify/${encodeURIComponent(reference)}`,
    CREATE_ORDER: `${PAYMENTS_BASE_URL}/api/payments/create-order`
  },
  ORDERS: {
    LIST: `${API_BASE_URL}/api/orders`,
    DETAIL: (id) => `${API_BASE_URL}/api/orders/${id}`
  },
  INBOX: {
    LIST: `${API_BASE_URL}/api/inbox`,
    DETAIL: (id) => `${API_BASE_URL}/api/inbox/${id}`,
    MARK_READ: (id) => `${API_BASE_URL}/api/inbox/${id}/read`
  },
  VOUCHERS: {
    LIST: `${API_BASE_URL}/api/vouchers`,
    DETAIL: (id) => `${API_BASE_URL}/api/vouchers/${id}`,
    REDEEM: `${API_BASE_URL}/api/vouchers/redeem`
  },
  COUPONS: {
    LIST: (active = true) => `${API_BASE_URL}/api/coupons${active ? '?active=true' : ''}`,
    APPLY: `${API_BASE_URL}/api/coupons/apply`
  },
  WISHLIST: {
    LIST: `${API_BASE_URL}/api/wishlist`,
    ADD: `${API_BASE_URL}/api/wishlist`,
    REMOVE: (id) => `${API_BASE_URL}/api/wishlist/${id}`
  },
  ACCOUNT: {
    UPDATE: `${API_BASE_URL}/api/users/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/users/change-password`,
    PREFERENCES: `${API_BASE_URL}/api/account/preferences`
  },
  PROMOTIONS: {
    GET: `${API_BASE_URL}/api/promotions`
  },
  REVIEWS: {
    CREATE: `${API_BASE_URL}/api/reviews`
  },
  CART: {
    LIST: `${API_BASE_URL}/api/cart`,
    ADD: `${API_BASE_URL}/api/cart`,
    UPDATE: (itemId) => `${API_BASE_URL}/api/cart/${itemId}`,
    REMOVE: (itemId) => `${API_BASE_URL}/api/cart/${itemId}`,
    CLEAR: `${API_BASE_URL}/api/cart`
  }
}

