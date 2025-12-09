import React from 'react';
import { ProfitabilityStatus } from '../types';
import { formatCurrency, formatPercent } from '../utils/formatting';

interface ResultsSummaryProps {
  profitAfterAds: number | null;
  marginAfterAdsPercent: number | null;
  status: ProfitabilityStatus;
}

/**
 * Summary card showing the main profitability result with status badge
 */
export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  profitAfterAds,
  marginAfterAdsPercent,
  status,
}) => {
  
  /**
   * Gets the display configuration for each status type
   */
  const getStatusConfig = (status: ProfitabilityStatus) => {
    switch (status) {
      case 'unprofitable':
        return {
          label: 'Unprofitable',
          className: 'status-badge status-red',
        };
      case 'near-breakeven':
        return {
          label: 'Near Breakeven',
          className: 'status-badge status-yellow',
        };
      case 'profitable':
        return {
          label: 'Profitable',
          className: 'status-badge status-green',
        };
      case 'waiting':
        return {
          label: 'Waiting for inputs...',
          className: 'status-badge status-neutral',
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="results-summary">
      <h2>Campaign Summary</h2>
      
      <div className="summary-card">
        <div className="summary-main">
          <div className="summary-label">Profit After Ads</div>
          <div className="summary-value">
            {formatCurrency(profitAfterAds)}
          </div>
        </div>
        
        <div className="summary-secondary">
          <div className="summary-label">Margin After Ads (% of Sales)</div>
          <div className="summary-value-small">
            {formatPercent(marginAfterAdsPercent)}
          </div>
        </div>
        
        <div className={statusConfig.className}>
          {statusConfig.label}
        </div>
      </div>
    </div>
  );
};
