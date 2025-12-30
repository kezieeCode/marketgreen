import { useState } from 'react'
import './App.css'
import logo from './assets/images/logo.png'

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [orderTab, setOrderTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [customerPage, setCustomerPage] = useState(1)
  const [customerChartPeriod, setCustomerChartPeriod] = useState('this-week')
  const [categoryProductTab, setCategoryProductTab] = useState('all')
  const [categoryPage, setCategoryPage] = useState(1)

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="MarketGreen Logo" />
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-market">Market</span>
            <span className="sidebar-logo-green">Green</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <div className="menu-section">
            <div className="menu-section-title">Main menu</div>
            <a 
              href="#dashboard" 
              className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('dashboard'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10L10 3L17 10V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 19V10H13V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Dashboard
            </a>
            <a 
              href="#orders" 
              className={`menu-item ${activeMenu === 'orders' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('orders'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M7 13H15L19 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H15M15 13V17M13 19H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Order Management
            </a>
            <a 
              href="#customers" 
              className={`menu-item ${activeMenu === 'customers' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('customers'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M13 5C13 6.65685 11.6569 8 10 8C8.34315 8 7 6.65685 7 5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5ZM19 19V17C18.9993 16.1137 18.7044 15.2528 18.1614 14.5523C17.6184 13.8519 16.8581 13.3516 16 13.13M14 5C14 6.65685 12.6569 8 11 8C9.34315 8 8 6.65685 8 5C8 3.34315 9.34315 2 11 2C12.6569 2 14 3.34315 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Customers
            </a>
            <a 
              href="#coupon" 
              className={`menu-item ${activeMenu === 'coupon' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('coupon'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5H16C17.1046 5 18 5.89543 18 7V13C18 14.1046 17.1046 15 16 15H4C2.89543 15 2 14.1046 2 13V7C2 5.89543 2.89543 5 4 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Coupon Code
            </a>
            <a 
              href="#categories" 
              className={`menu-item ${activeMenu === 'categories' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('categories'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L10 2L17 9M10 2V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Categories
            </a>
            <a 
              href="#transaction" 
              className={`menu-item ${activeMenu === 'transaction' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('transaction'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V4C16 2.89543 15.1046 2 14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 2V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 2V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Transaction
            </a>
            <a 
              href="#brand" 
              className={`menu-item ${activeMenu === 'brand' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('brand'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927C9.349 2.005 10.651 2.005 10.951 2.927L12.47 7.6C12.6111 8.018 13.0022 8.30063 13.442 8.30063H18.31C19.275 8.30063 19.676 9.53143 18.887 10.1L14.946 12.938C14.5836 13.203 14.4225 13.6667 14.563 14.0846L16.082 18.7576C16.382 19.68 15.33 20.4386 14.541 19.8686L10.6 17.0306C10.2376 16.7656 9.76238 16.7656 9.4 17.0306L5.459 19.8686C4.67 20.4386 3.618 19.68 3.918 18.7576L5.437 14.0846C5.57755 13.6667 5.41638 13.203 5.054 12.938L1.113 10.1C0.323998 9.53143 0.724998 8.30063 1.69 8.30063H6.558C6.99777 8.30063 7.38889 8.018 7.53 7.6L9.049 2.927Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Brand
            </a>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Product</div>
            <a 
              href="#add-products" 
              className={`menu-item ${activeMenu === 'add-products' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('add-products'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Add Products
            </a>
            <a 
              href="#product-media" 
              className={`menu-item ${activeMenu === 'product-media' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('product-media'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L12 8L16 12L20 8V16C20 17.1046 19.1046 18 18 18H4C2.89543 18 2 17.1046 2 16V4C2 2.89543 2.89543 2 4 2H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              Product Media
            </a>
            <a 
              href="#product-list" 
              className={`menu-item ${activeMenu === 'product-list' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('product-list'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H16M4 10H16M4 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Product List
            </a>
            <a 
              href="#product-reviews" 
              className={`menu-item ${activeMenu === 'product-reviews' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('product-reviews'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927C9.349 2.005 10.651 2.005 10.951 2.927L12.47 7.6C12.6111 8.018 13.0022 8.30063 13.442 8.30063H18.31C19.275 8.30063 19.676 9.53143 18.887 10.1L14.946 12.938C14.5836 13.203 14.4225 13.6667 14.563 14.0846L16.082 18.7576C16.382 19.68 15.33 20.4386 14.541 19.8686L10.6 17.0306C10.2376 16.7656 9.76238 16.7656 9.4 17.0306L5.459 19.8686C4.67 20.4386 3.618 19.68 3.918 18.7576L5.437 14.0846C5.57755 13.6667 5.41638 13.203 5.054 12.938L1.113 10.1C0.323998 9.53143 0.724998 8.30063 1.69 8.30063H6.558C6.99777 8.30063 7.38889 8.018 7.53 7.6L9.049 2.927Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Product Reviews
            </a>
          </div>

          <div className="menu-section">
            <div className="menu-section-title">Admin</div>
            <a 
              href="#admin-role" 
              className={`menu-item ${activeMenu === 'admin-role' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('admin-role'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 17C3 14.7909 5.79086 13 10 13C14.2091 13 17 14.7909 17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Admin role
            </a>
            <a 
              href="#control-authority" 
              className={`menu-item ${activeMenu === 'control-authority' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveMenu('control-authority'); }}
            >
              <div className="menu-item-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 12V16M10 16L8 18M10 16L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 17C3 14.7909 5.79086 13 10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Control Authority
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-search">
            <svg className="header-search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="text" placeholder="Search data, users, or reports" />
          </div>

          <div className="header-actions">
            <button className="header-action-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C10 2 4 4 4 10C4 16 10 18 10 18C10 18 16 16 16 10C16 4 10 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="notification-badge"></span>
            </button>
            <button className="header-action-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3V1M10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13M10 3C12.7614 3 15 5.23858 15 8C15 10.7614 12.7614 13 10 13M10 13V19M3 10H1M19 10H17M4.31412 4.31412L2.8999 2.8999M17.1001 17.1001L15.6859 15.6859M4.31412 15.6859L2.8999 17.1001M17.1001 2.8999L15.6859 4.31412" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="user-avatar">MG</div>
          </div>
        </header>

        {/* Main Content */}
        {activeMenu === 'dashboard' && (
        <div className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* KPI Cards */}
          <div className="dashboard-grid">
            <div className="kpi-card">
              <div className="kpi-card-header">
                <div>
                  <div className="kpi-card-title">Total Sales</div>
                  <div className="kpi-card-value">$350K</div>
                </div>
                <div className="kpi-card-trend up">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  10.4%
                </div>
              </div>
              <div className="kpi-card-footer">
                <span className="kpi-card-footer-text">Last 7 days</span>
                <button className="kpi-card-button">Details</button>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                Previous 7 days ($235K)
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card-header">
                <div>
                  <div className="kpi-card-title">Total Orders</div>
                  <div className="kpi-card-value">10.7K</div>
                </div>
                <div className="kpi-card-trend up">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3V13M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  14.4%
                </div>
              </div>
              <div className="kpi-card-footer">
                <span className="kpi-card-footer-text">Last 7 days</span>
                <button className="kpi-card-button">Details</button>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                Previous 7 days (7.6k)
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-card-header">
                <div>
                  <div className="kpi-card-title">Pending & Canceled</div>
                  <div className="kpi-card-value">
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>509</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>204 Pending</div>
                  </div>
                </div>
                <div className="kpi-card-trend down">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 13V3M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  14.4%
                </div>
              </div>
              <div className="kpi-card-footer">
                <span className="kpi-card-footer-text">Last 7 days • 94 Canceled</span>
                <button className="kpi-card-button">Details</button>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="dashboard-charts-grid">
            {/* Transaction Table */}
            <div className="transaction-card">
              <div className="transaction-header">
                <h2 className="transaction-title">Transaction</h2>
                <button className="filter-btn">
                  Filter
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="transaction-table-container">
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Id Customer</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>#6545</td>
                      <td>01 Oct | 11:29 am</td>
                      <td>
                        <span className="status-badge status-paid">
                          <span className="status-dot"></span>
                          Paid
                        </span>
                      </td>
                      <td>$64</td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>#5412</td>
                      <td>01 Oct | 11:29 am</td>
                      <td>
                        <span className="status-badge status-pending">
                          <span className="status-dot"></span>
                          Pending
                        </span>
                      </td>
                      <td>$557</td>
                    </tr>
                    <tr>
                      <td>3.</td>
                      <td>#6622</td>
                      <td>01 Oct | 11:29 am</td>
                      <td>
                        <span className="status-badge status-paid">
                          <span className="status-dot"></span>
                          Paid
                        </span>
                      </td>
                      <td>$156</td>
                    </tr>
                    <tr>
                      <td>4.</td>
                      <td>#6462</td>
                      <td>01 Oct | 11:29 am</td>
                      <td>
                        <span className="status-badge status-paid">
                          <span className="status-dot"></span>
                          Paid
                        </span>
                      </td>
                      <td>$265</td>
                    </tr>
                    <tr>
                      <td>5.</td>
                      <td>#6462</td>
                      <td>01 Oct | 11:29 am</td>
                      <td>
                        <span className="status-badge status-paid">
                          <span className="status-dot"></span>
                          Paid
                        </span>
                      </td>
                      <td>$265</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="transaction-footer">
                <button className="details-btn">Details</button>
              </div>
            </div>

            {/* Add New Product Card */}
            <div className="add-product-card">
              <div className="add-product-header">
                <h2 className="add-product-title">Add New Product</h2>
                <button className="add-new-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Add New
                </button>
              </div>

              {/* Categories Section */}
              <div className="add-product-section">
                <h3 className="section-title">Categories</h3>
                <div className="category-list">
                  <div className="category-item">
                    <div className="category-icon">
                      <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop" alt="Electronic" />
                    </div>
                    <span className="category-name">Electronic</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="category-item">
                    <div className="category-icon">
                      <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop" alt="Fashion" />
                    </div>
                    <span className="category-name">Fashion</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="category-item">
                    <div className="category-icon">
                      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop" alt="Home" />
                    </div>
                    <span className="category-name">Home</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="see-more-link">See more</div>
              </div>

              {/* Product Section */}
              <div className="add-product-section">
                <h3 className="section-title">Product</h3>
                <div className="product-list">
                  <div className="product-item">
                    <div className="product-icon">
                      <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=96&h=96&fit=crop" alt="Smart Fitness Tracker" />
                    </div>
                    <div className="product-info">
                      <div className="product-name">Smart Fitness Tracker</div>
                      <div className="product-price">$39.99</div>
                    </div>
                    <button className="add-product-btn">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add
                    </button>
                  </div>
                  <div className="product-item">
                    <div className="product-icon">
                      <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=96&h=96&fit=crop" alt="Leather Wallet" />
                    </div>
                    <div className="product-info">
                      <div className="product-name">Leather Wallet</div>
                      <div className="product-price">$19.99</div>
                    </div>
                    <button className="add-product-btn">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add
                    </button>
                  </div>
                  <div className="product-item">
                    <div className="product-icon">
                      <img src="https://images.unsplash.com/photo-1608534224940-2d84956bb4a0?w=96&h=96&fit=crop" alt="Electric Hair Trimmer" />
                    </div>
                    <div className="product-info">
                      <div className="product-name">Electric Hair Trimmer</div>
                      <div className="product-price">$34.99</div>
                    </div>
                    <button className="add-product-btn">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
                <div className="see-more-link">See more</div>
              </div>
            </div>
          </div>

          {/* Best Selling Product */}
          <div className="best-selling-card">
            <div className="best-selling-header">
              <h2 className="best-selling-title">Best selling product</h2>
              <button className="filter-btn">
                Filter
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                  <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="best-selling-table-container">
              <table className="best-selling-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>TOTAL ORDER</th>
                    <th>STATUS</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="product-cell">
                        <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=48&h=48&fit=crop" alt="Apple iPhone 13" />
                        <span>Apple iPhone 13</span>
                      </div>
                    </td>
                    <td>104</td>
                    <td>
                      <span className="status-badge status-stock">
                        <span className="status-dot"></span>
                        Stock
                      </span>
                    </td>
                    <td>$999.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="product-cell">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=48&h=48&fit=crop" alt="Nike Air Jordan" />
                        <span>Nike Air Jordan</span>
                      </div>
                    </td>
                    <td>56</td>
                    <td>
                      <span className="status-badge status-stock-out">
                        <span className="status-dot"></span>
                        Stock out
                      </span>
                    </td>
                    <td>$999.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="product-cell">
                        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=48&h=48&fit=crop" alt="T-shirt" />
                        <span>T-shirt</span>
                      </div>
                    </td>
                    <td>266</td>
                    <td>
                      <span className="status-badge status-stock">
                        <span className="status-dot"></span>
                        Stock
                      </span>
                    </td>
                    <td>$999.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="product-cell">
                        <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=48&h=48&fit=crop" alt="Cross Bag" />
                        <span>Cross Bag</span>
                      </div>
                    </td>
                    <td>506</td>
                    <td>
                      <span className="status-badge status-stock">
                        <span className="status-dot"></span>
                        Stock
                      </span>
                    </td>
                    <td>$999.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="best-selling-footer">
              <button className="details-btn">Details</button>
            </div>
          </div>
        </div>
        )}

        {activeMenu === 'orders' && (
        <div className="dashboard-content">
          <div className="order-management-header">
            <div>
              <h1 className="dashboard-title">Order Management</h1>
              <p className="order-list-subtitle">Order List</p>
            </div>
            <div className="order-action-buttons">
              <button className="add-order-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Order
              </button>
              <button className="more-action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="order-summary-grid">
            <div className="order-summary-card">
              <div className="order-summary-header">
                <div className="order-summary-title">Total Orders</div>
                <button className="order-card-menu-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="order-summary-value">1,240</div>
              <div className="order-summary-footer">
                <span className="order-summary-period">Last 7 days</span>
                <span className="order-summary-trend up">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  14.4%
                </span>
              </div>
            </div>

            <div className="order-summary-card">
              <div className="order-summary-header">
                <div className="order-summary-title">New Orders</div>
                <button className="order-card-menu-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="order-summary-value">240</div>
              <div className="order-summary-footer">
                <span className="order-summary-period">Last 7 days</span>
                <span className="order-summary-trend up">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  20%
                </span>
              </div>
            </div>

            <div className="order-summary-card">
              <div className="order-summary-header">
                <div className="order-summary-title">Completed Orders</div>
                <button className="order-card-menu-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="order-summary-value">960</div>
              <div className="order-summary-footer">
                <span className="order-summary-period">Last 7 days</span>
                <span className="order-summary-trend">85%</span>
              </div>
            </div>

            <div className="order-summary-card">
              <div className="order-summary-header">
                <div className="order-summary-title">Canceled Orders</div>
                <button className="order-card-menu-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="order-summary-value">87</div>
              <div className="order-summary-footer">
                <span className="order-summary-period">Last 7 days</span>
                <span className="order-summary-trend down">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V2M6 10L3 7M6 10L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  5%
                </span>
              </div>
            </div>
          </div>

          {/* Order Table Controls */}
          <div className="order-table-controls">
            <div className="order-tabs">
                  <button 
                className={`order-tab ${orderTab === 'all' ? 'active' : ''}`}
                onClick={() => setOrderTab('all')}
                  >
                All order (240)
                  </button>
                  <button 
                className={`order-tab ${orderTab === 'completed' ? 'active' : ''}`}
                onClick={() => setOrderTab('completed')}
              >
                Completed
              </button>
              <button 
                className={`order-tab ${orderTab === 'pending' ? 'active' : ''}`}
                onClick={() => setOrderTab('pending')}
              >
                Pending
              </button>
              <button 
                className={`order-tab ${orderTab === 'canceled' ? 'active' : ''}`}
                onClick={() => setOrderTab('canceled')}
                  >
                Canceled
                  </button>
                </div>
            <div className="order-search-controls">
              <div className="order-search-bar">
                <svg className="order-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 15L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type="text" placeholder="Search order report" />
              </div>
              <button className="order-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="order-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6L8 3L11 6M5 10L8 13L11 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="order-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </button>
                </div>
                </div>

          {/* Order Table */}
          <div className="order-table-card">
            <table className="order-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>No.</th>
                  <th>Order Id</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>#ORD0001</td>
                  <td>
                    <div className="order-product-cell">
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop" alt="Wireless Bluetooth Headphones" />
                      <span>Wireless Bluetooth Headphones</span>
                </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>$49.99</td>
                  <td>
                    <span className="payment-badge paid">
                      <span className="payment-dot"></span>
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className="order-status delivered">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>#ORD0001</td>
                  <td>
                    <div className="order-product-cell">
                      <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop" alt="Men's T-Shirt" />
                      <span>Men's T-Shirt</span>
                </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>$14.99</td>
                  <td>
                    <span className="payment-badge unpaid">
                      <span className="payment-dot"></span>
                      Unpaid
                    </span>
                  </td>
                  <td>
                    <span className="order-status pending">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2"/>
                        <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>#ORD0001</td>
                  <td>
                    <div className="order-product-cell">
                      <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=40&h=40&fit=crop" alt="Leather Wallet" />
                      <span>Leather Wallet</span>
                </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>$19.99</td>
                  <td>
                    <span className="payment-badge paid">
                      <span className="payment-dot"></span>
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className="order-status shipped">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L7 1L13 5V11C13 11.5304 12.7893 12.0391 12.4142 12.4142C12.0391 12.7893 11.5304 13 11 13H3C2.46957 13 1.96086 12.7893 1.58579 12.4142C1.21071 12.0391 1 11.5304 1 11V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 13V7H9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>#ORD0001</td>
                  <td>
                    <div className="order-product-cell">
                      <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=40&h=40&fit=crop" alt="Smartphone" />
                      <span>Smartphone</span>
              </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>$999.00</td>
                  <td>
                    <span className="payment-badge paid">
                      <span className="payment-dot"></span>
                      Paid
                    </span>
                  </td>
                  <td>
                    <span className="order-status cancelled">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Cancelled
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>

          {/* Pagination */}
          <div className="order-pagination">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className="pagination-numbers">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`pagination-number ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <span className="pagination-ellipsis">...</span>
              <button
                className={`pagination-number ${currentPage === 24 ? 'active' : ''}`}
                onClick={() => setCurrentPage(24)}
              >
                24
              </button>
              </div>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.min(24, currentPage + 1))}
              disabled={currentPage === 24}
            >
              Next →
            </button>
              </div>
            </div>
        )}

        {activeMenu === 'customers' && (
        <div className="dashboard-content">
          <h1 className="dashboard-title">Customers</h1>

          {/* Summary Cards */}
          <div className="customer-summary-grid">
            <div className="customer-summary-card">
              <div className="customer-summary-header">
                <div className="customer-summary-title">Total Customers</div>
                <button className="order-card-menu-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
            </div>
              <div className="customer-summary-value">11,040</div>
              <div className="customer-summary-footer">
                <span className="customer-summary-period">Last 7 days</span>
                <span className="customer-summary-trend up">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  14.4%
                </span>
                  </div>
            </div>

            <div className="customer-summary-card">
              <div className="customer-summary-header">
                <div className="customer-summary-title">New Customers</div>
                <button className="order-card-menu-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                </button>
                  </div>
              <div className="customer-summary-value">2,370</div>
              <div className="customer-summary-footer">
                <span className="customer-summary-period">Last 7 days</span>
                <span className="customer-summary-trend up">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  20%
                </span>
                </div>
                  </div>

            <div className="customer-summary-card">
              <div className="customer-summary-header">
                <div className="customer-summary-title">Visitor</div>
                <button className="order-card-menu-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                </button>
                  </div>
              <div className="customer-summary-value">250k</div>
              <div className="customer-summary-footer">
                <span className="customer-summary-period">Last 7 days</span>
                <span className="customer-summary-trend up">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10M6 2L3 5M6 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  20%
                </span>
                </div>
                  </div>
          </div>

          {/* Customer Overview Chart */}
          <div className="customer-overview-card">
            <div className="customer-overview-header">
              <h2 className="customer-overview-title">Customer Overview</h2>
              <div className="customer-chart-toggle">
                <button 
                  className={`customer-toggle-btn ${customerChartPeriod === 'this-week' ? 'active' : ''}`}
                  onClick={() => setCustomerChartPeriod('this-week')}
                >
                  This week
                </button>
                <button 
                  className={`customer-toggle-btn ${customerChartPeriod === 'last-week' ? 'active' : ''}`}
                  onClick={() => setCustomerChartPeriod('last-week')}
                >
                  Last week
                </button>
              </div>
            </div>
            <div className="customer-metrics">
              <div className="customer-metric">
                <div className="customer-metric-label">Active Customers</div>
                <div className="customer-metric-value active">25k</div>
              </div>
              <div className="customer-metric">
                <div className="customer-metric-label">Repeat Customers</div>
                <div className="customer-metric-value">5.6k</div>
              </div>
              <div className="customer-metric">
                <div className="customer-metric-label">Shop Visitor</div>
                <div className="customer-metric-value">250k</div>
              </div>
              <div className="customer-metric">
                <div className="customer-metric-label">Conversion Rate</div>
                <div className="customer-metric-value">5.5%</div>
              </div>
            </div>
            <div className="customer-chart-placeholder">
              <div className="chart-axis">
                <div className="chart-y-axis">
                  <span>50k</span>
                  <span>40k</span>
                  <span>30k</span>
                  <span>20k</span>
                  <span>10k</span>
                  <span>0k</span>
                </div>
                <div className="chart-area">
                  <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="customerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.05"/>
                      </linearGradient>
                    </defs>
                    <path d="M 50 150 L 100 120 L 150 100 L 200 80 L 250 60 L 300 70 L 350 50 L 550 50" 
                          stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M 50 150 L 100 120 L 150 100 L 200 80 L 250 60 L 300 70 L 350 50 L 550 50 L 550 200 L 50 200 Z" 
                          fill="url(#customerGradient)"/>
                    <circle cx="250" cy="60" r="6" fill="#4CAF50" stroke="#ffffff" strokeWidth="2"/>
                  </svg>
                  <div className="chart-x-axis">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer List Table */}
          <div className="customer-table-card">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Customer Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Order Count</th>
                  <th>Total Spend</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#CUST001</td>
                  <td>John Doe</td>
                  <td>+1234567890</td>
                  <td>25</td>
                  <td>$3,450.00</td>
                  <td>
                    <span className="customer-status active">
                      <span className="customer-status-dot"></span>
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="customer-actions">
                      <button className="customer-action-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                      </button>
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                  </div>
                  </td>
                </tr>
                <tr>
                  <td>#CUST001</td>
                  <td>Jane Smith</td>
                  <td>+1234567890</td>
                  <td>5</td>
                  <td>$250.00</td>
                  <td>
                    <span className="customer-status inactive">
                      <span className="customer-status-dot"></span>
                      Inactive
                    </span>
                  </td>
                  <td>
                    <div className="customer-actions">
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                </div>
                  </td>
                </tr>
                <tr>
                  <td>#CUST001</td>
                  <td>Emily Davis</td>
                  <td>+1234567890</td>
                  <td>30</td>
                  <td>$4,600.00</td>
                  <td>
                    <span className="customer-status vip">
                      <span className="customer-status-dot"></span>
                      VIP
                    </span>
                  </td>
                  <td>
                    <div className="customer-actions">
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
              </div>
                  </td>
                </tr>
                <tr>
                  <td>#CUST001</td>
                  <td>Michael Brown</td>
                  <td>+1234567890</td>
                  <td>15</td>
                  <td>$1,800.00</td>
                  <td>
                    <span className="customer-status active">
                      <span className="customer-status-dot"></span>
                      Active
                    </span>
                  </td>
                  <td>
                    <div className="customer-actions">
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
              </div>
                  </td>
                </tr>
                <tr>
                  <td>#CUST001</td>
                  <td>Sarah Wilson</td>
                  <td>+1234567890</td>
                  <td>8</td>
                  <td>$950.00</td>
                  <td>
                    <span className="customer-status vip">
                      <span className="customer-status-dot"></span>
                      VIP
                    </span>
                  </td>
                  <td>
                    <div className="customer-actions">
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="customer-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
            </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="order-pagination">
            <button 
              className="pagination-btn"
              onClick={() => setCustomerPage(Math.max(1, customerPage - 1))}
              disabled={customerPage === 1}
            >
              ← Previous
            </button>
            <div className="pagination-numbers">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`pagination-number ${customerPage === num ? 'active' : ''}`}
                  onClick={() => setCustomerPage(num)}
                >
                  {num}
                </button>
              ))}
              <span className="pagination-ellipsis">...</span>
              <button
                className={`pagination-number ${customerPage === 24 ? 'active' : ''}`}
                onClick={() => setCustomerPage(24)}
              >
                24
              </button>
        </div>
            <button 
              className="pagination-btn"
              onClick={() => setCustomerPage(Math.min(24, customerPage + 1))}
              disabled={customerPage === 24}
            >
              Next →
            </button>
          </div>
        </div>
        )}

        {activeMenu === 'categories' && (
        <div className="dashboard-content">
          <h1 className="dashboard-title">Categories</h1>

          {/* Discover Section */}
          <div className="categories-discover-section">
            <div className="discover-header">
              <h2 className="discover-title">Discover</h2>
              <div className="discover-actions">
                <button className="add-product-discover-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 6V14M6 10H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Add Product
                </button>
                <button className="more-action-discover-btn">
                  More Action
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="categories-grid-container">
              <div className="categories-grid">
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=64&h=64&fit=crop" alt="Electronics" />
                  </div>
                  <span className="category-discover-name">Electronics</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop" alt="Fashion" />
                  </div>
                  <span className="category-discover-name">Fashion</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=64&h=64&fit=crop" alt="Accessories" />
                  </div>
                  <span className="category-discover-name">Accessories</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=64&h=64&fit=crop" alt="Home & Kitchen" />
                  </div>
                  <span className="category-discover-name">Home & Kitchen</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=64&h=64&fit=crop" alt="Sports & Outdoors" />
                  </div>
                  <span className="category-discover-name">Sports & Outdoors</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=64&h=64&fit=crop" alt="Toys & Games" />
                  </div>
                  <span className="category-discover-name">Toys & Games</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop" alt="Health & Fitness" />
                  </div>
                  <span className="category-discover-name">Health & Fitness</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="category-discover-card">
                  <div className="category-discover-icon">
                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=64&h=64&fit=crop" alt="Books" />
                  </div>
                  <span className="category-discover-name">Books</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <button className="categories-nav-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Product List Section */}
          <div className="categories-product-section">
            <div className="categories-product-tabs">
              <button 
                className={`category-product-tab ${categoryProductTab === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryProductTab('all')}
              >
                All Product (145)
              </button>
              <button 
                className={`category-product-tab ${categoryProductTab === 'featured' ? 'active' : ''}`}
                onClick={() => setCategoryProductTab('featured')}
              >
                Featured Products
              </button>
              <button 
                className={`category-product-tab ${categoryProductTab === 'sale' ? 'active' : ''}`}
                onClick={() => setCategoryProductTab('sale')}
              >
                On Sale
              </button>
              <button 
                className={`category-product-tab ${categoryProductTab === 'out-of-stock' ? 'active' : ''}`}
                onClick={() => setCategoryProductTab('out-of-stock')}
              >
                Out of Stock
              </button>
            </div>
            <div className="categories-product-controls">
              <div className="categories-product-search">
                <svg className="categories-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 15L11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type="text" placeholder="Search your product" />
              </div>
              <button className="categories-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="categories-control-btn categories-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="categories-control-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="categories-product-table-card">
            <table className="categories-product-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Created Date</th>
                  <th>Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop" alt="Wireless Bluetooth Headphones" />
                      <span>Wireless Bluetooth Headphones</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>25</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop" alt="Men's T-Shirt" />
                      <span>Men's T-Shirt</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>20</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=40&h=40&fit=crop" alt="Men's Leather Wallet" />
                      <span>Men's Leather Wallet</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>35</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=40&h=40&fit=crop" alt="Memory Foam Pillow" />
                      <span>Memory Foam Pillow</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>40</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1517668808823-bac8d30bc8a6?w=40&h=40&fit=crop" alt="Coffee Maker" />
                      <span>Coffee Maker</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>45</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=40&h=40&fit=crop" alt="Casual Baseball Cap" />
                      <span>Casual Baseball Cap</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>55</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=40&h=40&fit=crop" alt="Full HD Webcam" />
                      <span>Full HD Webcam</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>20</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop" alt="Smart LED Color Bulb" />
                      <span>Smart LED Color Bulb</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>16</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop" alt="Men's T-Shirt" />
                      <span>Men's T-Shirt</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>10</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>1</td>
                  <td>
                    <div className="category-product-cell">
                      <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=40&h=40&fit=crop" alt="Men's Leather Wallet" />
                      <span>Men's Leather Wallet</span>
                    </div>
                  </td>
                  <td>01-01-2025</td>
                  <td>35</td>
                  <td>
                    <div className="category-product-actions">
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.3333 2.66667C11.5084 2.49159 11.7163 2.35282 11.9447 2.25865C12.1731 2.16448 12.4173 2.11667 12.6667 2.11667C12.916 2.11667 13.1602 2.16448 13.3886 2.25865C13.617 2.35282 13.8249 2.49159 14 2.66667C14.1751 2.84175 14.3139 3.04966 14.408 3.27805C14.5022 3.50644 14.55 3.75065 14.55 4C14.55 4.24935 14.5022 4.49356 14.408 4.72195C14.3139 4.95034 14.1751 5.15825 14 5.33333L5.33333 14L2 14.6667L2.66667 11.3333L11.3333 2.66667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="category-action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4H14M6 4V3C6 2.44772 6.44772 2 7 2H9C9.55228 2 10 2.44772 10 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="order-pagination">
            <button 
              className="pagination-btn"
              onClick={() => setCategoryPage(Math.max(1, categoryPage - 1))}
              disabled={categoryPage === 1}
            >
              ← Previous
            </button>
            <div className="pagination-numbers">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`pagination-number ${categoryPage === num ? 'active' : ''}`}
                  onClick={() => setCategoryPage(num)}
                >
                  {num}
                </button>
              ))}
              <span className="pagination-ellipsis">...</span>
              <button
                className={`pagination-number ${categoryPage === 24 ? 'active' : ''}`}
                onClick={() => setCategoryPage(24)}
              >
                24
              </button>
            </div>
            <button 
              className="pagination-btn"
              onClick={() => setCategoryPage(Math.min(24, categoryPage + 1))}
              disabled={categoryPage === 24}
            >
              Next →
            </button>
          </div>
        </div>
        )}
      </main>
    </div>
  )
}

export default App
