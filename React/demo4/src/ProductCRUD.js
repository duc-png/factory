import React, { useState, useEffect } from 'react';
import './ProductCRUD.css';

// Mock API service - Trong thực tế sẽ gọi Spring Boot API
const productService = {
  // GET /api/products
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data - Trong thực tế từ Spring Boot
    return [
      { id: 1, name: 'iPhone 15 Pro', price: 999.99, category: 'Electronics', stock: 50, description: 'Latest iPhone with advanced features' },
      { id: 2, name: 'Samsung Galaxy S24', price: 899.99, category: 'Electronics', stock: 30, description: 'Premium Android smartphone' },
      { id: 3, name: 'MacBook Air M3', price: 1299.99, category: 'Computers', stock: 25, description: 'Lightweight laptop with M3 chip' },
      { id: 4, name: 'AirPods Pro', price: 249.99, category: 'Audio', stock: 100, description: 'Wireless earbuds with noise cancellation' }
    ];
  },

  // POST /api/products
  create: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      ...product, 
      id: Date.now(), // Mock ID generation
      createdAt: new Date().toISOString() 
    };
  },

  // PUT /api/products/{id}
  update: async (id, product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      ...product, 
      id, 
      updatedAt: new Date().toISOString() 
    };
  },

  // DELETE /api/products/{id}
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Product deleted successfully' };
  },

  // GET /api/products/{id}
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = await productService.getAll();
    return products.find(p => p.id === parseInt(id));
  }
};

function ProductCRUD() {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Categories for filter
  const categories = ['Electronics', 'Computers', 'Audio', 'Mobile', 'Accessories'];

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // API Functions
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productData) => {
    try {
      setSubmitting(true);
      const newProduct = await productService.create(productData);
      setProducts(prev => [newProduct, ...prev]);
      setIsModalOpen(false);
      resetForm();
      alert('✅ Product created successfully!');
    } catch (err) {
      setError('Failed to create product: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id, productData) => {
    try {
      setSubmitting(true);
      const updatedProduct = await productService.update(id, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
      alert('✅ Product updated successfully!');
    } catch (err) {
      setError('Failed to update product: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      alert('✅ Product deleted successfully!');
    } catch (err) {
      setError('Failed to delete product: ' + err.message);
    }
  };

  // Form Functions
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      errors.stock = 'Valid stock quantity is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    if (editingProduct) {
      handleUpdate(editingProduct.id, productData);
    } else {
      handleCreate(productData);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      description: product.description
    });
    setEditingProduct(product);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      description: ''
    });
    setFormErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    resetForm();
  };

  // Filter and Search
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Render Functions
  const renderProductCard = (product) => (
    <div key={product.id} className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>
      
      <div className="product-body">
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">${product.price}</span>
          <span className={`product-stock ${product.stock < 10 ? 'low-stock' : ''}`}>
            Stock: {product.stock}
          </span>
        </div>
      </div>
      
      <div className="product-actions">
        <button 
          className="btn btn-edit"
          onClick={() => openEditModal(product)}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn btn-delete"
          onClick={() => handleDelete(product.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );

  const renderModal = () => (
    <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingProduct ? 'Edit Product' : 'Create New Product'}</h2>
          <button className="modal-close" onClick={closeModal}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={formErrors.name ? 'error' : ''}
                placeholder="Enter product name"
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className={formErrors.price ? 'error' : ''}
                placeholder="0.00"
              />
              {formErrors.price && <span className="error-message">{formErrors.price}</span>}
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={formErrors.category ? 'error' : ''}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {formErrors.category && <span className="error-message">{formErrors.category}</span>}
            </div>

            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className={formErrors.stock ? 'error' : ''}
                placeholder="0"
                min="0"
              />
              {formErrors.stock && <span className="error-message">{formErrors.stock}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={formErrors.description ? 'error' : ''}
              placeholder="Enter product description"
              rows="3"
            />
            {formErrors.description && <span className="error-message">{formErrors.description}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={closeModal}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="product-crud-container">
      <div className="crud-header">
        <h2>🛍️ Product Management System</h2>
        <p>Complete CRUD operations with React Frontend + Spring Boot Backend</p>
      </div>

      {/* Controls */}
      <div className="crud-controls">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-create" onClick={openCreateModal}>
          ➕ Add New Product
        </button>
      </div>

      {/* Stats */}
      <div className="crud-stats">
        <div className="stat-card">
          <span className="stat-number">{products.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{filteredProducts.length}</span>
          <span className="stat-label">Filtered Results</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{products.filter(p => p.stock < 10).length}</span>
          <span className="stat-label">Low Stock</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          ❌ {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        /* Product Grid */
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters, or create a new product.</p>
              <button className="btn btn-primary" onClick={openCreateModal}>
                Create First Product
              </button>
            </div>
          ) : (
            filteredProducts.map(renderProductCard)
          )}
        </div>
      )}

      {/* Modal */}
      {renderModal()}

      {/* API Info */}
      <div className="api-info">
        <details>
          <summary>🔧 API Endpoints (Spring Boot)</summary>
          <div className="api-list">
            <div><strong>GET</strong> /api/products - Get all products</div>
            <div><strong>GET</strong> /api/products/{'{id}'} - Get product by ID</div>
            <div><strong>POST</strong> /api/products - Create new product</div>
            <div><strong>PUT</strong> /api/products/{'{id}'} - Update product</div>
            <div><strong>DELETE</strong> /api/products/{'{id}'} - Delete product</div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default ProductCRUD;
