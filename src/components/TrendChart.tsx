import React, { useState } from 'react';
import { ProductSnapshot } from '../types';
import { extractTrendData, getProductSnapshots } from '../utils/historical';

interface TrendChartProps {
  snapshots: ProductSnapshot[];
  productId?: string;
  productName?: string;
}

type MetricType = 'roas' | 'profit' | 'sales' | 'spend' | 'margin' | 'ctr' | 'ntb';

/**
 * Component for displaying trend charts
 */
export const TrendChart: React.FC<TrendChartProps> = ({
  snapshots,
  productId,
  productName,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('roas');

  // Filter snapshots if productId is provided
  const relevantSnapshots = productId
    ? getProductSnapshots(snapshots, productId)
    : snapshots;

  if (relevantSnapshots.length === 0) {
    return (
      <div className="trend-chart">
        <h3>📈 Performance Trends</h3>
        <div className="no-data">
          <p>No historical data available. Create snapshots to see trends!</p>
        </div>
      </div>
    );
  }

  const trendData = extractTrendData(relevantSnapshots, selectedMetric);

  // Calculate min/max for scaling
  const values = trendData.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  // Format value based on metric type
  const formatValue = (value: number) => {
    switch (selectedMetric) {
      case 'roas':
        return value.toFixed(2) + 'x';
      case 'profit':
      case 'sales':
      case 'spend':
        return '$' + Math.round(value).toLocaleString();
      case 'margin':
      case 'ctr':
      case 'ntb':
        return value.toFixed(1) + '%';
      default:
        return value.toFixed(2);
    }
  };

  const getMetricLabel = (metric: MetricType) => {
    switch (metric) {
      case 'roas': return 'ROAS';
      case 'profit': return 'Profit';
      case 'sales': return 'Sales';
      case 'spend': return 'Ad Spend';
      case 'margin': return 'Margin %';
      case 'ctr': return 'CTR %';
      case 'ntb': return 'NTB %';
    }
  };

  // Calculate trend direction
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const change = lastValue - firstValue;
  const changePercent = firstValue !== 0 ? (change / firstValue) * 100 : 0;
  const trendDirection = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';

  return (
    <div className="trend-chart">
      <div className="trend-header">
        <h3>📈 Performance Trends {productName && `- ${productName}`}</h3>
        <div className="metric-selector">
          <label>Metric:</label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
            className="metric-select"
          >
            <option value="roas">ROAS</option>
            <option value="profit">Profit</option>
            <option value="sales">Sales</option>
            <option value="spend">Ad Spend</option>
            <option value="margin">Margin %</option>
            <option value="ctr">CTR %</option>
            <option value="ntb">NTB %</option>
          </select>
        </div>
      </div>

      <div className="trend-summary">
        <div className="trend-stat">
          <span className="stat-label">First Value</span>
          <span className="stat-value">{formatValue(firstValue)}</span>
        </div>
        <div className="trend-stat">
          <span className="stat-label">Latest Value</span>
          <span className="stat-value">{formatValue(lastValue)}</span>
        </div>
        <div className="trend-stat">
          <span className="stat-label">Change</span>
          <span className={`stat-value ${trendDirection === 'up' ? 'positive' : trendDirection === 'down' ? 'negative' : ''}`}>
            {change > 0 ? '+' : ''}{formatValue(change)}
            {' '}({changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%)
          </span>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-y-axis">
          <div className="y-label">{formatValue(maxValue)}</div>
          <div className="y-label">{formatValue((maxValue + minValue) / 2)}</div>
          <div className="y-label">{formatValue(minValue)}</div>
        </div>
        
        <div className="chart-area">
          <div className="chart-line">
            {trendData.map((point, index) => {
              const x = (index / (trendData.length - 1)) * 100;
              const y = 100 - ((point.value - minValue) / range) * 100;
              
              return (
                <div
                  key={index}
                  className="chart-point"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${point.date}: ${formatValue(point.value)}`}
                >
                  <div className="point-tooltip">
                    <div className="tooltip-date">{point.date}</div>
                    <div className="tooltip-value">{formatValue(point.value)}</div>
                  </div>
                </div>
              );
            })}
            
            {/* Draw line connecting points */}
            <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={trendData.map((point, index) => {
                  const x = (index / (trendData.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / range) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                className={`trend-line ${trendDirection}`}
              />
            </svg>
          </div>

          <div className="chart-x-axis">
            {trendData.map((point, index) => {
              if (index % Math.ceil(trendData.length / 5) === 0 || index === trendData.length - 1) {
                return (
                  <div key={index} className="x-label" style={{ left: `${(index / (trendData.length - 1)) * 100}%` }}>
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="chart-legend">
        <span className="legend-label">{getMetricLabel(selectedMetric)} over time</span>
        <span className="legend-count">{trendData.length} data points</span>
      </div>
    </div>
  );
};
