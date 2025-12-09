import React, { useState } from 'react';
import { CalculatorInputs, CalculatedMetrics } from '../types';
import { calculateAllMetrics } from '../utils/calculations';
import { formatCurrency, formatRatio, formatPercent } from '../utils/formatting';

interface WhatIfScenariosProps {
  inputs: CalculatorInputs;
  currentMetrics: CalculatedMetrics;
}

/**
 * What-if scenario analysis tool
 */
export const WhatIfScenarios: React.FC<WhatIfScenariosProps> = ({ inputs, currentMetrics }) => {
  const [adSpendChange, setAdSpendChange] = useState<number>(0);
  const [targetMargin, setTargetMargin] = useState<number | null>(null);
  
  // Calculate scenario with changed ad spend
  const getScenarioWithAdSpendChange = () => {
    if (inputs.adSpend === null) return null;
    
    const newAdSpend = inputs.adSpend * (1 + adSpendChange / 100);
    const scenarioInputs: CalculatorInputs = {
      ...inputs,
      adSpend: newAdSpend,
    };
    
    return calculateAllMetrics(scenarioInputs);
  };

  // Calculate required ROAS for target margin
  const getRequiredROASForMargin = () => {
    if (targetMargin === null) return null;
    if (currentMetrics.effectiveMarginPercent === null) return null;
    
    // Work backwards: what ROAS gives us the target margin?
    // Margin After Ads % = (Sales * EffectiveMargin% - AdSpend - Promo) / Sales
    // Target = (Sales * EffectiveMargin% - AdSpend - Promo) / Sales
    // Target * Sales = Sales * EffectiveMargin% - AdSpend - Promo
    // AdSpend = Sales * EffectiveMargin% - Target * Sales - Promo
    // AdSpend = Sales * (EffectiveMargin% - Target) - Promo
    // ROAS = Sales / AdSpend
    
    const targetMarginDecimal = targetMargin / 100;
    const effectiveMargin = currentMetrics.effectiveMarginPercent;
    const promoCosts = inputs.promoCosts || 0;
    
    // Simplified: assuming minimal promo costs relative to sales
    // Required ROAS = 1 / (EffectiveMargin% - TargetMargin%)
    const marginDifference = effectiveMargin - targetMarginDecimal;
    
    if (marginDifference <= 0) return null;
    
    return 1 / marginDifference;
  };

  const scenarioMetrics = getScenarioWithAdSpendChange();
  const requiredROAS = getRequiredROASForMargin();

  // Don't show if we don't have enough data
  if (inputs.adSpend === null || inputs.attributedSales === null) {
    return null;
  }

  return (
    <div className="whatif-scenarios">
      <h3>What-If Scenarios</h3>
      
      {/* Scenario 1: Change Ad Spend */}
      <div className="scenario-section">
        <h4>📊 Scenario: Adjust Ad Spend</h4>
        <p className="scenario-description">
          See how changing your ad spend affects profitability
        </p>
        
        <div className="scenario-controls">
          <label htmlFor="adSpendChange">
            Change Ad Spend by:
          </label>
          <div className="slider-container">
            <input
              id="adSpendChange"
              type="range"
              min="-50"
              max="50"
              step="5"
              value={adSpendChange}
              onChange={(e) => setAdSpendChange(Number(e.target.value))}
              className="scenario-slider"
            />
            <div className="slider-value">
              {adSpendChange > 0 ? '+' : ''}{adSpendChange}%
            </div>
          </div>
        </div>

        {scenarioMetrics && (
          <div className="scenario-results">
            <div className="scenario-comparison">
              <div className="scenario-col">
                <div className="scenario-label">Current</div>
                <div className="scenario-metric">
                  <span className="metric-name">Ad Spend</span>
                  <span className="metric-val">{formatCurrency(inputs.adSpend)}</span>
                </div>
                <div className="scenario-metric">
                  <span className="metric-name">Profit</span>
                  <span className="metric-val">{formatCurrency(currentMetrics.profitAfterAds)}</span>
                </div>
                <div className="scenario-metric">
                  <span className="metric-name">Margin %</span>
                  <span className="metric-val">{formatPercent(currentMetrics.marginAfterAdsPercent)}</span>
                </div>
              </div>

              <div className="scenario-arrow">→</div>

              <div className="scenario-col scenario-new">
                <div className="scenario-label">Scenario</div>
                <div className="scenario-metric">
                  <span className="metric-name">Ad Spend</span>
                  <span className="metric-val">{formatCurrency(inputs.adSpend * (1 + adSpendChange / 100))}</span>
                </div>
                <div className="scenario-metric">
                  <span className="metric-name">Profit</span>
                  <span className={`metric-val ${(scenarioMetrics.profitAfterAds || 0) > (currentMetrics.profitAfterAds || 0) ? 'positive' : 'negative'}`}>
                    {formatCurrency(scenarioMetrics.profitAfterAds)}
                  </span>
                </div>
                <div className="scenario-metric">
                  <span className="metric-name">Margin %</span>
                  <span className={`metric-val ${(scenarioMetrics.marginAfterAdsPercent || 0) > (currentMetrics.marginAfterAdsPercent || 0) ? 'positive' : 'negative'}`}>
                    {formatPercent(scenarioMetrics.marginAfterAdsPercent)}
                  </span>
                </div>
              </div>
            </div>

            {adSpendChange !== 0 && (
              <div className="scenario-insight">
                {adSpendChange > 0 ? (
                  <>
                    📈 <strong>Increasing</strong> ad spend by {adSpendChange}% would{' '}
                    {(scenarioMetrics.profitAfterAds || 0) > (currentMetrics.profitAfterAds || 0) ? 
                      <span className="positive">increase</span> : 
                      <span className="negative">decrease</span>
                    } profit by{' '}
                    {formatCurrency(Math.abs((scenarioMetrics.profitAfterAds || 0) - (currentMetrics.profitAfterAds || 0)))}.
                  </>
                ) : (
                  <>
                    📉 <strong>Decreasing</strong> ad spend by {Math.abs(adSpendChange)}% would{' '}
                    {(scenarioMetrics.profitAfterAds || 0) > (currentMetrics.profitAfterAds || 0) ? 
                      <span className="positive">increase</span> : 
                      <span className="negative">decrease</span>
                    } profit by{' '}
                    {formatCurrency(Math.abs((scenarioMetrics.profitAfterAds || 0) - (currentMetrics.profitAfterAds || 0)))}.
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Scenario 2: Target Margin */}
      <div className="scenario-section">
        <h4>🎯 Scenario: Target Margin Calculator</h4>
        <p className="scenario-description">
          What ROAS do you need to hit a specific margin goal?
        </p>
        
        <div className="scenario-controls">
          <label htmlFor="targetMargin">
            Target Margin % (of sales):
          </label>
          <input
            id="targetMargin"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={targetMargin || ''}
            onChange={(e) => setTargetMargin(e.target.value ? Number(e.target.value) : null)}
            placeholder="e.g., 15"
            className="scenario-input"
          />
        </div>

        {requiredROAS !== null && targetMargin !== null && (
          <div className="scenario-results">
            <div className="target-result">
              <div className="target-goal">
                To achieve <strong>{targetMargin}% margin</strong> after ads, you need:
              </div>
              <div className="target-roas">
                ROAS of <strong>{formatRatio(requiredROAS)}</strong>
              </div>
              <div className="target-comparison">
                Your current ROAS: <strong>{formatRatio(currentMetrics.roas)}</strong>
                {currentMetrics.roas !== null && (
                  <span className={currentMetrics.roas >= requiredROAS ? 'positive' : 'negative'}>
                    {currentMetrics.roas >= requiredROAS ? 
                      ` ✅ You're there!` : 
                      ` ⚠️ Need ${formatRatio(requiredROAS - currentMetrics.roas)} more`
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {requiredROAS === null && targetMargin !== null && (
          <div className="scenario-results">
            <div className="scenario-insight warning">
              ⚠️ Target margin is too high for current effective margin. Reduce costs or increase product margins first.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
