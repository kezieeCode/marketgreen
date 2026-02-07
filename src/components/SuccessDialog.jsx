import { useEffect } from 'react'
import './SuccessDialog.css'
import logo from '../assets/images/logo.png'

function SuccessDialog({ isOpen, onClose, userName }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="success-dialog-overlay" onClick={onClose}>
      <div className="success-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="success-dialog-content">
          <div className="success-icon-wrapper">
            <div className="success-icon-circle">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M40 12L18 34L8 24" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="success-icon-pulse"></div>
          </div>
          
          <div className="success-dialog-logo">
            <img src={logo} alt="MarketGreen Logo" />
          </div>
          
          <h2 className="success-dialog-title">
            Welcome to <span className="success-market">Market</span>
            <span className="success-green">Green</span>!
          </h2>
          
          <p className="success-dialog-message">
            Your account has been created successfully. You're all set to start shopping for fresh groceries!
          </p>
          
          <div className="success-features">
            <div className="success-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Fresh produce delivered to your door</span>
            </div>
            <div className="success-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure payment options</span>
            </div>
            <div className="success-feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Exclusive deals and promotions</span>
            </div>
          </div>
          
          <button className="success-dialog-button" onClick={onClose}>
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessDialog
