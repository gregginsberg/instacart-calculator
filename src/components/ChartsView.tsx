import React from 'react';
import { UPCMetrics } from '../types';

interface ChartsViewProps {
  upcMetrics: UPCMetrics[];
}

/**
 * Simple visual charts for UPC performance
 * Using pure CSS for simplicity (no chart library needed)
 */
export const ChartsView: React.FC<ChartsViewProps> = ({ upcMetrics }) => {
  if (upcMetrics.length === 0) {
    return (
      <div className="charts-view">
        <h3>📊 Performance Charts</h3>
        <div className="charts-empty">
          <p>Add UPCs to see visual performance charts</p>
        </div>
      </div>
    );
  }

  // Sort copies for each chart
  const sortedByProfit = [...upcMetrics].sort((a, b) => 
    (b.profitAfterAds || 0) - (a.profitAfterAds || 0)
  );
  const sortedByROAS = [...upcMetrics].sort((a, b) => 
    (b.roas || 0) - (a.roas || 0)
  );
  const sortedBySales = [...upcMetrics].sort((a, b) => 
    (b.attributedSales || 0) - (a.attributedSales || 0)
  );

  // Get top 10 for each chart
  const topByProfit = sortedByProfit.slice(0, 10);
  const topByROAS = sortedByROAS.slice(0, 10);
  const topBySales = sortedBySales.slice(0, 10);
  
  // Calculate max values for scaling
  const maxProfit = Math.max(...topByProfit.map(u => Math.abs(u.profitAfterAds || 0)));
  const maxROAS = Math.max(...topByROAS.map(u => u.roas || 0));
  const maxSales = Math.max(...topBySales.map(u => u.attributedSales || 0));

  // Format currency properly
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format currency in compact form for chart labels (e.g., $24K instead of $24,076)
  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${Math.round(value)}`;
    }
  };

  return (
    <div className="charts-view">
      <h3>📊 Performance Charts</h3>
      <p className="charts-description">Top 10 UPCs shown for each metric (independently sorted)</p>

      {/* Profit Chart */}
      <div className="chart-section">
        <h4>Profit by UPC</h4>
        <div className="chart-container">
          {topByProfit.map((upc, index) => {
            const profit = upc.profitAfterAds || 0;
            const width = maxProfit > 0 ? (Math.abs(profit) / maxProfit) * 100 : 0;
            const isNegative = profit < 0;

            return (
              <div key={index} className="chart-row">
                <div className="chart-label" title={upc.productName}>
                  <span className="chart-rank">#{index + 1}</span>
                  <span className="chart-name">{upc.productName?.substring(0, 30) || upc.upcCode}</span>
                </div>
                <div className="chart-bar-container">
                  <div 
                    className={`chart-bar ${isNegative ? 'negative' : 'positive'}`}
                    style={{ width: `${width}%` }}
                  >
                    <span className="chart-value">
                      {formatCompactCurrency(Math.abs(profit))}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROAS Chart */}
      <div className="chart-section">
        <h4>ROAS by UPC</h4>
        <div className="chart-container">
          {topByROAS.map((upc, index) => {
            const roas = upc.roas || 0;
            const width = maxROAS > 0 ? (roas / maxROAS) * 100 : 0;
            const performanceClass = roas >= 3 ? 'excellent' : roas >= 2 ? 'good' : roas >= 1 ? 'fair' : 'poor';

            return (
              <div key={index} className="chart-row">
                <div className="chart-label" title={upc.productName}>
                  <span className="chart-rank">#{index + 1}</span>
                  <span className="chart-name">{upc.productName?.substring(0, 30) || upc.upcCode}</span>
                </div>
                <div className="chart-bar-container">
                  <div 
                    className={`chart-bar roas ${performanceClass}`}
                    style={{ width: `${width}%` }}
                  >
                    <span className="chart-value">
                      {roas.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sales Chart */}
      <div className="chart-section">
        <h4>Sales by UPC</h4>
        <div className="chart-container">
          {topBySales.map((upc, index) => {
            const sales = upc.attributedSales || 0;
            const width = maxSales > 0 ? (sales / maxSales) * 100 : 0;

            return (
              <div key={index} className="chart-row">
                <div className="chart-label" title={upc.productName}>
                  <span className="chart-rank">#{index + 1}</span>
                  <span className="chart-name">{upc.productName?.substring(0, 30) || upc.upcCode}</span>
                </div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar sales"
                    style={{ width: `${width}%` }}
                  >
                    <span className="chart-value">
                      {formatCompactCurrency(sales)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="charts-summary">
        <div className="summary-card">
          <strong>Total UPCs</strong>
          <span>{upcMetrics.length}</span>
        </div>
        <div className="summary-card">
          <strong>Profitable</strong>
          <span className="success">
            {upcMetrics.filter(u => (u.profitAfterAds || 0) > 0).length}
          </span>
        </div>
        <div className="summary-card">
          <strong>Unprofitable</strong>
          <span className="error">
            {upcMetrics.filter(u => (u.profitAfterAds || 0) < 0).length}
          </span>
        </div>
        <div className="summary-card">
          <strong>Avg ROAS</strong>
          <span>
            {(upcMetrics.reduce((sum, u) => sum + (u.roas || 0), 0) / upcMetrics.length).toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  );
};
