import React from 'react';
import { CalculatedMetrics, CalculatorInputs } from '../types';
import { formatRatio, formatPercent } from '../utils/formatting';

interface PerformanceComparisonProps {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
}

/**
 * Displays comparison between actual and target performance
 */
export const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({ inputs, metrics }) => {
  // Only show if there's a target set
  if (inputs.targetROAS === null || metrics.roas === null) {
    return null;
  }

  const actual = metrics.roas;
  const target = inputs.targetROAS;
  const difference = metrics.roasVsTarget || 0;
  const percentDifference = ((difference / target) * 100);

  const indicator = metrics.performanceIndicator;
  
  const getIndicatorConfig = () => {
    switch (indicator) {
      case 'above':
        return {
          label: 'Above Target',
          className: 'performance-above',
          icon: '📈',
        };
      case 'below':
        return {
          label: 'Below Target',
          className: 'performance-below',
          icon: '📉',
        };
      case 'on-target':
        return {
          label: 'On Target',
          className: 'performance-on-target',
          icon: '🎯',
        };
      default:
        return {
          label: 'No Target',
          className: 'performance-neutral',
          icon: '📊',
        };
    }
  };

  const config = getIndicatorConfig();

  return (
    <div className="performance-comparison">
      <h3>Performance vs Target</h3>
      
      <div className="comparison-container">
        <div className="comparison-metrics">
          <div className="comparison-item">
            <div className="comparison-label">Target ROAS</div>
            <div className="comparison-value target-value">{formatRatio(target)}</div>
          </div>
          
          <div className="comparison-divider">vs</div>
          
          <div className="comparison-item">
            <div className="comparison-label">Actual ROAS</div>
            <div className="comparison-value actual-value">{formatRatio(actual)}</div>
          </div>
        </div>

        <div className={`performance-indicator ${config.className}`}>
          <span className="indicator-icon">{config.icon}</span>
          <span className="indicator-label">{config.label}</span>
        </div>

        <div className="performance-details">
          <div className="detail-item">
            <span className="detail-label">Difference:</span>
            <span className={`detail-value ${difference >= 0 ? 'positive' : 'negative'}`}>
              {difference >= 0 ? '+' : ''}{formatRatio(difference)}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">% of Target:</span>
            <span className={`detail-value ${percentDifference >= 0 ? 'positive' : 'negative'}`}>
              {percentDifference >= 0 ? '+' : ''}{percentDifference.toFixed(1)}%
            </span>
          </div>
        </div>

        {indicator === 'below' && (
          <div className="performance-insight warning">
            ⚠️ Your ROAS is below target. Consider optimizing ad targeting, creative, or reducing spend.
          </div>
        )}

        {indicator === 'above' && (
          <div className="performance-insight success">
            ✅ Great! Your ROAS exceeds target. You may have room to scale spending profitably.
          </div>
        )}

        {indicator === 'on-target' && (
          <div className="performance-insight info">
            🎯 You're hitting your target ROAS. Monitor closely to maintain performance.
          </div>
        )}
      </div>
    </div>
  );
};
