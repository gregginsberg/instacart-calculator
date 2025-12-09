import React from 'react';
import { CalculatedMetrics } from '../types';
import { formatCurrency, formatPercent, formatRatio } from '../utils/formatting';
import { MetricDisplay } from './MetricDisplay';

interface EngagementMetricsProps {
  metrics: CalculatedMetrics;
}

/**
 * Displays engagement and funnel metrics
 */
export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ metrics }) => {
  // Only show if we have at least some engagement data
  const hasEngagementData = metrics.ctr !== null || metrics.cpc !== null || metrics.cpm !== null;
  
  if (!hasEngagementData) {
    return null;
  }

  return (
    <div className="engagement-metrics">
      <h3>📊 Engagement & Funnel Metrics</h3>
      
      <div className="metrics-grid">
        {metrics.ctr !== null && (
          <MetricDisplay
            label="Click-Through Rate (CTR)"
            value={formatPercent(metrics.ctr)}
            description="Percentage of impressions that resulted in clicks"
          />
        )}
        
        {metrics.cpc !== null && (
          <MetricDisplay
            label="Cost Per Click (CPC)"
            value={formatCurrency(metrics.cpc)}
            description="Average cost for each click on your ad"
          />
        )}
        
        {metrics.cpm !== null && (
          <MetricDisplay
            label="Cost Per 1K Impressions (CPM)"
            value={formatCurrency(metrics.cpm)}
            description="Cost to reach 1,000 shoppers with your ad"
          />
        )}
        
        {metrics.conversionRate !== null && (
          <MetricDisplay
            label="Click-to-Order Rate"
            value={formatPercent(metrics.conversionRate)}
            description="Percentage of clicks that converted to orders"
          />
        )}
        
        {metrics.cpo !== null && (
          <MetricDisplay
            label="Cost Per Order (CPO)"
            value={formatCurrency(metrics.cpo)}
            description="Average ad cost to generate one order"
          />
        )}
        
        {metrics.aov !== null && (
          <MetricDisplay
            label="Average Order Value (AOV)"
            value={formatCurrency(metrics.aov)}
            description="Average dollar value per order"
          />
        )}

        {metrics.unitsPerOrder !== null && (
          <MetricDisplay
            label="Units Per Order"
            value={formatRatio(metrics.unitsPerOrder)}
            description="Average number of units purchased per order"
          />
        )}
      </div>

      {/* Funnel Visualization */}
      {metrics.ctr !== null && metrics.conversionRate !== null && (
        <div className="funnel-visual">
          <h4>Marketing Funnel</h4>
          <div className="funnel-container">
            <div className="funnel-stage">
              <div className="funnel-label">Impressions</div>
              <div className="funnel-bar" style={{ width: '100%' }}>
                <span className="funnel-text">100%</span>
              </div>
            </div>
            
            <div className="funnel-stage">
              <div className="funnel-label">Clicks</div>
              <div className="funnel-bar" style={{ width: `${Math.min(metrics.ctr * 100, 100)}%` }}>
                <span className="funnel-text">{formatPercent(metrics.ctr)}</span>
              </div>
            </div>
            
            <div className="funnel-stage">
              <div className="funnel-label">Orders</div>
              <div className="funnel-bar" style={{ width: `${Math.min(metrics.ctr * metrics.conversionRate * 100, 100)}%` }}>
                <span className="funnel-text">
                  {formatPercent(metrics.ctr && metrics.conversionRate ? metrics.ctr * metrics.conversionRate : null)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
