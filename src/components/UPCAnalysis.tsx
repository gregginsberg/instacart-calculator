import React, { useState } from 'react';
import { UPCMetrics } from '../types';
import { sortUPCs, aggregateUPCData } from '../utils/upc';
import { formatCurrency, formatPercent, formatRatio } from '../utils/formatting';

interface UPCAnalysisProps {
  upcMetrics: UPCMetrics[];
}

type SortOption = 'roas' | 'profit' | 'sales' | 'units' | 'margin';

/**
 * Component displaying calculated UPC-level metrics and analysis
 */
export const UPCAnalysis: React.FC<UPCAnalysisProps> = ({ upcMetrics }) => {
  const [sortBy, setSortBy] = useState<SortOption>('profit');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (upcMetrics.length === 0) {
    return null;
  }

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  const sorted = sortUPCs(upcMetrics, sortBy, sortDirection);
  const totals = aggregateUPCData(upcMetrics);
  const portfolioROAS = totals.totalAdSpend > 0 ? totals.totalAttributedSales / totals.totalAdSpend : null;
  const portfolioMargin = totals.totalAttributedSales > 0 ? totals.totalProfit / totals.totalAttributedSales : null;

  return (
    <div className="upc-analysis">
      <div className="analysis-header">
        <h3>📈 UPC Performance Analysis</h3>
        <div className="upc-summary-cards">
          <div className="summary-card">
            <div className="card-label">{upcMetrics.length} UPCs</div>
            <div className="card-value">{totals.totalUnits.toLocaleString()} units</div>
          </div>
          <div className="summary-card highlight">
            <div className="card-label">Portfolio ROAS</div>
            <div className="card-value">{formatRatio(portfolioROAS)}</div>
          </div>
          <div className="summary-card highlight">
            <div className="card-label">Total Profit</div>
            <div className={`card-value ${totals.totalProfit >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(totals.totalProfit)}
            </div>
          </div>
          <div className="summary-card">
            <div className="card-label">Margin %</div>
            <div className="card-value">{formatPercent(portfolioMargin)}</div>
          </div>
        </div>
      </div>

      <div className="analysis-controls">
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
          onClick={() => toggleSort('units')}
          className={`sort-btn ${sortBy === 'units' ? 'active' : ''}`}
        >
          Units {sortBy === 'units' && (sortDirection === 'desc' ? '↓' : '↑')}
        </button>
        <button 
          onClick={() => toggleSort('margin')}
          className={`sort-btn ${sortBy === 'margin' ? 'active' : ''}`}
        >
          Margin% {sortBy === 'margin' && (sortDirection === 'desc' ? '↓' : '↑')}
        </button>
      </div>

      <div className="upc-results-table">
        <table>
          <thead>
            <tr>
              <th>UPC / Product</th>
              <th>Units</th>
              <th>Sales</th>
              <th>Spend</th>
              <th>ROAS</th>
              <th>Profit</th>
              <th>Margin %</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(upc => (
              <React.Fragment key={upc.id}>
                <tr 
                  className={`upc-row ${(upc.profitAfterAds || 0) < 0 ? 'unprofitable' : 'profitable'}`}
                  onClick={() => setExpandedId(expandedId === upc.id ? null : upc.id)}
                >
                  <td className="upc-info">
                    <div className="upc-code">{upc.upcCode}</div>
                    <div className="product-name">{upc.productName}</div>
                  </td>
                  <td>{upc.unitsSold.toLocaleString()}</td>
                  <td>{formatCurrency(upc.attributedSales)}</td>
                  <td>{formatCurrency(upc.adSpend)}</td>
                  <td className="roas-cell">{formatRatio(upc.roas)}</td>
                  <td className={`profit-cell ${(upc.profitAfterAds || 0) >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(upc.profitAfterAds)}
                  </td>
                  <td>{formatPercent(upc.marginPercent)}</td>
                  <td className="expand-cell">
                    {expandedId === upc.id ? '▼' : '▶'}
                  </td>
                </tr>
                {expandedId === upc.id && (
                  <tr className="upc-details-row">
                    <td colSpan={8}>
                      <div className="upc-details">
                        <div className="details-grid">
                          <div className="detail-group">
                            <h5>Per Unit Economics</h5>
                            <div className="detail-item">
                              <span>Revenue per Unit:</span>
                              <span>{formatCurrency(upc.revenuePerUnit)}</span>
                            </div>
                            <div className="detail-item">
                              <span>Ad Cost per Unit:</span>
                              <span>{formatCurrency(upc.costPerUnit)}</span>
                            </div>
                            <div className="detail-item">
                              <span>Profit per Unit:</span>
                              <span className={(upc.profitPerUnit || 0) >= 0 ? 'positive' : 'negative'}>
                                {formatCurrency(upc.profitPerUnit)}
                              </span>
                            </div>
                          </div>
                          <div className="detail-group">
                            <h5>Margin Breakdown</h5>
                            <div className="detail-item">
                              <span>Gross Margin $:</span>
                              <span>{formatCurrency(upc.grossMarginDollars)}</span>
                            </div>
                            <div className="detail-item">
                              <span>Instacart Fees:</span>
                              <span>{formatCurrency(upc.instacartCommissionDollars)}</span>
                            </div>
                            <div className="detail-item">
                              <span>Ad Spend:</span>
                              <span>{formatCurrency(upc.adSpend)}</span>
                            </div>
                          </div>
                          <div className="detail-group">
                            <h5>Performance Metrics</h5>
                            <div className="detail-item">
                              <span>Contribution to Sales:</span>
                              <span>
                                {((upc.attributedSales / totals.totalAttributedSales) * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="detail-item">
                              <span>Contribution to Profit:</span>
                              <span>
                                {totals.totalProfit !== 0 
                                  ? `${(((upc.profitAfterAds || 0) / totals.totalProfit) * 100).toFixed(1)}%`
                                  : '—'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td><strong>TOTAL</strong></td>
              <td><strong>{totals.totalUnits.toLocaleString()}</strong></td>
              <td><strong>{formatCurrency(totals.totalAttributedSales)}</strong></td>
              <td><strong>{formatCurrency(totals.totalAdSpend)}</strong></td>
              <td><strong>{formatRatio(portfolioROAS)}</strong></td>
              <td className={totals.totalProfit >= 0 ? 'positive' : 'negative'}>
                <strong>{formatCurrency(totals.totalProfit)}</strong>
              </td>
              <td><strong>{formatPercent(portfolioMargin)}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="upc-insights">
        <h4>💡 Insights</h4>
        <div className="insights-grid">
          {sorted.some(upc => (upc.profitAfterAds || 0) < 0) && (
            <div className="insight warning">
              ⚠️ <strong>Unprofitable UPCs Detected:</strong>{' '}
              {sorted.filter(upc => (upc.profitAfterAds || 0) < 0).length} UPCs are losing money. 
              Consider pausing or optimizing these products.
            </div>
          )}
          {sorted[0] && (sorted[0].profitAfterAds || 0) / totals.totalProfit > 0.5 && (
            <div className="insight info">
              📊 <strong>Top Performer Dominance:</strong> {sorted[0].productName} drives {' '}
              {(((sorted[0].profitAfterAds || 0) / totals.totalProfit) * 100).toFixed(0)}% of total profit.
              Consider scaling this UPC.
            </div>
          )}
          {portfolioROAS && portfolioROAS > 3 && (
            <div className="insight success">
              ✅ <strong>Strong Portfolio ROAS:</strong> {portfolioROAS.toFixed(2)}x across all UPCs indicates 
              efficient campaign performance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
