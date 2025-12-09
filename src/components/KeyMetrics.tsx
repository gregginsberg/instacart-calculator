import React from 'react';
import { CalculatedMetrics } from '../types';
import { formatCurrency, formatPercent, formatRatio } from '../utils/formatting';
import { MetricDisplay } from './MetricDisplay';

interface KeyMetricsProps {
  metrics: CalculatedMetrics;
}

/**
 * Grid display of all key calculated metrics with descriptions
 */
export const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics }) => {
  return (
    <div className="key-metrics">
      <h3>Key Metrics</h3>
      
      <div className="metrics-grid">
        <MetricDisplay
          label="Investment Rate"
          value={formatPercent(metrics.investmentRate)}
          description="Ad spend as % of attributed sales (lower is better)"
        />
        
        <MetricDisplay
          label="Gross Margin $"
          value={formatCurrency(metrics.grossMarginDollars)}
          description="Total margin dollars generated from attributed sales"
        />
        
        <MetricDisplay
          label="Margin per $1 Ad Spend"
          value={formatRatio(metrics.marginPerDollarSpend)}
          description="Margin returned for each dollar spent on ads (>1.0 = profitable)"
        />
        
        <MetricDisplay
          label="Actual ROAS"
          value={formatRatio(metrics.roas)}
          description="Return on ad spend: sales ÷ ad spend"
        />
        
        <MetricDisplay
          label="Breakeven ROAS"
          value={formatRatio(metrics.breakevenROAS)}
          description="ROAS needed to break even given your margins"
        />
        
        <MetricDisplay
          label="Effective Margin %"
          value={formatPercent(metrics.effectiveMarginPercent)}
          description="Gross margin after other costs"
        />
      </div>
    </div>
  );
};
