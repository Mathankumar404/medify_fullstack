import React, { useState, useEffect, useCallback } from 'react';
import { productAPI } from './services/api';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import DeleteConfirmation from './components/DeleteConfirmation';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import { Plus, Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, showToast, hideToast } = useToast();

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (error) {
      showToast('Failed to load products', 'error');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Search products
  const searchProducts = useCallback(async (query) => {
    try {
      setLoading(true);
      const data = query.trim() 
        ? await productAPI.searchProducts(query)
        : await productAPI.getAllProducts();
        
      setProducts(data);

    } catch (error) {
      showToast('Failed to search products', 'error');
      console.error('Error searching products:', error)
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle form submission
  const handleFormSubmit = async (productData) => {
    try {
      setActionLoading(true);
      
      if (editingProduct) {
        const updatedProduct = await productAPI.updateProduct(editingProduct.id, productData);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
        showToast('Product updated successfully!', 'success');
      } else {
        const newProduct = await productAPI.createProduct(productData);
        setProducts(prev => [newProduct, ...prev]);
        showToast('Product created successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save product';
      showToast(message, 'error');
      console.error('Error saving product:', error);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      setActionLoading(true);
      await productAPI.deleteProduct(deletingProduct.id);
      setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
      showToast('Product deleted successfully!', 'success');
      setDeletingProduct(null);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product';
      showToast(message, 'error');
      console.error('Error deleting product:', error);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    searchProducts(query);
  }, [searchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Product Manager</h1>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <EmptyState 
            type={searchQuery ? 'no-results' : 'no-products'}
            searchQuery={searchQuery}
            onAddProduct={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setShowForm(true);
                }}
                onDelete={setDeletingProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          isLoading={actionLoading}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmation
          product={deletingProduct}
          onConfirm={handleDelete}
          onCancel={() => setDeletingProduct(null)}
          isLoading={actionLoading}
        />
      )}

      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default App;