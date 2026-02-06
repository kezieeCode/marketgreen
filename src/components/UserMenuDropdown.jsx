import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './UserMenuDropdown.css'

function UserMenuDropdown() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // If not authenticated, show login button
  if (!isAuthenticated()) {
    return (
      <button className="icon-btn" onClick={() => navigate('/signup')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
          <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
        </svg>
      </button>
    )
  }

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
    // Redirect to login/signup page after successful logout
    navigate('/signup')
  }

  const menuItems = [
    {
      label: 'My Account',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
          <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false)
        navigate('/account')
      }
    },
    {
      label: 'Orders',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H3L3.4 3M5 11H15L19 3H3.4M5 11L3.4 3M5 11L2.70711 13.2929C2.07714 13.9229 2.52331 15 3.41421 15H15M15 15C13.8954 15 13 15.8954 13 17C13 18.1046 13.8954 19 15 19C16.1046 19 17 18.1046 17 17C17 15.8954 16.1046 15 15 15ZM7 17C7 18.1046 6.10457 19 5 19C3.89543 19 3 18.1046 3 17C3 15.8954 3.89543 15 5 15C6.10457 15 7 15.8954 7 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false)
        navigate('/orders')
      }
    },
    {
      label: 'Inbox',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V17C18 17.6 17.6 18 17 18H3C2.4 18 2 17.6 2 17V3ZM3 3V4.5L10 9.5L17 4.5V3H3ZM17 5.5L10 10.5L3 5.5V17H17V5.5Z" fill="currentColor"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false)
        navigate('/inbox')
      }
    },
    {
      label: 'Wishlist',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 17.5L3.5 11C1.5 9 1.5 5.5 3.5 3.5C5.5 1.5 9 1.5 11 3.5L10 4.5L9 3.5C11 1.5 14.5 1.5 16.5 3.5C18.5 5.5 18.5 9 16.5 11L10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false)
        navigate('/wishlist')
      }
    },
    {
      label: 'Voucher',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4C2 2.9 2.9 2 4 2H16C17.1 2 18 2.9 18 4V6C16.9 6 16 6.9 16 8C16 9.1 16.9 10 18 10V12C18 13.1 17.1 14 16 14H4C2.9 14 2 13.1 2 12V10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6V4ZM4 4V6H16V4H4ZM4 12H16V10H4V12Z" fill="currentColor"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false)
        navigate('/voucher')
      }
    },
    {
      label: 'Logout',
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L2 12M2 12L7 7M2 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      onClick: handleLogout,
      isLogout: true
    }
  ]

  return (
    <div className="user-menu-dropdown-wrapper" ref={dropdownRef}>
      <div 
        className="user-menu-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-greeting">Hello, {user?.username || user?.email?.split('@')[0] || 'User'}</span>
        <svg 
          className="user-icon-mobile"
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
          <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor"/>
        </svg>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {isOpen && (
        <div className="user-menu-dropdown">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`user-menu-item ${item.isLogout ? 'logout-item' : ''}`}
              onClick={item.onClick}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserMenuDropdown
