import React from 'react';
import { CalculatorInputs, CalculatedMetrics } from '../types';
import { formatCurrency } from '../utils/formatting';

interface UnitEconomicsProps {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
}

/**
 * Displays unit economics analysis including CPUM and margin per unit
 */
export const UnitEconomics: React.FC<UnitEconomicsProps> = ({ inputs, metrics }) => {
  const unitsSold = inputs.unitsSold || 0;
  const adSpend = inputs.adSpend || 0;
  const attributedSales = inputs.attributedSales || 0;
  const promoCosts = inputs.promoCosts || 0;
  
  // Don't show if we don't have units data
  if (!unitsSold || unitsSold === 0) {
    return null;
  }

  // Cost Per Unit Moved (CPUM) = Ad Spend / Units Sold
  const cpum = adSpend / unitsSold;
  
  // Average Price Per Unit = Attributed Sales / Units Sold
  const pricePerUnit = attributedSales / unitsSold;
  
  // COGS Per Unit = (Sales - Gross Margin) / Units Sold
  const grossMargin = metrics.grossMarginDollars || 0;
  const totalCOGS = attributedSales - grossMargin;
  const cogsPerUnit = totalCOGS / unitsSold;
  
  // Trade Spend Per Unit (includes ad spend)
  const tradeSpendPerUnit = adSpend / unitsSold;
  
  // Promo Subsidies Per Unit
  const promoPerUnit = promoCosts / unitsSold;
  
  // Margin Per Unit = Price - COGS - Trade Spend - Promo Subsidies
  const marginPerUnit = pricePerUnit - cogsPerUnit - tradeSpendPerUnit - promoPerUnit;
  
  // Check for margin erosion
  const hasMarginErosion = cpum > marginPerUnit;
  const marginHealth = marginPerUnit - cpum;
  
  return (
    <div className="unit-economics">
      <h3>📊 Unit Economics Analysis</h3>
      
      <div className="economics-summary">
        <div className="economics-metric">
          <div className="metric-label">Price Per Unit</div>
          <div className="metric-value">{formatCurrency(pricePerUnit)}</div>
          <div className="metric-note">Revenue / Units Sold</div>
        </div>

        <div className="economics-metric">
          <div className="metric-label">COGS Per Unit</div>
          <div className="metric-value">{formatCurrency(cogsPerUnit)}</div>
          <div className="metric-note">Cost of goods sold per unit</div>
        </div>

        <div className="economics-metric highlight">
          <div className="metric-label">Cost Per Unit Moved (CPUM)</div>
          <div className="metric-value">{formatCurrency(cpum)}</div>
          <div className="metric-note">Ad Spend / Units Sold</div>
        </div>

        {promoCosts > 0 && (
          <div className="economics-metric">
            <div className="metric-label">Promo Per Unit</div>
            <div className="metric-value">{formatCurrency(promoPerUnit)}</div>
            <div className="metric-note">Promo costs per unit</div>
          </div>
        )}

        <div className={`economics-metric ${hasMarginErosion ? 'negative' : 'positive'}`}>
          <div className="metric-label">Margin Per Unit</div>
          <div className="metric-value">{formatCurrency(marginPerUnit)}</div>
          <div className="metric-note">
            Price - COGS - Trade Spend{promoCosts > 0 ? ' - Promo' : ''}
          </div>
        </div>
      </div>

      {/* Profitability Check */}
      <div className={`profitability-check ${hasMarginErosion ? 'erosion' : 'healthy'}`}>
        {hasMarginErosion ? (
          <>
            <div className="check-icon">⚠️</div>
            <div className="check-content">
              <h4>Margin Erosion Detected</h4>
              <p>
                <strong>CPUM ({formatCurrency(cpum)}) &gt; Margin Per Unit ({formatCurrency(marginPerUnit)})</strong>
              </p>
              <p>
                Your advertising cost per unit is higher than your margin per unit, 
                resulting in a loss of <strong>{formatCurrency(Math.abs(marginHealth))}</strong> per unit sold.
              </p>
              <div className="recommendation">
                <strong>Recommendations:</strong>
                <ul>
                  <li>Reduce ad spend to improve CPUM</li>
                  <li>Increase product price if possible</li>
                  <li>Improve conversion rate to sell more units per dollar spent</li>
                  <li>Negotiate better COGS with suppliers</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="check-icon">✅</div>
            <div className="check-content">
              <h4>Ads Are Profitable</h4>
              <p>
                <strong>Margin Per Unit ({formatCurrency(marginPerUnit)}) &gt; CPUM ({formatCurrency(cpum)})</strong>
              </p>
              <p>
                You're earning <strong>{formatCurrency(marginHealth)}</strong> in profit per unit after advertising costs.
                Your ads are generating profitable growth!
              </p>
              <div className="recommendation positive">
                <strong>Opportunity:</strong> Consider scaling ad spend while maintaining this positive unit economics.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Breakdown Visual */}
      <div className="unit-breakdown">
        <h4>Per-Unit Breakdown</h4>
        <div className="breakdown-bar">
          <div 
            className="bar-segment bar-price"
            style={{ width: '100%' }}
            title={`Price: ${formatCurrency(pricePerUnit)}`}
          >
            <span className="bar-label">Price: {formatCurrency(pricePerUnit)}</span>
          </div>
        </div>
        
        <div className="breakdown-components">
          <div className="component-item">
            <span className="component-dot dot-cogs"></span>
            <span className="component-label">COGS:</span>
            <span className="component-value">{formatCurrency(cogsPerUnit)}</span>
            <span className="component-percent">
              ({((cogsPerUnit / pricePerUnit) * 100).toFixed(1)}%)
            </span>
          </div>
          
          <div className="component-item">
            <span className="component-dot dot-cpum"></span>
            <span className="component-label">CPUM:</span>
            <span className="component-value">{formatCurrency(cpum)}</span>
            <span className="component-percent">
              ({((cpum / pricePerUnit) * 100).toFixed(1)}%)
            </span>
          </div>
          
          {promoCosts > 0 && (
            <div className="component-item">
              <span className="component-dot dot-promo"></span>
              <span className="component-label">Promo:</span>
              <span className="component-value">{formatCurrency(promoPerUnit)}</span>
              <span className="component-percent">
                ({((promoPerUnit / pricePerUnit) * 100).toFixed(1)}%)
              </span>
            </div>
          )}
          
          <div className={`component-item ${marginPerUnit < 0 ? 'negative' : 'positive'}`}>
            <span className="component-dot dot-margin"></span>
            <span className="component-label">Net Margin:</span>
            <span className="component-value">{formatCurrency(marginPerUnit)}</span>
            <span className="component-percent">
              ({((marginPerUnit / pricePerUnit) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Key Formula */}
      <div className="economics-formula">
        <h4>💡 Key Insight</h4>
        <div className="formula-box">
          <p><strong>For Profitable Ads:</strong></p>
          <p className="formula">Margin Per Unit &gt; Cost Per Unit Moved (CPUM)</p>
          <p className="formula-detail">
            ({formatCurrency(pricePerUnit)} - {formatCurrency(cogsPerUnit)} - {formatCurrency(cpum)}
            {promoCosts > 0 ? ` - ${formatCurrency(promoPerUnit)}` : ''}) 
            &gt; {formatCurrency(cpum)}
          </p>
          <p className="formula-result">
            {formatCurrency(marginPerUnit)} {hasMarginErosion ? '≤' : '>'} {formatCurrency(cpum)} 
            {hasMarginErosion ? ' ❌ Margin Erosion' : ' ✅ Profitable'}
          </p>
        </div>
      </div>
    </div>
  );
};
