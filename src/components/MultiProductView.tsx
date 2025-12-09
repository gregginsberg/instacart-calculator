import React from 'react';
import { Product, CalculatorInputs } from '../types';
import { calculateAllMetrics } from '../utils/calculations';
import { calculatePortfolioMetrics } from '../utils/portfolio';
import { PortfolioSummary } from './PortfolioSummary';
import { ProductList } from './ProductList';

interface MultiProductViewProps {
  products: Product[];
  currentInputs: CalculatorInputs;
  onAddProduct: () => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onDuplicateProduct: (product: Product) => void;
  onSwitchToProduct: (productId: string) => void;
}

/**
 * Main multi-product portfolio management view
 */
export const MultiProductView: React.FC<MultiProductViewProps> = ({
  products,
  currentInputs,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onSwitchToProduct,
}) => {
  const portfolioMetrics = calculatePortfolioMetrics(products);

  return (
    <div className="multi-product-view">
      <div className="multi-product-header">
        <h2>📦 Product Portfolio</h2>
        <button onClick={onAddProduct} className="btn-add-product">
          + Add Current Product to Portfolio
        </button>
      </div>

      <PortfolioSummary metrics={portfolioMetrics} />

      {products.length > 0 && (
        <>
          <div className="portfolio-insights">
            <h4>Portfolio Insights</h4>
            <div className="insights-grid">
              {portfolioMetrics.portfolioROAS !== null && portfolioMetrics.portfolioROAS > 3 && (
                <div className="insight success">
                  ✅ <strong>Strong Portfolio ROAS:</strong> {portfolioMetrics.portfolioROAS.toFixed(2)}x indicates efficient overall performance.
                </div>
              )}
              {portfolioMetrics.totalProfit > 0 && (
                <div className="insight success">
                  💰 <strong>Profitable Portfolio:</strong> Total profit of ${portfolioMetrics.totalProfit.toLocaleString()} across {portfolioMetrics.productCount} products.
                </div>
              )}
              {portfolioMetrics.totalProfit < 0 && (
                <div className="insight warning">
                  ⚠️ <strong>Portfolio Losing Money:</strong> Consider pausing underperforming products or optimizing campaigns.
                </div>
              )}
              {portfolioMetrics.weightedNTBPercent !== null && portfolioMetrics.weightedNTBPercent < 0.2 && (
                <div className="insight info">
                  📊 <strong>Low New Customer Acquisition:</strong> Only {(portfolioMetrics.weightedNTBPercent * 100).toFixed(1)}% NTB across portfolio. Consider expanding targeting.
                </div>
              )}
            </div>
          </div>

          <ProductList
            products={products}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onDuplicateProduct={onDuplicateProduct}
          />
        </>
      )}

      {products.length === 0 && (
        <div className="empty-portfolio">
          <div className="empty-icon">📦</div>
          <h3>No Products in Portfolio</h3>
          <p>Add your first product by entering data in the left panel and clicking "Add Current Product to Portfolio"</p>
        </div>
      )}
    </div>
  );
};
