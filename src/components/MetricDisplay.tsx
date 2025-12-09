import React from 'react';

interface MetricDisplayProps {
  label: string;
  value: string;
  description?: string;
}

/**
 * Reusable component for displaying a single metric with label, value, and optional description
 */
export const MetricDisplay: React.FC<MetricDisplayProps> = ({ 
  label, 
  value, 
  description 
}) => {
  return (
    <div className="metric-display">
      <div className="metric-label">
        {label}
        {description && (
          <span className="metric-description" title={description}>
            ⓘ
          </span>
        )}
      </div>
      <div className="metric-value">{value}</div>
      {description && (
        <div className="metric-help">{description}</div>
      )}
    </div>
  );
};
