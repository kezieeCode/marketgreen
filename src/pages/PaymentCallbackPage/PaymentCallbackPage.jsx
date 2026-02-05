import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { API_ENDPOINTS } from '../../config/api.js'
import './CheckoutPage.css'

function useQuery() {
  const { search } = useLocation()
  return new URLSearchParams(search)
}

function PaymentCallbackPage() {
  const navigate = useNavigate()
  const query = useQuery()
  const { token } = useAuth()
  const { clearCart } = useCart()
  
  // Read status, reference, and error from query params (backend already verified)
  const statusParam = query.get('status') // 'success' | 'failed' | 'error'
  const reference = query.get('reference')
  const errorParam = query.get('error')
  
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    // Clear cart on successful payment
    if (statusParam === 'success') {
      clearCart()
    }
  }, [statusParam, clearCart])

  // Optional: Fetch full payment details if needed
  const fetchPaymentDetails = async () => {
    if (!reference || !token) return

    setIsLoadingDetails(true)
    try {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.VERIFY(reference), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPaymentDetails(data)
      }
    } catch (error) {
      console.error('Error fetching payment details:', error)
    } finally {
      setIsLoadingDetails(false)
    }
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoToShop = () => {
    navigate('/shop')
  }

  const handleRetry = () => {
    navigate('/checkout')
  }

  // Determine display status and message based on query params
  const getDisplayContent = () => {
    if (statusParam === 'success') {
      return {
        title: 'Payment Successful!',
        message: 'Your payment has been processed successfully. Thank you for your purchase!',
        icon: (
          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L3 4V9C3 13 6 16.5 10 18C14 16.5 17 13 17 9V4L10 1Z" fill="#4CAF50"/>
            <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        showRetry: false
      }
    } else if (statusParam === 'failed') {
      return {
        title: 'Payment Failed',
        message: errorParam || 'Your payment could not be processed. Please try again or use a different payment method.',
        icon: (
          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#e74c3c" strokeWidth="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        showRetry: true
      }
    } else if (statusParam === 'error') {
      return {
        title: 'Payment Error',
        message: errorParam || 'An error occurred while processing your payment. Please contact support if this persists.',
        icon: (
          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#e74c3c" strokeWidth="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        showRetry: true
      }
    } else {
      // No status param or invalid status
      return {
        title: 'Payment Status Unknown',
        message: 'Unable to determine payment status. Please check your order history or contact support.',
        icon: (
          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#999" strokeWidth="2"/>
            <path d="M10 6V10M10 14H10.01" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        showRetry: true
      }
    }
  }

  const displayContent = getDisplayContent()

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-empty">
          {displayContent.icon}
          <h2>{displayContent.title}</h2>
          <p>{displayContent.message}</p>
          {reference && (
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              Reference: <strong>{reference}</strong>
            </p>
          )}
          {paymentDetails && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <p><strong>Amount:</strong> ₦{paymentDetails.amount?.toFixed(2)}</p>
              {paymentDetails.paid_at && (
                <p><strong>Paid at:</strong> {new Date(paymentDetails.paid_at).toLocaleString()}</p>
              )}
            </div>
          )}
          {!paymentDetails && reference && token && (
            <button 
              className="checkout-back-btn" 
              onClick={fetchPaymentDetails}
              disabled={isLoadingDetails}
              style={{ marginTop: '1rem' }}
            >
              {isLoadingDetails ? 'Loading...' : 'View Payment Details'}
            </button>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            {displayContent.showRetry && (
              <button className="checkout-btn-primary" onClick={handleRetry}>
                Try Again
              </button>
            )}
            <button className="checkout-btn-primary" onClick={handleGoHome}>
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

export default PaymentCallbackPage

