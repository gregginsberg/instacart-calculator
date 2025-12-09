import React from 'react';
import { CalculatedMetrics, CalculatorInputs } from '../types';
import { formatCurrency, formatPercent } from '../utils/formatting';

interface CostBreakdownProps {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
}

/**
 * Displays a detailed breakdown of all costs
 */
export const CostBreakdown: React.FC<CostBreakdownProps> = ({ inputs, metrics }) => {
  const adSpend = inputs.adSpend || 0;
  const promo = inputs.promoCosts || 0;
  const totalCosts = metrics.totalCosts || 0;
  const attributedSales = inputs.attributedSales || 0;

  // Calculate COGS (Cost of Goods Sold) from margin
  const grossMargin = metrics.grossMarginDollars || 0;
  const cogs = attributedSales - grossMargin;

  // Calculate percentages of sales
  const adSpendPercent = attributedSales > 0 ? adSpend / attributedSales : 0;
  const promoPercent = attributedSales > 0 ? promo / attributedSales : 0;
  const cogsPercent = attributedSales > 0 ? cogs / attributedSales : 0;

  return (
    <div className="cost-breakdown">
      <h3>Cost Breakdown</h3>
      
      <div className="breakdown-summary">
        <div className="breakdown-item breakdown-header">
          <span>Cost Type</span>
          <span>Amount</span>
          <span>% of Sales</span>
        </div>

        <div className="breakdown-item">
          <span className="cost-label">Cost of Goods Sold (COGS)</span>
          <span className="cost-value">{formatCurrency(cogs)}</span>
          <span className="cost-percent">{formatPercent(cogsPercent)}</span>
        </div>

        <div className="breakdown-item breakdown-highlight">
          <span className="cost-label">Ad Spend</span>
          <span className="cost-value">{formatCurrency(adSpend)}</span>
          <span className="cost-percent">{formatPercent(adSpendPercent)}</span>
        </div>

        {promo > 0 && (
          <div className="breakdown-item">
            <span className="cost-label">Promo / Redemption Costs</span>
            <span className="cost-value">{formatCurrency(promo)}</span>
            <span className="cost-percent">{formatPercent(promoPercent)}</span>
          </div>
        )}

        <div className="breakdown-item breakdown-total">
          <span className="cost-label"><strong>Total Marketing Costs</strong></span>
          <span className="cost-value"><strong>{formatCurrency(totalCosts)}</strong></span>
          <span className="cost-percent"><strong>{formatPercent(totalCosts / (attributedSales || 1))}</strong></span>
        </div>

        <div className="breakdown-item breakdown-profit">
          <span className="cost-label"><strong>Net Profit</strong></span>
          <span className="cost-value profit-value"><strong>{formatCurrency(metrics.netProfit)}</strong></span>
          <span className="cost-percent">{formatPercent((metrics.netProfit || 0) / (attributedSales || 1))}</span>
        </div>
      </div>

      <div className="breakdown-visual">
        <div className="breakdown-bar">
          {cogsPercent > 0 && (
            <div 
              className="bar-segment bar-cogs" 
              style={{ width: `${cogsPercent * 100}%` }}
              title={`COGS: ${formatPercent(cogsPercent)}`}
            />
          )}
          {adSpendPercent > 0 && (
            <div 
              className="bar-segment bar-ads" 
              style={{ width: `${adSpendPercent * 100}%` }}
              title={`Ad Spend: ${formatPercent(adSpendPercent)}`}
            />
          )}
          {promoPercent > 0 && (
            <div 
              className="bar-segment bar-promo" 
              style={{ width: `${promoPercent * 100}%` }}
              title={`Promo: ${formatPercent(promoPercent)}`}
            />
          )}
        </div>
        <div className="breakdown-legend">
          <span className="legend-item"><span className="legend-dot dot-cogs"></span> COGS</span>
          <span className="legend-item"><span className="legend-dot dot-ads"></span> Ad Spend</span>
          {promo > 0 && <span className="legend-item"><span className="legend-dot dot-promo"></span> Promo</span>}
        </div>
      </div>
    </div>
  );
};
