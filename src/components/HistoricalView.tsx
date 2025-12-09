import React, { useState } from 'react';
import { Product, ProductSnapshot } from '../types';
import { SnapshotManager } from './SnapshotManager';
import { TrendChart } from './TrendChart';
import { identifyTrends, getProductSnapshots } from '../utils/historical';

interface HistoricalViewProps {
  products: Product[];
  snapshots: ProductSnapshot[];
  onAddSnapshot: (snapshot: ProductSnapshot) => void;
  onDeleteSnapshot: (snapshotId: string) => void;
}

/**
 * Main historical tracking and trends view
 */
export const HistoricalView: React.FC<HistoricalViewProps> = ({
  products,
  snapshots,
  onAddSnapshot,
  onDeleteSnapshot,
}) => {
  const [selectedTab, setSelectedTab] = useState<'snapshots' | 'trends' | 'insights'>('snapshots');
  const [selectedProductId, setSelectedProductId] = useState<string>('all');

  // Get product-specific snapshots for trends
  const displaySnapshots = selectedProductId === 'all' 
    ? snapshots 
    : getProductSnapshots(snapshots, selectedProductId);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Calculate trend insights for all products
  const productInsights = products.map(product => {
    const productSnapshots = getProductSnapshots(snapshots, product.id);
    if (productSnapshots.length < 2) {
      return {
        product,
        trend: 'stable' as const,
        roasTrend: 0,
        profitTrend: 0,
        snapshotCount: productSnapshots.length,
      };
    }
    
    const trends = identifyTrends(snapshots, product.id);
    return {
      product,
      ...trends,
      snapshotCount: productSnapshots.length,
    };
  }).filter(insight => insight.snapshotCount > 0);

  return (
    <div className="historical-view">
      <div className="historical-header">
        <h2>📊 Historical Tracking & Trends</h2>
        <div className="view-tabs">
          <button
            onClick={() => setSelectedTab('snapshots')}
            className={`tab-btn ${selectedTab === 'snapshots' ? 'active' : ''}`}
          >
            📸 Snapshots
          </button>
          <button
            onClick={() => setSelectedTab('trends')}
            className={`tab-btn ${selectedTab === 'trends' ? 'active' : ''}`}
          >
            📈 Trends
          </button>
          <button
            onClick={() => setSelectedTab('insights')}
            className={`tab-btn ${selectedTab === 'insights' ? 'active' : ''}`}
          >
            💡 Insights
          </button>
        </div>
      </div>

      {selectedTab === 'snapshots' && (
        <SnapshotManager
          products={products}
          snapshots={snapshots}
          onAddSnapshot={onAddSnapshot}
          onDeleteSnapshot={onDeleteSnapshot}
        />
      )}

      {selectedTab === 'trends' && (
        <div className="trends-view">
          {snapshots.length > 0 && (
            <div className="product-filter">
              <label>View trends for:</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="product-select"
              >
                <option value="all">All Products Combined</option>
                {products.filter(p => {
                  const snaps = getProductSnapshots(snapshots, p.id);
                  return snaps.length > 0;
                }).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <TrendChart
            snapshots={displaySnapshots}
            productId={selectedProductId === 'all' ? undefined : selectedProductId}
            productName={selectedProduct?.name}
          />
        </div>
      )}

      {selectedTab === 'insights' && (
        <div className="insights-view">
          <h3>🔍 Product Performance Insights</h3>
          
          {productInsights.length === 0 ? (
            <div className="no-insights">
              <p>Create at least 2 snapshots per product to see trend insights.</p>
            </div>
          ) : (
            <div className="insights-grid">
              {productInsights.map(insight => (
                <div key={insight.product.id} className={`insight-card trend-${insight.trend}`}>
                  <h4>{insight.product.name}</h4>
                  
                  <div className="insight-badge">
                    {insight.trend === 'improving' && (
                      <span className="badge improving">📈 Improving</span>
                    )}
                    {insight.trend === 'declining' && (
                      <span className="badge declining">📉 Declining</span>
                    )}
                    {insight.trend === 'stable' && (
                      <span className="badge stable">➡️ Stable</span>
                    )}
                  </div>

                  <div className="insight-details">
                    <div className="detail-row">
                      <span className="detail-label">ROAS Trend:</span>
                      <span className={`detail-value ${insight.roasTrend > 0 ? 'positive' : insight.roasTrend < 0 ? 'negative' : ''}`}>
                        {insight.roasTrend > 0 ? '↗' : insight.roasTrend < 0 ? '↘' : '→'}
                        {' '}{Math.abs(insight.roasTrend).toFixed(3)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Profit Trend:</span>
                      <span className={`detail-value ${insight.profitTrend > 0 ? 'positive' : insight.profitTrend < 0 ? 'negative' : ''}`}>
                        {insight.profitTrend > 0 ? '↗' : insight.profitTrend < 0 ? '↘' : '→'}
                        {' '}{Math.abs(insight.profitTrend).toFixed(0)}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Data Points:</span>
                      <span className="detail-value">{insight.snapshotCount} snapshots</span>
                    </div>
                  </div>

                  <div className="insight-recommendation">
                    {insight.trend === 'improving' && (
                      <p>✅ Performance improving. Consider scaling budget.</p>
                    )}
                    {insight.trend === 'declining' && (
                      <p>⚠️ Performance declining. Review campaigns and optimize.</p>
                    )}
                    {insight.trend === 'stable' && (
                      <p>ℹ️ Performance stable. Maintain current strategy.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {productInsights.length > 0 && (
            <div className="insights-summary">
              <h4>Summary</h4>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-number improving">
                    {productInsights.filter(i => i.trend === 'improving').length}
                  </span>
                  <span className="stat-label">Improving</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number stable">
                    {productInsights.filter(i => i.trend === 'stable').length}
                  </span>
                  <span className="stat-label">Stable</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number declining">
                    {productInsights.filter(i => i.trend === 'declining').length}
                  </span>
                  <span className="stat-label">Declining</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
