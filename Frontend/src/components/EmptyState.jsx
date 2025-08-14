import React from 'react';
import { Package, Search } from 'lucide-react';

const EmptyState = ({ type, searchQuery, onAddProduct }) => {
  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Search className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-sm">
          No products match your search for "{searchQuery}". Try adjusting your search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        Get started by adding your first product to the inventory.
      </p>
      {onAddProduct && (
        <button
          onClick={onAddProduct}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Your First Product
        </button>
      )}
    </div>
  );
};

export default EmptyState;