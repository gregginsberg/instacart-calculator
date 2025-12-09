import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency, formatRatio, formatPercent } from '../utils/formatting';

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: string) => void;
  onDuplicate: (product: Product) => void;
}

/**
 * Card displaying individual product metrics with edit capability
 */
export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onUpdate, 
  onDelete,
  onDuplicate 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(product.name);

  const metrics = product.metrics;
  const inputs = product.inputs;

  const handleSaveName = () => {
    onUpdate({ ...product, name: editName });
    setIsEditing(false);
  };

  const getProfitStatus = () => {
    const profit = metrics.profitAfterAds || 0;
    if (profit > 0) return 'profitable';
    if (profit === 0) return 'breakeven';
    return 'unprofitable';
  };

  const status = getProfitStatus();

  return (
    <div className={`product-card ${status}`}>
      <div className="product-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="product-title">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              onClick={(e) => e.stopPropagation()}
              className="product-name-input"
              autoFocus
            />
          ) : (
            <h4 onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
              {product.name}
            </h4>
          )}
          <span className={`product-status-badge ${status}`}>
            {status === 'profitable' && '✓ Profitable'}
            {status === 'breakeven' && '− Breakeven'}
            {status === 'unprofitable' && '✗ Unprofitable'}
          </span>
        </div>

        <div className="product-actions">
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate(product); }}
            className="btn-icon"
            title="Duplicate"
          >
            📋
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
            className="btn-icon btn-delete"
            title="Delete"
          >
            🗑️
          </button>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      <div className="product-summary">
        <div className="summary-metric">
          <span className="metric-label">ROAS</span>
          <span className="metric-value">{formatRatio(metrics.roas)}</span>
        </div>
        <div className="summary-metric">
          <span className="metric-label">Profit</span>
          <span className={`metric-value ${(metrics.profitAfterAds || 0) >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(metrics.profitAfterAds)}
          </span>
        </div>
        <div className="summary-metric">
          <span className="metric-label">Sales</span>
          <span className="metric-value">{formatCurrency(inputs.attributedSales)}</span>
        </div>
        <div className="summary-metric">
          <span className="metric-label">Spend</span>
          <span className="metric-value">{formatCurrency(inputs.adSpend)}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="product-details">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Units Sold</span>
              <span className="detail-value">{inputs.unitsSold || '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CPC</span>
              <span className="detail-value">{formatCurrency(metrics.cpc)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CTR</span>
              <span className="detail-value">{formatPercent(metrics.ctr)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">AOV</span>
              <span className="detail-value">{formatCurrency(metrics.aov)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">NTB %</span>
              <span className="detail-value">
                {inputs.ntbPercent !== null ? formatPercent(inputs.ntbPercent > 1 ? inputs.ntbPercent / 100 : inputs.ntbPercent) : '—'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Margin %</span>
              <span className="detail-value">{formatPercent(metrics.marginAfterAdsPercent)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CPO</span>
              <span className="detail-value">{formatCurrency(metrics.cpo)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
