// productService.js - Real API service for Spring Boot connection

const API_BASE_URL = 'http://localhost:8080/api/products';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  return result.data; // Extract data from ApiResponse wrapper
};

// Helper function to handle API errors
const handleError = (error) => {
  console.error('API Error:', error);
  throw new Error(error.message || 'An unexpected error occurred');
};

export const productService = {
  // GET /api/products - Get all products
  getAll: async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // GET /api/products/{id} - Get product by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // POST /api/products - Create new product
  create: async (product) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // PUT /api/products/{id} - Update product
  update: async (id, product) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // DELETE /api/products/{id} - Delete product
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // GET /api/products/search?keyword= - Search products
  search: async (keyword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // GET /api/products/category/{category} - Get products by category
  getByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/category/${encodeURIComponent(category)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // GET /api/products/low-stock?threshold= - Get low stock products
  getLowStock: async (threshold = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/low-stock?threshold=${threshold}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// Export for use in components
export default productService;

// Usage example in component:
/*
import productService from './services/productService';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCreate = async (productData) => {
    try {
      const newProduct = await productService.create(productData);
      setProducts(prev => [newProduct, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ... rest of component
};
*/
