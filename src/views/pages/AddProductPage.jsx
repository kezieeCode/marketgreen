import { useState, useEffect } from 'react'
import { API_CONFIG } from '../../config/api.js'

const CATEGORIES = [
  'Vegetables', 'Fruits', 'Meat', 'Fish', 'Beverages', 
  'Juices', 'Dairy', 'Snacks', 'Breakfast', 'Health', 
  'Bakery', 'Grains', 'Organic', 'Others', 'Uncategorized'
]

const BADGE_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'new', label: 'NEW' },
  { value: 'hot', label: 'HOT' },
  { value: 'sell-25', label: 'SELL -25%' },
  { value: 'sale', label: 'SALE' }
]

const STOCK_STATUS_OPTIONS = ['In Stock', 'Out of Stock', 'Low Stock']
const PRODUCT_STATUS_OPTIONS = ['Active', 'Draft', 'Archived']

// Auto-generate slug from product name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const AddProductPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    currentPrice: '',
    originalPrice: '',
    discountPercentage: '',
    description: '',
    shortDescription: '',
    categories: [],
    badge: 'none',
    mainImage: '',
    additionalImages: ['', '', '', ''],
    initialRating: 0,
    initialReviewCount: 0,
    stockQuantity: '',
    stockStatus: 'In Stock',
    productStatus: 'Draft',
    featured: false,
    relatedProducts: [],
    weight: '',
    dimensions: '',
    tags: []
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([null, null, null, null])
  const [notification, setNotification] = useState(null)

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }))
    }
  }, [formData.name])

  // Auto-calculate discount percentage
  useEffect(() => {
    if (formData.originalPrice && formData.currentPrice) {
      const original = parseFloat(formData.originalPrice)
      const current = parseFloat(formData.currentPrice)
      if (original > 0 && current >= 0 && current <= original) {
        const discount = ((original - current) / original) * 100
        setFormData(prev => ({ ...prev, discountPercentage: discount.toFixed(2) }))
      }
    } else if (!formData.originalPrice || !formData.currentPrice) {
      setFormData(prev => ({ ...prev, discountPercentage: '' }))
    }
  }, [formData.originalPrice, formData.currentPrice])

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Handle slug manual edit
  const handleSlugChange = (value) => {
    setFormData(prev => ({ ...prev, slug: generateSlug(value) }))
  }

  // Category toggle
  const toggleCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  // Tag management
  const addTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }))
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  // Image handlers
  const handleMainImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMainImagePreview(reader.result)
        // In production, upload to server and set URL
        handleInputChange('mainImage', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMainImageUrl = (url) => {
    setMainImagePreview(url)
    handleInputChange('mainImage', url)
  }

  const handleAdditionalImage = (index, fileOrUrl) => {
    if (typeof fileOrUrl === 'string') {
      // URL
      const newPreviews = [...additionalImagePreviews]
      newPreviews[index] = fileOrUrl
      setAdditionalImagePreviews(newPreviews)
      const newImages = [...formData.additionalImages]
      newImages[index] = fileOrUrl
      handleInputChange('additionalImages', newImages)
    } else {
      // File
      if (fileOrUrl && fileOrUrl.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const newPreviews = [...additionalImagePreviews]
          newPreviews[index] = reader.result
          setAdditionalImagePreviews(newPreviews)
          const newImages = [...formData.additionalImages]
          newImages[index] = reader.result
          handleInputChange('additionalImages', newImages)
        }
        reader.readAsDataURL(fileOrUrl)
      }
    }
  }

  const removeMainImage = () => {
    setMainImagePreview(null)
    handleInputChange('mainImage', '')
  }

  const removeAdditionalImage = (index) => {
    const newPreviews = [...additionalImagePreviews]
    newPreviews[index] = null
    setAdditionalImagePreviews(newPreviews)
    const newImages = [...formData.additionalImages]
    newImages[index] = ''
    handleInputChange('additionalImages', newImages)
  }

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e, imageType = 'main', index = null) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (imageType === 'main') {
        handleMainImageFile(file)
      } else {
        handleAdditionalImage(index, file)
      }
    }
  }

  // Validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (!formData.currentPrice || parseFloat(formData.currentPrice) <= 0) {
      newErrors.currentPrice = 'Valid current price is required'
    }
    if (formData.originalPrice && parseFloat(formData.currentPrice) > parseFloat(formData.originalPrice)) {
      newErrors.currentPrice = 'Current price cannot be greater than original price'
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.categories.length === 0) newErrors.categories = 'At least one category is required'
    if (!formData.mainImage) newErrors.mainImage = 'Main image is required'
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = 'Valid stock quantity is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission
  const handleSubmit = async (status = 'active') => {
    if (!validateForm()) {
      setNotification({ type: 'error', message: 'Please fix the errors in the form' })
      return
    }

    setIsSubmitting(true)
    try {
      // Get admin token from localStorage
      const token = localStorage.getItem('admin_token')
      if (!token) {
        throw new Error('Authentication required. Please log in again.')
      }

      // Filter empty strings from arrays
      const filteredAdditionalImages = formData.additionalImages.filter(img => img.trim() !== '')
      const filteredTags = formData.tags.filter(tag => tag.trim() !== '')

      // Capitalize product status to match API format
      const capitalizeStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      }

      // Build product data object matching API specification
      const productData = {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        currentPrice: parseFloat(formData.currentPrice),
        description: formData.description.trim(),
        categories: formData.categories.length > 0 ? formData.categories : ['Uncategorized'],
        mainImage: formData.mainImage.trim(),
        stockQuantity: parseInt(formData.stockQuantity),
        productStatus: capitalizeStatus(formData.productStatus),
        action: status === 'active' ? 'publish' : 'draft'
      }

      // Add optional fields only if they have values
      if (formData.originalPrice && parseFloat(formData.originalPrice) > 0) {
        productData.originalPrice = parseFloat(formData.originalPrice)
      }

      if (formData.shortDescription && formData.shortDescription.trim()) {
        productData.shortDescription = formData.shortDescription.trim()
      }

      if (filteredAdditionalImages.length > 0) {
        productData.additionalImages = filteredAdditionalImages
      }

      if (formData.badge && formData.badge !== 'none') {
        productData.badge = formData.badge
      }

      if (formData.initialRating && parseFloat(formData.initialRating) > 0) {
        productData.initialRating = parseFloat(formData.initialRating)
      }

      if (formData.initialReviewCount && parseInt(formData.initialReviewCount) > 0) {
        productData.initialReviewCount = parseInt(formData.initialReviewCount)
      }

      if (formData.featured) {
        productData.featured = formData.featured
      }

      if (formData.weight && formData.weight.trim()) {
        productData.weight = formData.weight.trim()
      }

      if (formData.dimensions && formData.dimensions.trim()) {
        productData.dimensions = formData.dimensions.trim()
      }

      if (filteredTags.length > 0) {
        productData.tags = filteredTags
      }

      // Make API request with authentication
      const response = await fetch(`${API_CONFIG.baseURL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      // Handle response
      const result = await response.json()

      if (!response.ok) {
        // Extract error message from response
        let errorMessage = 'Failed to create product'
        
        if (response.status === 401 || response.status === 403) {
          errorMessage = 'Authentication failed. Please log in again.'
        } else if (response.status === 409) {
          errorMessage = result.error || 'SKU already exists. Please use a different SKU.'
        } else if (result.error) {
          errorMessage = result.error
        } else if (result.errors) {
          // Handle validation errors
          const errorMessages = Object.values(result.errors).join(', ')
          errorMessage = `Validation failed: ${errorMessages}`
        }
        
        throw new Error(errorMessage)
      }

      // Success - show notification
      const actionMessage = status === 'active' ? 'published' : 'saved as draft'
      setNotification({ 
        type: 'success', 
        message: `Product ${actionMessage} successfully!` 
      })
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          slug: '',
          sku: '',
          currentPrice: '',
          originalPrice: '',
          discountPercentage: '',
          description: '',
          shortDescription: '',
          categories: [],
          badge: 'none',
          mainImage: '',
          additionalImages: ['', '', '', ''],
          initialRating: 0,
          initialReviewCount: 0,
          stockQuantity: '',
          stockStatus: 'In Stock',
          productStatus: 'Draft',
          featured: false,
          relatedProducts: [],
          weight: '',
          dimensions: '',
          tags: []
        })
        setMainImagePreview(null)
        setAdditionalImagePreviews([null, null, null, null])
        setTagInput('')
        setNotification(null)
      }, 2000)
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: error.message || 'Failed to create product. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <div className="add-product-page">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="add-product-container">
        {/* Form Column */}
        <div className="add-product-form-column">
          <div className="add-product-header">
            <h1 className="add-product-title">Add New Product</h1>
            <p className="add-product-subtitle">Fill in the details to create a new product</p>
          </div>

          {/* Section 1: Basic Information */}
          <div className="form-section-card">
            <h2 className="section-title">Basic Information</h2>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => {
                  handleInputChange('name', e.target.value)
                  if (formData.slug === generateSlug(formData.name) || !formData.slug) {
                    handleSlugChange(e.target.value)
                  }
                }}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Product Slug/ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="product-slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
              />
              <small className="form-hint">Auto-generated from product name. Used in URL: /product/{formData.slug || 'product-slug'}</small>
            </div>

            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input
                type="text"
                className={`form-input ${errors.sku ? 'error' : ''}`}
                placeholder="SKU-001"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
              />
              {errors.sku && <span className="error-message">{errors.sku}</span>}
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="form-section-card">
            <h2 className="section-title">Pricing</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Current Price *</label>
                <input
                  type="number"
                  className={`form-input ${errors.currentPrice ? 'error' : ''}`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.currentPrice}
                  onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                />
                {errors.currentPrice && <span className="error-message">{errors.currentPrice}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Original Price</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                />
              </div>
            </div>

            {formData.discountPercentage && (
              <div className="form-group">
                <label className="form-label">Discount Percentage</label>
                <div className="discount-display">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => handleInputChange('discountPercentage', e.target.value)}
                  />
                  <span className="discount-badge">% OFF</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Product Details */}
          <div className="form-section-card">
            <h2 className="section-title">Product Details</h2>
            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-textarea"
                placeholder="Brief description for product cards..."
                rows="3"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Detailed product description..."
                rows="6"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          {/* Section 4: Categories & Classification */}
          <div className="form-section-card">
            <h2 className="section-title">Categories & Classification</h2>
            <div className="form-group">
              <label className="form-label">Categories *</label>
              <div className={`category-selector ${errors.categories ? 'error' : ''}`}>
                <div className="category-grid">
                  {CATEGORIES.map(category => (
                    <div
                      key={category}
                      className={`category-card ${formData.categories.includes(category) ? 'selected' : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      <span className="category-name">{category}</span>
                      {formData.categories.includes(category) && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                {errors.categories && <span className="error-message">{errors.categories}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Badge</label>
              <div className="badge-selector">
                {BADGE_OPTIONS.map(option => (
                  <label key={option.value} className="badge-option">
                    <input
                      type="radio"
                      name="badge"
                      value={option.value}
                      checked={formData.badge === option.value}
                      onChange={(e) => handleInputChange('badge', e.target.value)}
                    />
                    <span className={`badge-label ${formData.badge === option.value ? 'active' : ''}`}>
                      {option.label === 'None' ? 'None' : (
                        <span className={`product-badge badge-${option.value}`}>{option.label}</span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Images */}
          <div className="form-section-card">
            <h2 className="section-title">Images</h2>
            
            {/* Main Image */}
            <div className="form-group">
              <label className="form-label">Main Product Image *</label>
              {!mainImagePreview ? (
                <div
                  className={`image-upload-zone ${dragActive ? 'drag-active' : ''} ${errors.mainImage ? 'error' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'main')}
                  onClick={() => document.getElementById('main-image-upload')?.click()}
                >
                  <input
                    id="main-image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files[0] && handleMainImageFile(e.target.files[0])}
                  />
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Drag and drop image here or click to upload</p>
                  <small>Or enter image URL below</small>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={mainImagePreview} alt="Main product" className="image-preview" />
                  <button type="button" className="remove-image-btn" onClick={removeMainImage}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}
              <input
                type="url"
                className="form-input"
                placeholder="https://example.com/image.jpg"
                value={formData.mainImage}
                onChange={(e) => handleMainImageUrl(e.target.value)}
                style={{ marginTop: '0.5rem' }}
              />
              {errors.mainImage && <span className="error-message">{errors.mainImage}</span>}
            </div>

            {/* Additional Images */}
            <div className="form-group">
              <label className="form-label">Additional Images (Optional)</label>
              <div className="additional-images-grid">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="additional-image-slot">
                    {!additionalImagePreviews[index] ? (
                      <div
                        className={`image-upload-zone small ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => handleDrop(e, 'additional', index)}
                        onClick={() => document.getElementById(`additional-image-${index}`)?.click()}
                      >
                        <input
                          id={`additional-image-${index}`}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => e.target.files[0] && handleAdditionalImage(index, e.target.files[0])}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="image-preview-container small">
                        <img src={additionalImagePreviews[index]} alt={`Additional ${index + 1}`} className="image-preview" />
                        <button type="button" className="remove-image-btn" onClick={() => removeAdditionalImage(index)}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                    <input
                      type="url"
                      className="form-input small"
                      placeholder="Image URL"
                      value={formData.additionalImages[index]}
                      onChange={(e) => handleAdditionalImage(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Ratings & Reviews */}
          <div className="form-section-card">
            <h2 className="section-title">Ratings & Reviews</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Initial Rating</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.initialRating}
                  onChange={(e) => handleInputChange('initialRating', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Review Count</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  min="0"
                  value={formData.initialReviewCount}
                  onChange={(e) => handleInputChange('initialReviewCount', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 7: Inventory */}
          <div className="form-section-card">
            <h2 className="section-title">Inventory</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Stock Quantity *</label>
                <input
                  type="number"
                  className={`form-input ${errors.stockQuantity ? 'error' : ''}`}
                  placeholder="0"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                />
                {errors.stockQuantity && <span className="error-message">{errors.stockQuantity}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Stock Status</label>
                <select
                  className="form-input"
                  value={formData.stockStatus}
                  onChange={(e) => handleInputChange('stockStatus', e.target.value)}
                >
                  {STOCK_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 8: Visibility & Status */}
          <div className="form-section-card">
            <h2 className="section-title">Visibility & Status</h2>
            <div className="form-group">
              <label className="form-label">Product Status</label>
              <div className="status-selector">
                {PRODUCT_STATUS_OPTIONS.map(status => (
                  <label key={status} className="status-option">
                    <input
                      type="radio"
                      name="productStatus"
                      value={status}
                      checked={formData.productStatus === status}
                      onChange={(e) => handleInputChange('productStatus', e.target.value)}
                    />
                    <span className={`status-label ${formData.productStatus === status ? 'active' : ''}`}>
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
                <span>Featured Product (show in featured section)</span>
              </label>
            </div>
          </div>

          {/* Section 9: Additional Details */}
          <div className="form-section-card">
            <h2 className="section-title">Additional Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Weight</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 1kg, 500g"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dimensions</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 10x10x5 cm"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <div className="tags-input-container">
                <div className="tags-display">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag-chip">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="tag-input-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add tags (press Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <button type="button" className="add-tag-btn" onClick={addTag}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-draft"
              onClick={() => handleSubmit('draft')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              className="btn-publish"
              onClick={() => handleSubmit('active')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="add-product-preview-column">
          <div className="preview-sticky">
            <h2 className="section-title">Live Preview</h2>
            <div className="product-preview-card">
              {mainImagePreview && (
                <div className="preview-image-container">
                  <img src={mainImagePreview} alt={formData.name || 'Product'} className="preview-image" />
                  {formData.badge !== 'none' && (
                    <span className={`product-badge preview badge-${formData.badge}`}>
                      {BADGE_OPTIONS.find(b => b.value === formData.badge)?.label}
                    </span>
                  )}
                </div>
              )}
              <div className="preview-content">
                <h3 className="preview-title">{formData.name || 'Product Name'}</h3>
                <div className="preview-categories">
                  {formData.categories.slice(0, 3).map(cat => (
                    <span key={cat} className="preview-category-tag">{cat}</span>
                  ))}
                  {formData.categories.length > 3 && (
                    <span className="preview-category-tag">+{formData.categories.length - 3}</span>
                  )}
                </div>
                <div className="preview-price">
                  {formData.currentPrice ? (
                    <>
                      <span className="current-price">${parseFloat(formData.currentPrice).toFixed(2)}</span>
                      {formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.currentPrice) && (
                        <span className="original-price">${parseFloat(formData.originalPrice).toFixed(2)}</span>
                      )}
                      {formData.discountPercentage && (
                        <span className="discount-tag">-{parseFloat(formData.discountPercentage).toFixed(0)}%</span>
                      )}
                    </>
                  ) : (
                    <span className="current-price">$0.00</span>
                  )}
                </div>
                {formData.shortDescription && (
                  <p className="preview-description">{formData.shortDescription}</p>
                )}
                <div className="preview-rating">
                  {formData.initialRating > 0 && (
                    <>
                      <span className="rating-stars">
                        {'★'.repeat(Math.floor(formData.initialRating))}
                        {'☆'.repeat(5 - Math.floor(formData.initialRating))}
                      </span>
                      <span className="rating-count">({formData.initialReviewCount || 0})</span>
                    </>
                  )}
                </div>
                <div className="preview-stock">
                  <span className={`stock-status ${formData.stockStatus.toLowerCase().replace(' ', '-')}`}>
                    {formData.stockStatus}
                  </span>
                  <span className="stock-quantity">Qty: {formData.stockQuantity || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage
