import React from 'react';
import { CalculatedMetrics, UPCMetrics } from '../types';

interface AlertsPanelProps {
  metrics: CalculatedMetrics;
  upcMetrics: UPCMetrics[];
}

interface Alert {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action?: string;
}

/**
 * Smart alerts to highlight performance issues and opportunities
 */
export const AlertsPanel: React.FC<AlertsPanelProps> = ({ metrics, upcMetrics }) => {
  const generateAlerts = (): Alert[] => {
    const alerts: Alert[] = [];

    // Campaign-level alerts
    if (metrics.profitAfterAds !== null && metrics.profitAfterAds !== undefined && metrics.profitAfterAds < 0) {
      alerts.push({
        type: 'error',
        title: '❌ Campaign is Unprofitable',
        message: `You're losing $${Math.abs(metrics.profitAfterAds).toLocaleString()} on this campaign.`,
        action: 'Consider pausing or optimizing immediately'
      });
    }

    if (metrics.roas !== null && metrics.roas !== undefined && metrics.roas < 1.0) {
      alerts.push({
        type: 'error',
        title: '📉 ROAS Below 1.0x',
        message: `Current ROAS: ${metrics.roas.toFixed(2)}x. You're spending more than you're earning!`,
        action: 'Immediate action required'
      });
    }

    if (metrics.roas !== null && metrics.roas !== undefined && metrics.roas >= 1.0 && metrics.roas < 2.0) {
      alerts.push({
        type: 'warning',
        title: '⚠️ Low ROAS',
        message: `ROAS of ${metrics.roas.toFixed(2)}x is below typical profitable thresholds.`,
        action: 'Consider optimizing targeting or creative'
      });
    }

    if (metrics.marginAfterAdsPercent !== null && metrics.marginAfterAdsPercent !== undefined && metrics.marginAfterAdsPercent < 5 && metrics.marginAfterAdsPercent > 0) {
      alerts.push({
        type: 'warning',
        title: '⚠️ Thin Profit Margins',
        message: `Only ${metrics.marginAfterAdsPercent.toFixed(2)}% profit margin. Small changes could make this unprofitable.`,
        action: 'Monitor closely'
      });
    }

    if (metrics.ctr !== null && metrics.ctr !== undefined && metrics.ctr < 0.005) {
      alerts.push({
        type: 'warning',
        title: '📊 Low Click-Through Rate',
        message: `CTR of ${(metrics.ctr * 100).toFixed(2)}% is below industry average (1-2%).`,
        action: 'Test new creative or improve product images'
      });
    }

    if (metrics.ctr !== null && metrics.ctr !== undefined && metrics.ctr > 0.05) {
      alerts.push({
        type: 'success',
        title: '🎉 Excellent CTR',
        message: `CTR of ${(metrics.ctr * 100).toFixed(2)}% is outstanding!`,
        action: 'Creative is performing well'
      });
    }

    if (metrics.roas !== null && metrics.roas !== undefined && metrics.roas > 5.0) {
      alerts.push({
        type: 'success',
        title: '🚀 Strong ROAS',
        message: `${metrics.roas.toFixed(2)}x ROAS is excellent. Consider increasing budget!`,
        action: 'Opportunity to scale'
      });
    }

    // UPC-level alerts
    if (upcMetrics.length > 0) {
      const unprofitableUPCs = upcMetrics.filter(u => 
        u.profitAfterAds !== null && u.profitAfterAds < 0
      );

      if (unprofitableUPCs.length > 0) {
        const totalLoss = unprofitableUPCs.reduce((sum, u) => sum + Math.abs(u.profitAfterAds || 0), 0);
        alerts.push({
          type: 'error',
          title: '🔴 Unprofitable UPCs Detected',
          message: `${unprofitableUPCs.length} UPC(s) losing money. Total loss: $${totalLoss.toLocaleString()}`,
          action: 'Review UPC Analysis section and consider pausing these products'
        });
      }

      const topPerformer = [...upcMetrics].sort((a, b) => 
        (b.profitAfterAds || 0) - (a.profitAfterAds || 0)
      )[0];

      if (topPerformer && topPerformer.profitAfterAds && topPerformer.profitAfterAds > 0 && metrics.profitAfterAds) {
        const contributionPercent = (topPerformer.profitAfterAds / metrics.profitAfterAds) * 100;
        
        if (contributionPercent > 50) {
          alerts.push({
            type: 'info',
            title: '⭐ Dominant Product',
            message: `${topPerformer.productName} generates ${contributionPercent.toFixed(0)}% of total profit.`,
            action: 'High dependency - consider diversifying or scaling this winner'
          });
        }
      }

      const lowROASUPCs = upcMetrics.filter(u => u.roas !== null && u.roas < 2.0);
      if (lowROASUPCs.length > 0 && lowROASUPCs.length < upcMetrics.length) {
        alerts.push({
          type: 'warning',
          title: '📉 Low ROAS Products',
          message: `${lowROASUPCs.length} UPC(s) with ROAS below 2.0x`,
          action: 'Optimize or consider pausing'
        });
      }
    }

    // Opportunity alerts
    if (metrics.profitAfterAds && metrics.profitAfterAds > 0 && metrics.roas && metrics.roas > 3.0) {
      alerts.push({
        type: 'success',
        title: '💰 Scale Opportunity',
        message: `Strong performance (${metrics.roas.toFixed(2)}x ROAS, $${metrics.profitAfterAds.toLocaleString()} profit). Consider increasing budget!`,
        action: 'Growth opportunity'
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();

  if (alerts.length === 0) {
    return (
      <div className="alerts-panel">
        <h3>🔔 Smart Alerts</h3>
        <div className="alert-item success">
          <div className="alert-header">
            <strong>✅ All Clear</strong>
          </div>
          <p>No critical issues detected. Campaign is performing within normal parameters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts-panel">
      <h3>🔔 Smart Alerts ({alerts.length})</h3>
      <p className="alerts-description">
        Automated insights based on your campaign performance
      </p>
      
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item ${alert.type}`}>
            <div className="alert-header">
              <strong>{alert.title}</strong>
              <span className={`alert-badge ${alert.type}`}>
                {alert.type.toUpperCase()}
              </span>
            </div>
            <p className="alert-message">{alert.message}</p>
            {alert.action && (
              <p className="alert-action">
                <strong>Recommended Action:</strong> {alert.action}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="alerts-summary">
        <div className="summary-stat">
          <span className="stat-count error">{alerts.filter(a => a.type === 'error').length}</span>
          <span className="stat-label">Critical</span>
        </div>
        <div className="summary-stat">
          <span className="stat-count warning">{alerts.filter(a => a.type === 'warning').length}</span>
          <span className="stat-label">Warnings</span>
        </div>
        <div className="summary-stat">
          <span className="stat-count info">{alerts.filter(a => a.type === 'info').length}</span>
          <span className="stat-label">Info</span>
        </div>
        <div className="summary-stat">
          <span className="stat-count success">{alerts.filter(a => a.type === 'success').length}</span>
          <span className="stat-label">Opportunities</span>
        </div>
      </div>
    </div>
  );
};
