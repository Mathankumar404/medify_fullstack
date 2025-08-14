import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
  message: error.message,
  url: error.config?.url,
  method: error.config?.method,
  data: error.response?.data,
  status: error.response?.status,
});
    return Promise.reject(error);
  }
);

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data.data || [];
  },

  // Get single product
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    if (!response.data.data) {
      throw new Error('Product not found');
    }
    return response.data.data;
  },

  // Create product
  createProduct: async (product) => {
    const response = await api.post('/products', product);
    if (!response.data.data) {
      throw new Error('Failed to create product');
    }
    return response.data.data;
  },

  // Update product
  updateProduct: async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    if (!response.data.data) {
      throw new Error('Failed to update product');
    }
    return response.data.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
  },

  // Search products
  searchProducts: async (query) => {
  const response = await api.get('/api/products/search', { params: { q: query } });
  return response.data.data || [];
}
};

export default api;