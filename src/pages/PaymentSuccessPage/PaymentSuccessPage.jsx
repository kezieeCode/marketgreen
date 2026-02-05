import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { API_ENDPOINTS } from '../../config/api.js'
import '../CheckoutPage/CheckoutPage.css'

function PaymentSuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearCart } = useCart()
  const { token } = useAuth()
  
  // Get order details from query params
  const searchParams = new URLSearchParams(location.search)
  const reference = searchParams.get('reference')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')
  
  const [orderDetails, setOrderDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Clear cart on successful payment
    clearCart()
    
    // Optionally fetch full order details if we have reference and token
    if (reference && token) {
      fetchOrderDetails()
    }
  }, [clearCart, reference, token])

  const fetchOrderDetails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.PAYMENTS.VERIFY(reference), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrderDetails(data)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoToShop = () => {
    navigate('/shop')
  }

  const displayAmount = orderDetails?.amount || amount || '0.00'
  const orderNumber = orderDetails?.metadata?.order_id || orderId || reference || 'N/A'

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-empty" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <svg width="80" height="80" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L3 4V9C3 13 6 16.5 10 18C14 16.5 17 13 17 9V4L10 1Z" fill="#4CAF50"/>
            <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 style={{ fontSize: '2rem', marginTop: '1rem' }}>Order Created Successfully!</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
            Your order has been confirmed and payment processed successfully.
          </p>

          {/* Order Details Card */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: '#f9f9f9', 
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            textAlign: 'left',
            width: '100%'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#333' }}>Order Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Order Number:</span>
                <strong style={{ color: '#333' }}>{orderNumber}</strong>
              </div>
              
              {reference && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Payment Reference:</span>
                  <strong style={{ color: '#333', fontSize: '0.9rem' }}>{reference}</strong>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Total Amount:</span>
                <strong style={{ color: '#4CAF50', fontSize: '1.1rem' }}>₦{Number(displayAmount).toFixed(2)}</strong>
              </div>
              
              {orderDetails?.paid_at && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Paid At:</span>
                  <span style={{ color: '#333' }}>
                    {new Date(orderDetails.paid_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#666' }}>
            You will receive an order confirmation email shortly with all the details.
          </p>
          
          {isLoading && (
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
              Loading order details...
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
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

export default PaymentSuccessPage
