import React from 'react';
import { PortfolioMetrics } from '../types';
import { formatCurrency, formatRatio, formatPercent } from '../utils/formatting';

interface PortfolioSummaryProps {
  metrics: PortfolioMetrics;
}

/**
 * Displays portfolio-level aggregated metrics
 */
export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ metrics }) => {
  if (metrics.productCount === 0) {
    return null;
  }

  return (
    <div className="portfolio-summary">
      <h3>📊 Portfolio Summary ({metrics.productCount} Products)</h3>
      
      <div className="portfolio-grid">
        <div className="portfolio-card portfolio-main">
          <div className="card-label">Total Ad Spend</div>
          <div className="card-value">{formatCurrency(metrics.totalAdSpend)}</div>
        </div>

        <div className="portfolio-card portfolio-main">
          <div className="card-label">Total Sales</div>
          <div className="card-value">{formatCurrency(metrics.totalAttributedSales)}</div>
        </div>

        <div className="portfolio-card portfolio-highlight">
          <div className="card-label">Portfolio ROAS</div>
          <div className="card-value">{formatRatio(metrics.portfolioROAS)}</div>
        </div>

        <div className="portfolio-card portfolio-highlight">
          <div className="card-label">Total Profit</div>
          <div className={`card-value ${metrics.totalProfit >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(metrics.totalProfit)}
          </div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Margin %</div>
          <div className="card-value">{formatPercent(metrics.portfolioMarginPercent)}</div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Avg CPC</div>
          <div className="card-value">{formatCurrency(metrics.averageCPC)}</div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Avg AOV</div>
          <div className="card-value">{formatCurrency(metrics.averageAOV)}</div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Portfolio NTB %</div>
          <div className="card-value">{formatPercent(metrics.weightedNTBPercent)}</div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Total Units</div>
          <div className="card-value">{metrics.totalUnits.toLocaleString()}</div>
        </div>

        <div className="portfolio-card">
          <div className="card-label">Total Orders</div>
          <div className="card-value">{metrics.totalOrders.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
