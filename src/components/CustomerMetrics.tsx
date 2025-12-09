import React from 'react';
import { CalculatedMetrics, CalculatorInputs } from '../types';
import { formatCurrency, formatPercent } from '../utils/formatting';
import { MetricDisplay } from './MetricDisplay';

interface CustomerMetricsProps {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
}

/**
 * Displays customer acquisition and NTB metrics
 */
export const CustomerMetrics: React.FC<CustomerMetricsProps> = ({ inputs, metrics }) => {
  // Only show if we have NTB data
  if (metrics.ntbSales === null) {
    return null;
  }

  const ntbPercent = inputs.ntbPercent !== null 
    ? (inputs.ntbPercent > 1 ? inputs.ntbPercent / 100 : inputs.ntbPercent)
    : null;

  return (
    <div className="customer-metrics">
      <h3>👥 Customer Acquisition Analysis</h3>
      
      <div className="metrics-grid">
        <MetricDisplay
          label="New to Brand (NTB) %"
          value={formatPercent(ntbPercent)}
          description="Percentage of sales from first-time customers"
        />
        
        <MetricDisplay
          label="Repeat Customer %"
          value={formatPercent(metrics.repeatCustomerPercent)}
          description="Percentage of sales from existing customers"
        />
        
        <MetricDisplay
          label="NTB Sales"
          value={formatCurrency(metrics.ntbSales)}
          description="Dollar sales from new customers"
        />
        
        <MetricDisplay
          label="Repeat Sales"
          value={formatCurrency(metrics.repeatSales)}
          description="Dollar sales from existing customers"
        />

        {metrics.cac !== null && (
          <MetricDisplay
            label="Customer Acquisition Cost (CAC)"
            value={formatCurrency(metrics.cac)}
            description="Total ad spend allocated to acquiring new customers (Ad Spend × NTB%)"
          />
        )}
      </div>

      {/* NTB vs Repeat Visualization */}
      <div className="customer-split">
        <h4>Sales Split: New vs Repeat Customers</h4>
        <div className="split-visual">
          <div className="split-bar">
            {ntbPercent !== null && ntbPercent > 0 && (
              <div 
                className="split-segment split-ntb" 
                style={{ width: `${ntbPercent * 100}%` }}
                title={`NTB: ${formatPercent(ntbPercent)}`}
              >
                <span className="split-label">
                  {ntbPercent > 0.15 ? `New ${formatPercent(ntbPercent)}` : ''}
                </span>
              </div>
            )}
            {metrics.repeatCustomerPercent !== null && metrics.repeatCustomerPercent > 0 && (
              <div 
                className="split-segment split-repeat" 
                style={{ width: `${metrics.repeatCustomerPercent * 100}%` }}
                title={`Repeat: ${formatPercent(metrics.repeatCustomerPercent)}`}
              >
                <span className="split-label">
                  {metrics.repeatCustomerPercent > 0.15 ? `Repeat ${formatPercent(metrics.repeatCustomerPercent)}` : ''}
                </span>
              </div>
            )}
          </div>
          
          <div className="split-legend">
            <div className="legend-item">
              <span className="legend-dot dot-ntb"></span>
              <span>New to Brand ({formatCurrency(metrics.ntbSales)})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot dot-repeat"></span>
              <span>Repeat Customers ({formatCurrency(metrics.repeatSales)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      {ntbPercent !== null && (
        <div className="customer-insights">
          {ntbPercent > 0.4 && (
            <div className="insight success">
              ✅ <strong>Strong New Customer Acquisition:</strong> {formatPercent(ntbPercent)} of sales are from new customers, indicating effective trial-driving.
            </div>
          )}
          {ntbPercent >= 0.2 && ntbPercent <= 0.4 && (
            <div className="insight info">
              📊 <strong>Balanced Mix:</strong> You're driving both trial ({formatPercent(ntbPercent)} NTB) and repeat purchases ({formatPercent(metrics.repeatCustomerPercent)}).
            </div>
          )}
          {ntbPercent < 0.2 && (
            <div className="insight warning">
              ⚠️ <strong>Low New Customer Acquisition:</strong> Only {formatPercent(ntbPercent)} of sales are from new customers. Consider expanding targeting to drive more trial.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
