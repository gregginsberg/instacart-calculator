import React from 'react';
import { CalculatorInputs } from '../types';

interface InputsPanelProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number | null) => void;
  calculatedROAS: number | null;
}

/**
 * Left panel containing all user inputs grouped by category
 */
export const InputsPanel: React.FC<InputsPanelProps> = ({ 
  inputs, 
  onInputChange,
  calculatedROAS 
}) => {
  
  /**
   * Handles numeric input changes and converts to number or null
   */
  const handleChange = (field: keyof CalculatorInputs) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === '') {
      onInputChange(field, null);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onInputChange(field, numValue);
      }
    }
  };

  return (
    <div className="inputs-panel">
      <h2>Calculator Inputs</h2>
      
      {/* Section 1: Instacart Ad Metrics */}
      <div className="input-section">
        <h3>1. Instacart Ad Metrics</h3>
        <p className="helper-text">
          Enter your campaign performance data from Instacart Ads Manager
        </p>
        
        <div className="input-group">
          <label htmlFor="adSpend">
            Ad Spend ($) <span className="required">*</span>
          </label>
          <input
            id="adSpend"
            type="number"
            min="0"
            step="0.01"
            value={inputs.adSpend ?? ''}
            onChange={handleChange('adSpend')}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="input-group">
          <label htmlFor="attributedSales">
            Attributed Sales ($) <span className="required">*</span>
          </label>
          <input
            id="attributedSales"
            type="number"
            min="0"
            step="0.01"
            value={inputs.attributedSales ?? ''}
            onChange={handleChange('attributedSales')}
            placeholder="e.g., 15000"
          />
        </div>

        <div className="input-group">
          <label htmlFor="roas">
            ROAS (Read-only)
          </label>
          <input
            id="roas"
            type="text"
            value={calculatedROAS !== null ? calculatedROAS.toFixed(2) : '—'}
            readOnly
            disabled
            className="read-only"
          />
          <span className="input-note">Auto-calculated from sales ÷ spend</span>
        </div>

        <div className="input-group">
          <label htmlFor="unitsSold">
            Units Sold (Optional)
          </label>
          <input
            id="unitsSold"
            type="number"
            min="0"
            step="1"
            value={inputs.unitsSold ?? ''}
            onChange={handleChange('unitsSold')}
            placeholder="e.g., 500"
          />
          <span className="input-note">Number of units sold to calculate per-unit metrics</span>
        </div>
      </div>

      {/* Section 1B: Engagement Metrics */}
      <div className="input-section">
        <h3>1B. Engagement Metrics (Optional)</h3>
        <p className="helper-text">
          Track clicks, impressions, and conversion to understand funnel performance
        </p>

        <div className="input-group">
          <label htmlFor="impressions">
            Impressions
          </label>
          <input
            id="impressions"
            type="number"
            min="0"
            step="1"
            value={inputs.impressions ?? ''}
            onChange={handleChange('impressions')}
            placeholder="e.g., 100000"
          />
          <span className="input-note">Number of times your ad was shown</span>
        </div>

        <div className="input-group">
          <label htmlFor="clicks">
            Clicks
          </label>
          <input
            id="clicks"
            type="number"
            min="0"
            step="1"
            value={inputs.clicks ?? ''}
            onChange={handleChange('clicks')}
            placeholder="e.g., 2500"
          />
          <span className="input-note">Number of clicks on your ad</span>
        </div>
      </div>

      {/* Section 2: Brand Financial Inputs */}
      <div className="input-section">
        <h3>2. Brand Financial Inputs</h3>
        <p className="helper-text">
          Your product economics and cost structure
        </p>
        
        <div className="input-group">
          <label htmlFor="grossMargin">
            Gross Margin % <span className="required">*</span>
          </label>
          <input
            id="grossMargin"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.grossMarginPercent ?? ''}
            onChange={handleChange('grossMarginPercent')}
            placeholder="e.g., 40 or 0.4"
          />
          <span className="input-note">Enter as 40 or 0.4 for 40%</span>
        </div>

        <div className="input-group">
          <label htmlFor="otherCosts">
            Other Costs % (Optional)
          </label>
          <input
            id="otherCosts"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.otherCostsPercent ?? ''}
            onChange={handleChange('otherCostsPercent')}
            placeholder="e.g., 5 or 0.05"
          />
          <span className="input-note">
            Freight, fulfillment, fees, etc. (reduces effective margin)
          </span>
        </div>
      </div>

      {/* Section 2B: Customer Acquisition */}
      <div className="input-section">
        <h3>2B. Customer Acquisition (Optional)</h3>
        <p className="helper-text">
          Track new vs repeat customer sales to measure acquisition effectiveness
        </p>

        <div className="input-group">
          <label htmlFor="ntbPercent">
            New to Brand (NTB) %
          </label>
          <input
            id="ntbPercent"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={inputs.ntbPercent ?? ''}
            onChange={handleChange('ntbPercent')}
            placeholder="e.g., 35 or 0.35"
          />
          <span className="input-note">
            Percentage of sales from new customers (enter as 35 or 0.35 for 35%). Can share as percentage (not raw customer counts).
          </span>
        </div>
      </div>

      {/* Section 3: Promo Costs */}
      <div className="input-section">
        <h3>3. Promo Costs (Optional)</h3>
        <p className="helper-text">
          Additional promotional expenses during this campaign period
        </p>
        
        <div className="input-group">
          <label htmlFor="promoCosts">
            Promo / Redemption Costs ($)
          </label>
          <input
            id="promoCosts"
            type="number"
            min="0"
            step="0.01"
            value={inputs.promoCosts ?? ''}
            onChange={handleChange('promoCosts')}
            placeholder="e.g., 500"
          />
          <span className="input-note">
            SUAS fees, Ibotta costs, free gift expenses, etc.
          </span>
        </div>
      </div>

      {/* Section 4: Performance Targets */}
      <div className="input-section">
        <h3>4. Performance Targets (Optional)</h3>
        <p className="helper-text">
          Set targets to compare your actual performance against goals
        </p>
        
        <div className="input-group">
          <label htmlFor="targetROAS">
            Target ROAS
          </label>
          <input
            id="targetROAS"
            type="number"
            min="0"
            step="0.1"
            value={inputs.targetROAS ?? ''}
            onChange={handleChange('targetROAS')}
            placeholder="e.g., 3.5"
          />
          <span className="input-note">
            Your ROAS goal to compare against actual performance
          </span>
        </div>
      </div>
    </div>
  );
};
