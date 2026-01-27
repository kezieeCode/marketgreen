import { useNavigate, useLocation } from 'react-router-dom'
import './CheckoutPage.css'

function PaymentFailedPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get reference and error message from query params if available
  const searchParams = new URLSearchParams(location.search)
  const reference = searchParams.get('reference')
  const error = searchParams.get('error')

  const handleRetry = () => {
    navigate('/checkout')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoToShop = () => {
    navigate('/shop')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-empty">
          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#e74c3c" strokeWidth="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h2>Payment Failed</h2>
          <p>
            {error || 'Your payment could not be processed. Please try again or use a different payment method.'}
          </p>
          {reference && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              Reference: <strong>{reference}</strong>
            </p>
          )}
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            If you continue to experience issues, please contact our support team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="checkout-btn-primary" onClick={handleRetry}>
              Try Again
            </button>
            <button className="checkout-back-btn" onClick={handleGoHome}>
              Go to Home
            </button>
            <button className="checkout-back-btn" onClick={handleGoToShop}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailedPage
