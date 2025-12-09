import React from 'react';
import { CalculatedMetrics } from '../types';
import { formatCurrency } from '../utils/formatting';
import { MetricDisplay } from './MetricDisplay';

interface UnitMetricsProps {
  metrics: CalculatedMetrics;
}

/**
 * Displays unit-level metrics when units sold is provided
 */
export const UnitMetrics: React.FC<UnitMetricsProps> = ({ metrics }) => {
  // Only show this section if we have unit-level data
  if (metrics.costPerUnit === null) {
    return null;
  }

  return (
    <div className="unit-metrics">
      <h3>Unit-Level Analysis</h3>
      
      <div className="metrics-grid">
        <MetricDisplay
          label="Cost Per Unit (CPU)"
          value={formatCurrency(metrics.costPerUnit)}
          description="Ad spend required to sell one unit"
        />
        
        <MetricDisplay
          label="Revenue Per Unit"
          value={formatCurrency(metrics.revenuePerUnit)}
          description="Average selling price per unit"
        />
        
        <MetricDisplay
          label="Margin Per Unit"
          value={formatCurrency(metrics.marginPerUnit)}
          description="Gross margin generated per unit sold"
        />
        
        <MetricDisplay
          label="Profit Per Unit (After Ads)"
          value={formatCurrency(metrics.profitPerUnitAfterAds)}
          description="Net profit per unit after ad costs"
        />
      </div>
    </div>
  );
};
