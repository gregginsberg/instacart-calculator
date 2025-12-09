import React, { useState } from 'react';

interface PlanningToolsProps {
  grossMarginPercent: number | null;
  instacartCommissionPercent: number | null;
}

/**
 * Planning tools for target ROAS and break-even analysis
 */
export const PlanningTools: React.FC<PlanningToolsProps> = ({
  grossMarginPercent,
  instacartCommissionPercent
}) => {
  const [targetProfitMargin, setTargetProfitMargin] = useState<number>(10);
  const [adSpendForBreakeven, setAdSpendForBreakeven] = useState<number>(1000);

  // Calculate required ROAS for target profit margin
  const calculateTargetROAS = () => {
    if (!grossMarginPercent || !instacartCommissionPercent) {
      return null;
    }

    // Profit Margin % = (Gross Margin % - Commission % - (Ad Spend / Sales * 100))
    // Rearrange: Ad Spend / Sales = (Gross Margin % - Commission % - Profit Margin %) / 100
    // ROAS = Sales / Ad Spend = 1 / (Ad Spend / Sales)
    
    const netMargin = (grossMarginPercent - instacartCommissionPercent - targetProfitMargin) / 100;
    
    if (netMargin <= 0) {
      return null; // Impossible target
    }
    
    const requiredROAS = 1 / netMargin;
    return requiredROAS;
  };

  // Calculate break-even ROAS
  const calculateBreakEvenROAS = () => {
    if (!grossMarginPercent || !instacartCommissionPercent) {
      return null;
    }

    // Break-even when profit margin = 0
    // Ad Spend / Sales = (Gross Margin % - Commission %) / 100
    const netMargin = (grossMarginPercent - instacartCommissionPercent) / 100;
    
    if (netMargin <= 0) {
      return null; // Never profitable
    }
    
    const breakEvenROAS = 1 / netMargin;
    return breakEvenROAS;
  };

  // Calculate profit at break-even spend
  const calculateBreakEvenAnalysis = () => {
    const breakEvenROAS = calculateBreakEvenROAS();
    if (!breakEvenROAS) return null;

    const sales = adSpendForBreakeven * breakEvenROAS;
    const grossMargin = sales * (grossMarginPercent! / 100);
    const commission = sales * (instacartCommissionPercent! / 100);
    const profit = grossMargin - commission - adSpendForBreakeven;

    return {
      sales,
      grossMargin,
      commission,
      profit,
      profitMargin: (profit / sales) * 100
    };
  };

  const targetROAS = calculateTargetROAS();
  const breakEvenROAS = calculateBreakEvenROAS();
  const breakEvenAnalysis = calculateBreakEvenAnalysis();

  const canCalculate = grossMarginPercent && instacartCommissionPercent;

  return (
    <div className="planning-tools">
      <h3>🎯 Planning Tools</h3>
      
      {!canCalculate && (
        <div className="planning-warning">
          ⚠️ Enter Gross Margin % and Instacart Commission % in the inputs above to use planning tools.
        </div>
      )}

      {canCalculate && (
        <>
          {/* Target ROAS Calculator */}
          <div className="planning-section">
            <h4>Target ROAS Calculator</h4>
            <p className="planning-description">
              "I want X% profit margin, what ROAS do I need?"
            </p>
            
            <div className="planning-input">
              <label>
                Target Profit Margin %
                <input
                  type="number"
                  value={targetProfitMargin}
                  onChange={(e) => setTargetProfitMargin(parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  step="1"
                />
              </label>
            </div>

            {targetROAS ? (
              <div className="planning-result success">
                <div className="result-main">
                  <strong>Required ROAS:</strong>
                  <span className="result-value">{targetROAS.toFixed(2)}x</span>
                </div>
                <div className="result-breakdown">
                  <p>To achieve {targetProfitMargin}% profit margin, you need:</p>
                  <ul>
                    <li>Every $1 spent should generate ${targetROAS.toFixed(2)} in sales</li>
                    <li>Gross Margin: {grossMarginPercent}%</li>
                    <li>Minus Commission: {instacartCommissionPercent}%</li>
                    <li>Minus Ad Cost: {((1 / targetROAS) * 100).toFixed(2)}%</li>
                    <li>= Profit: {targetProfitMargin}%</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="planning-result error">
                <p>❌ Target profit margin too high!</p>
                <p>Maximum possible: {(grossMarginPercent! - instacartCommissionPercent!).toFixed(2)}%</p>
              </div>
            )}
          </div>

          {/* Break-Even Calculator */}
          <div className="planning-section">
            <h4>Break-Even Analysis</h4>
            <p className="planning-description">
              "What ROAS do I need to not lose money?"
            </p>

            {breakEvenROAS ? (
              <div className="planning-result warning">
                <div className="result-main">
                  <strong>Break-Even ROAS:</strong>
                  <span className="result-value">{breakEvenROAS.toFixed(2)}x</span>
                </div>
                <div className="result-breakdown">
                  <p>You break even when ROAS = {breakEvenROAS.toFixed(2)}x</p>
                  <ul>
                    <li>Below {breakEvenROAS.toFixed(2)}x = ❌ Losing money</li>
                    <li>At {breakEvenROAS.toFixed(2)}x = ⚖️ Break even (0% profit)</li>
                    <li>Above {breakEvenROAS.toFixed(2)}x = ✅ Making profit</li>
                  </ul>
                </div>

                <div className="breakeven-example">
                  <h5>Example Scenario:</h5>
                  <div className="example-input">
                    <label>
                      If you spend:
                      <input
                        type="number"
                        value={adSpendForBreakeven}
                        onChange={(e) => setAdSpendForBreakeven(parseFloat(e.target.value))}
                        min="0"
                        step="100"
                      />
                    </label>
                  </div>
                  {breakEvenAnalysis && (
                    <div className="example-results">
                      <p>At break-even ROAS ({breakEvenROAS.toFixed(2)}x):</p>
                      <ul>
                        <li>Sales: ${breakEvenAnalysis.sales.toFixed(2)}</li>
                        <li>Gross Margin: ${breakEvenAnalysis.grossMargin.toFixed(2)}</li>
                        <li>Commission: -${breakEvenAnalysis.commission.toFixed(2)}</li>
                        <li>Ad Spend: -${adSpendForBreakeven.toFixed(2)}</li>
                        <li className="profit-line">
                          <strong>Profit: ${breakEvenAnalysis.profit.toFixed(2)}</strong>
                          ({breakEvenAnalysis.profitMargin.toFixed(2)}%)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="planning-result error">
                <p>❌ Campaign can never be profitable with these margins!</p>
                <p>Gross margin ({grossMarginPercent}%) is less than or equal to commission ({instacartCommissionPercent}%)</p>
              </div>
            )}
          </div>

          {/* ROAS Zones */}
          <div className="planning-section">
            <h4>ROAS Performance Zones</h4>
            <div className="roas-zones">
              <div className="zone danger">
                <strong>Below {breakEvenROAS?.toFixed(2)}x</strong>
                <p>❌ Unprofitable - Losing money</p>
              </div>
              <div className="zone warning">
                <strong>{breakEvenROAS?.toFixed(2)}x - {(breakEvenROAS! + 1).toFixed(2)}x</strong>
                <p>⚠️ Low profit - Barely breaking even</p>
              </div>
              <div className="zone success">
                <strong>Above {(breakEvenROAS! + 1).toFixed(2)}x</strong>
                <p>✅ Profitable - Meeting targets</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
