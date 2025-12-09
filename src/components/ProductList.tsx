import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { sortProducts, filterProducts } from '../utils/portfolio';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onDuplicateProduct: (product: Product) => void;
}

type SortOption = 'roas' | 'profit' | 'sales' | 'spend' | 'ntb' | 'units';

/**
 * List view of all products with sorting and filtering
 */
export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onUpdateProduct,
  onDeleteProduct,
  onDuplicateProduct 
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('profit');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showOnlyProfitable, setShowOnlyProfitable] = useState(false);

  if (products.length === 0) {
    return null;
  }

  // Apply filtering
  let filtered = products;
  if (showOnlyProfitable) {
    filtered = filterProducts(products, { profitable: true });
  }

  // Apply sorting
  const sorted = sortProducts(filtered, sortBy, sortDirection);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  return (
    <div className="product-list">
      <div className="list-controls">
        <div className="sort-controls">
          <label>Sort by:</label>
          <button 
            onClick={() => toggleSort('profit')}
            className={`sort-btn ${sortBy === 'profit' ? 'active' : ''}`}
          >
            Profit {sortBy === 'profit' && (sortDirection === 'desc' ? '↓' : '↑')}
          </button>
          <button 
            onClick={() => toggleSort('roas')}
            className={`sort-btn ${sortBy === 'roas' ? 'active' : ''}`}
          >
            ROAS {sortBy === 'roas' && (sortDirection === 'desc' ? '↓' : '↑')}
          </button>
          <button 
            onClick={() => toggleSort('sales')}
            className={`sort-btn ${sortBy === 'sales' ? 'active' : ''}`}
          >
            Sales {sortBy === 'sales' && (sortDirection === 'desc' ? '↓' : '↑')}
          </button>
          <button 
            onClick={() => toggleSort('ntb')}
            className={`sort-btn ${sortBy === 'ntb' ? 'active' : ''}`}
          >
            NTB {sortBy === 'ntb' && (sortDirection === 'desc' ? '↓' : '↑')}
          </button>
        </div>

        <div className="filter-controls">
          <label>
            <input
              type="checkbox"
              checked={showOnlyProfitable}
              onChange={(e) => setShowOnlyProfitable(e.target.checked)}
            />
            <span>Show only profitable</span>
          </label>
        </div>
      </div>

      <div className="products-container">
        {sorted.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={onUpdateProduct}
            onDelete={onDeleteProduct}
            onDuplicate={onDuplicateProduct}
          />
        ))}
      </div>

      {filtered.length === 0 && showOnlyProfitable && (
        <div className="no-products-message">
          No profitable products found. Try unchecking the filter.
        </div>
      )}
    </div>
  );
};
