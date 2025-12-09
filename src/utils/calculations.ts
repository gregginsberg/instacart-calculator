import { CalculatorInputs, CalculatedMetrics, ProfitabilityStatus } from '../types';

/**
 * Normalizes percentage input to decimal format.
 * Accepts both "40" (meaning 40%) and "0.4" (meaning 40%).
 * 
 * @param input - The user's percentage input
 * @returns Decimal representation (e.g., 0.4 for 40%)
 */
export function normalizePercentageInput(input: number | null): number | null {
  if (input === null || isNaN(input)) return null;
  
  // If greater than 1, assume it's a whole percentage (e.g., 40 means 40%)
  if (input > 1) {
    return input / 100;
  }
  
  // Otherwise, treat as already decimal (0.4 means 40%)
  return input;
}

/**
 * Calculates effective margin percentage after subtracting other costs.
 * Clamps result between 0 and 1.
 * 
 * @param grossMarginPercent - Gross margin as decimal
 * @param otherCostsPercent - Other costs as decimal
 * @returns Effective margin percentage, or null if inputs invalid
 */
export function calculateEffectiveMargin(
  grossMarginPercent: number | null,
  otherCostsPercent: number | null
): number | null {
  const normalizedGrossMargin = normalizePercentageInput(grossMarginPercent);
  const normalizedOtherCosts = normalizePercentageInput(otherCostsPercent);
  
  if (normalizedGrossMargin === null) return null;
  
  const otherCosts = normalizedOtherCosts || 0;
  const effectiveMargin = normalizedGrossMargin - otherCosts;
  
  // Clamp between 0 and 1 (0% to 100%)
  return Math.max(0, Math.min(1, effectiveMargin));
}

/**
 * Calculates ROAS (Return on Ad Spend).
 * ROAS = Attributed Sales / Ad Spend
 * 
 * @param attributedSales - Total attributed sales
 * @param adSpend - Total ad spend
 * @returns ROAS value, or null if cannot be calculated
 */
export function calculateROAS(
  attributedSales: number | null,
  adSpend: number | null
): number | null {
  if (attributedSales === null || adSpend === null || adSpend === 0) {
    return null;
  }
  return attributedSales / adSpend;
}

/**
 * Calculates Investment Rate.
 * Investment Rate = Ad Spend / Attributed Sales
 * 
 * @param adSpend - Total ad spend
 * @param attributedSales - Total attributed sales
 * @returns Investment rate as decimal, or null if cannot be calculated
 */
export function calculateInvestmentRate(
  adSpend: number | null,
  attributedSales: number | null
): number | null {
  if (adSpend === null || attributedSales === null || attributedSales === 0) {
    return null;
  }
  return adSpend / attributedSales;
}

/**
 * Calculates Gross Margin in dollars.
 * Gross Margin $ = Attributed Sales × Effective Margin %
 * 
 * @param attributedSales - Total attributed sales
 * @param effectiveMarginPercent - Effective margin as decimal
 * @returns Gross margin in dollars, or null if cannot be calculated
 */
export function calculateGrossMarginDollars(
  attributedSales: number | null,
  effectiveMarginPercent: number | null
): number | null {
  if (attributedSales === null || effectiveMarginPercent === null) {
    return null;
  }
  return attributedSales * effectiveMarginPercent;
}

/**
 * Calculates Profit After Ads.
 * Profit = Gross Margin $ - Ad Spend - Promo Costs
 * 
 * @param grossMarginDollars - Gross margin in dollars
 * @param adSpend - Total ad spend
 * @param promoCosts - Promotional costs (defaults to 0 if null)
 * @returns Profit after ads, or null if cannot be calculated
 */
export function calculateProfitAfterAds(
  grossMarginDollars: number | null,
  adSpend: number | null,
  promoCosts: number | null
): number | null {
  if (grossMarginDollars === null || adSpend === null) {
    return null;
  }
  const promo = promoCosts || 0;
  return grossMarginDollars - adSpend - promo;
}

/**
 * Calculates Margin After Ads as percentage of attributed sales.
 * Margin After Ads % = Profit After Ads / Attributed Sales
 * 
 * @param profitAfterAds - Profit after ads
 * @param attributedSales - Total attributed sales
 * @returns Margin as percentage (decimal), or null if cannot be calculated
 */
export function calculateMarginAfterAds(
  profitAfterAds: number | null,
  attributedSales: number | null
): number | null {
  if (profitAfterAds === null || attributedSales === null || attributedSales === 0) {
    return null;
  }
  return profitAfterAds / attributedSales;
}

/**
 * Calculates Breakeven ROAS.
 * Breakeven ROAS = 1 / Effective Margin %
 * 
 * @param effectiveMarginPercent - Effective margin as decimal
 * @returns Breakeven ROAS, or null if cannot be calculated
 */
export function calculateBreakevenROAS(
  effectiveMarginPercent: number | null
): number | null {
  if (effectiveMarginPercent === null || effectiveMarginPercent === 0) {
    return null;
  }
  return 1 / effectiveMarginPercent;
}

/**
 * Calculates margin dollars per dollar of ad spend.
 * Margin per $1 = Gross Margin $ / Ad Spend
 * 
 * @param grossMarginDollars - Gross margin in dollars
 * @param adSpend - Total ad spend
 * @returns Margin per dollar, or null if cannot be calculated
 */
export function calculateMarginPerDollarSpend(
  grossMarginDollars: number | null,
  adSpend: number | null
): number | null {
  if (grossMarginDollars === null || adSpend === null || adSpend === 0) {
    return null;
  }
  return grossMarginDollars / adSpend;
}

/**
 * Calculates cost per unit sold (CPU).
 * CPU = Ad Spend / Units Sold
 * 
 * @param adSpend - Total ad spend
 * @param unitsSold - Number of units sold
 * @returns Cost per unit, or null if cannot be calculated
 */
export function calculateCostPerUnit(
  adSpend: number | null,
  unitsSold: number | null
): number | null {
  if (adSpend === null || unitsSold === null || unitsSold === 0) {
    return null;
  }
  return adSpend / unitsSold;
}

/**
 * Calculates revenue per unit.
 * Revenue per Unit = Attributed Sales / Units Sold
 * 
 * @param attributedSales - Total attributed sales
 * @param unitsSold - Number of units sold
 * @returns Revenue per unit, or null if cannot be calculated
 */
export function calculateRevenuePerUnit(
  attributedSales: number | null,
  unitsSold: number | null
): number | null {
  if (attributedSales === null || unitsSold === null || unitsSold === 0) {
    return null;
  }
  return attributedSales / unitsSold;
}

/**
 * Calculates profit per unit after ads.
 * Profit per Unit = Profit After Ads / Units Sold
 * 
 * @param profitAfterAds - Total profit after ads
 * @param unitsSold - Number of units sold
 * @returns Profit per unit, or null if cannot be calculated
 */
export function calculateProfitPerUnitAfterAds(
  profitAfterAds: number | null,
  unitsSold: number | null
): number | null {
  if (profitAfterAds === null || unitsSold === null || unitsSold === 0) {
    return null;
  }
  return profitAfterAds / unitsSold;
}

/**
 * Calculates margin per unit.
 * Margin per Unit = Gross Margin $ / Units Sold
 * 
 * @param grossMarginDollars - Gross margin in dollars
 * @param unitsSold - Number of units sold
 * @returns Margin per unit, or null if cannot be calculated
 */
export function calculateMarginPerUnit(
  grossMarginDollars: number | null,
  unitsSold: number | null
): number | null {
  if (grossMarginDollars === null || unitsSold === null || unitsSold === 0) {
    return null;
  }
  return grossMarginDollars / unitsSold;
}

/**
 * Calculates Instacart commission in dollars.
 * Commission $ = Attributed Sales × Commission %
 * 
 * @param attributedSales - Total attributed sales
 * @param commissionPercent - Commission percentage
 * @returns Commission in dollars, or null if cannot be calculated
 */
export function calculateInstacartCommission(
  attributedSales: number | null,
  commissionPercent: number | null
): number | null {
  if (attributedSales === null || commissionPercent === null) {
    return null;
  }
  const normalizedCommission = normalizePercentageInput(commissionPercent);
  if (normalizedCommission === null) return null;
  
  return attributedSales * normalizedCommission;
}

/**
 * Calculates total costs including all fees and expenses.
 * Total Costs = Ad Spend + Instacart Commission + Promo Costs + (Other Costs $ from margin reduction)
 * 
 * @param adSpend - Total ad spend
 * @param instacartCommission - Instacart commission in dollars
 * @param promoCosts - Promotional costs
 * @param attributedSales - Total attributed sales
 * @param otherCostsPercent - Other costs as percentage
 * @returns Total costs, or null if cannot be calculated
 */
export function calculateTotalCosts(
  adSpend: number | null,
  instacartCommission: number | null,
  promoCosts: number | null,
  attributedSales: number | null,
  otherCostsPercent: number | null
): number | null {
  if (adSpend === null) return null;
  
  const commission = instacartCommission || 0;
  const promo = promoCosts || 0;
  
  let otherCostsDollars = 0;
  if (attributedSales !== null && otherCostsPercent !== null) {
    const normalizedOther = normalizePercentageInput(otherCostsPercent);
    if (normalizedOther !== null) {
      otherCostsDollars = attributedSales * normalizedOther;
    }
  }
  
  return adSpend + commission + promo + otherCostsDollars;
}

/**
 * Calculates net profit after all costs including Instacart commission.
 * Net Profit = Gross Margin $ - Ad Spend - Instacart Commission - Promo Costs
 * 
 * @param grossMarginDollars - Gross margin in dollars
 * @param adSpend - Total ad spend
 * @param instacartCommission - Instacart commission in dollars
 * @param promoCosts - Promotional costs
 * @returns Net profit, or null if cannot be calculated
 */
export function calculateNetProfit(
  grossMarginDollars: number | null,
  adSpend: number | null,
  instacartCommission: number | null,
  promoCosts: number | null
): number | null {
  if (grossMarginDollars === null || adSpend === null) {
    return null;
  }
  
  const commission = instacartCommission || 0;
  const promo = promoCosts || 0;
  
  return grossMarginDollars - adSpend - commission - promo;
}

/**
 * Compares actual ROAS to target ROAS.
 * 
 * @param actualROAS - Actual ROAS achieved
 * @param targetROAS - Target ROAS goal
 * @returns Difference (positive means above target)
 */
export function compareROASToTarget(
  actualROAS: number | null,
  targetROAS: number | null
): number | null {
  if (actualROAS === null || targetROAS === null) {
    return null;
  }
  return actualROAS - targetROAS;
}

/**
 * Determines performance indicator based on ROAS vs target.
 * 
 * @param actualROAS - Actual ROAS achieved
 * @param targetROAS - Target ROAS goal
 * @returns Performance indicator
 */
export function getPerformanceIndicator(
  actualROAS: number | null,
  targetROAS: number | null
): 'above' | 'below' | 'on-target' | 'no-target' {
  if (targetROAS === null || actualROAS === null) {
    return 'no-target';
  }
  
  const difference = actualROAS - targetROAS;
  const tolerance = 0.1; // 10% tolerance for "on-target"
  
  if (Math.abs(difference) <= tolerance) {
    return 'on-target';
  }
  
  return difference > 0 ? 'above' : 'below';
}

// ========================================
// Phase 1: Engagement Metrics
// ========================================

/**
 * Calculates Click-Through Rate (CTR).
 * CTR = (Clicks / Impressions) × 100%
 * 
 * @param clicks - Number of clicks
 * @param impressions - Number of impressions
 * @returns CTR as decimal (e.g., 0.05 for 5%)
 */
export function calculateCTR(
  clicks: number | null,
  impressions: number | null
): number | null {
  if (clicks === null || impressions === null || impressions === 0) {
    return null;
  }
  return clicks / impressions;
}

/**
 * Calculates Cost Per Click (CPC).
 * CPC = Ad Spend / Clicks
 * 
 * @param adSpend - Total ad spend
 * @param clicks - Number of clicks
 * @returns Cost per click in dollars
 */
export function calculateCPC(
  adSpend: number | null,
  clicks: number | null
): number | null {
  if (adSpend === null || clicks === null || clicks === 0) {
    return null;
  }
  return adSpend / clicks;
}

/**
 * Calculates Cost Per Thousand Impressions (CPM).
 * CPM = (Ad Spend / Impressions) × 1000
 * 
 * @param adSpend - Total ad spend
 * @param impressions - Number of impressions
 * @returns CPM in dollars
 */
export function calculateCPM(
  adSpend: number | null,
  impressions: number | null
): number | null {
  if (adSpend === null || impressions === null || impressions === 0) {
    return null;
  }
  return (adSpend / impressions) * 1000;
}

/**
 * Calculates Conversion Rate (Click to Order).
 * Conversion Rate = (Orders / Clicks) × 100%
 * 
 * @param orders - Number of orders
 * @param clicks - Number of clicks
 * @returns Conversion rate as decimal
 */
export function calculateConversionRate(
  orders: number | null,
  clicks: number | null
): number | null {
  if (orders === null || clicks === null || clicks === 0) {
    return null;
  }
  return orders / clicks;
}

/**
 * Calculates Cost Per Order (CPO).
 * CPO = Ad Spend / Orders
 * 
 * @param adSpend - Total ad spend
 * @param orders - Number of orders
 * @returns Cost per order in dollars
 */
export function calculateCPO(
  adSpend: number | null,
  orders: number | null
): number | null {
  if (adSpend === null || orders === null || orders === 0) {
    return null;
  }
  return adSpend / orders;
}

/**
 * Calculates Average Order Value (AOV).
 * AOV = Attributed Sales / Orders
 * 
 * @param attributedSales - Total attributed sales
 * @param orders - Number of orders
 * @returns Average order value in dollars
 */
export function calculateAOV(
  attributedSales: number | null,
  orders: number | null
): number | null {
  if (attributedSales === null || orders === null || orders === 0) {
    return null;
  }
  return attributedSales / orders;
}

/**
 * Calculates Units Per Order.
 * Units per Order = Units Sold / Orders
 * 
 * @param unitsSold - Total units sold
 * @param orders - Number of orders
 * @returns Average units per order
 */
export function calculateUnitsPerOrder(
  unitsSold: number | null,
  orders: number | null
): number | null {
  if (unitsSold === null || orders === null || orders === 0) {
    return null;
  }
  return unitsSold / orders;
}

// ========================================
// Phase 1: Customer Acquisition Metrics
// ========================================

/**
 * Calculates New to Brand (NTB) Sales.
 * NTB Sales = Attributed Sales × NTB %
 * 
 * @param attributedSales - Total attributed sales
 * @param ntbPercent - NTB percentage
 * @returns NTB sales in dollars
 */
export function calculateNTBSales(
  attributedSales: number | null,
  ntbPercent: number | null
): number | null {
  if (attributedSales === null || ntbPercent === null) {
    return null;
  }
  const normalizedNTB = normalizePercentageInput(ntbPercent);
  if (normalizedNTB === null) return null;
  
  return attributedSales * normalizedNTB;
}

/**
 * Calculates Repeat Customer Sales.
 * Repeat Sales = Attributed Sales - NTB Sales
 * 
 * @param attributedSales - Total attributed sales
 * @param ntbSales - NTB sales
 * @returns Repeat customer sales in dollars
 */
export function calculateRepeatSales(
  attributedSales: number | null,
  ntbSales: number | null
): number | null {
  if (attributedSales === null || ntbSales === null) {
    return null;
  }
  return attributedSales - ntbSales;
}

/**
 * Calculates Customer Acquisition Cost (CAC).
 * CAC = Ad Spend × NTB %
 * This is the portion of ad spend used to acquire new customers
 * 
 * @param adSpend - Total ad spend
 * @param ntbPercent - NTB percentage
 * @returns CAC in dollars
 */
export function calculateCAC(
  adSpend: number | null,
  ntbPercent: number | null
): number | null {
  if (adSpend === null || ntbPercent === null) {
    return null;
  }
  const normalizedNTB = normalizePercentageInput(ntbPercent);
  if (normalizedNTB === null) return null;
  
  return adSpend * normalizedNTB;
}

/**
 * Calculates CAC Per New Customer.
 * CAC per Customer = (Ad Spend × NTB %) / New Customers
 * 
 * @param adSpend - Total ad spend
 * @param ntbPercent - NTB percentage
 * @param newCustomers - Number of new customers acquired
 * @returns CAC per customer in dollars
 */
export function calculateCACPerCustomer(
  adSpend: number | null,
  ntbPercent: number | null,
  newCustomers: number | null
): number | null {
  if (adSpend === null || ntbPercent === null || newCustomers === null || newCustomers === 0) {
    return null;
  }
  const normalizedNTB = normalizePercentageInput(ntbPercent);
  if (normalizedNTB === null) return null;
  
  const cac = adSpend * normalizedNTB;
  return cac / newCustomers;
}

/**
 * Calculates Repeat Customer Percentage.
 * Repeat % = 100% - NTB %
 * 
 * @param ntbPercent - NTB percentage
 * @returns Repeat customer percentage as decimal
 */
export function calculateRepeatPercent(
  ntbPercent: number | null
): number | null {
  if (ntbPercent === null) return null;
  
  const normalizedNTB = normalizePercentageInput(ntbPercent);
  if (normalizedNTB === null) return null;
  
  return 1 - normalizedNTB;
}

/**
 * Orchestrates all calculations and returns complete metrics.
 * 
 * @param inputs - Calculator input values
 * @returns All calculated metrics
 */
export function calculateAllMetrics(inputs: CalculatorInputs): CalculatedMetrics {
  const effectiveMarginPercent = calculateEffectiveMargin(
    inputs.grossMarginPercent,
    inputs.otherCostsPercent
  );
  
  const grossMarginDollars = calculateGrossMarginDollars(
    inputs.attributedSales,
    effectiveMarginPercent
  );
  
  // Instacart does not take commission
  const instacartCommissionDollars = null;
  
  const profitAfterAds = calculateProfitAfterAds(
    grossMarginDollars,
    inputs.adSpend,
    inputs.promoCosts
  );
  
  const netProfit = calculateNetProfit(
    grossMarginDollars,
    inputs.adSpend,
    null, // No commission
    inputs.promoCosts
  );
  
  const totalCosts = calculateTotalCosts(
    inputs.adSpend,
    null, // No commission
    inputs.promoCosts,
    inputs.attributedSales,
    inputs.otherCostsPercent
  );
  
  const actualROAS = calculateROAS(inputs.attributedSales, inputs.adSpend);
  const roasVsTarget = compareROASToTarget(actualROAS, inputs.targetROAS);
  
  // Phase 1: NTB Metrics
  const ntbSales = calculateNTBSales(inputs.attributedSales, inputs.ntbPercent);
  const repeatSales = calculateRepeatSales(inputs.attributedSales, ntbSales);
  
  return {
    roas: actualROAS,
    investmentRate: calculateInvestmentRate(inputs.adSpend, inputs.attributedSales),
    effectiveMarginPercent,
    grossMarginDollars,
    profitAfterAds,
    marginAfterAdsPercent: calculateMarginAfterAds(profitAfterAds, inputs.attributedSales),
    breakevenROAS: calculateBreakevenROAS(effectiveMarginPercent),
    marginPerDollarSpend: calculateMarginPerDollarSpend(grossMarginDollars, inputs.adSpend),
    // Unit-level metrics
    costPerUnit: calculateCostPerUnit(inputs.adSpend, inputs.unitsSold),
    revenuePerUnit: calculateRevenuePerUnit(inputs.attributedSales, inputs.unitsSold),
    profitPerUnitAfterAds: calculateProfitPerUnitAfterAds(profitAfterAds, inputs.unitsSold),
    marginPerUnit: calculateMarginPerUnit(grossMarginDollars, inputs.unitsSold),
    // Advanced cost breakdown
    instacartCommissionDollars,
    totalCosts,
    netProfit,
    // Comparison metrics
    roasVsTarget,
    performanceIndicator: getPerformanceIndicator(actualROAS, inputs.targetROAS),
    // Phase 1: Engagement Metrics
    ctr: calculateCTR(inputs.clicks, inputs.impressions),
    cpc: calculateCPC(inputs.adSpend, inputs.clicks),
    cpm: calculateCPM(inputs.adSpend, inputs.impressions),
    conversionRate: calculateConversionRate(inputs.orders, inputs.clicks),
    cpo: calculateCPO(inputs.adSpend, inputs.orders),
    aov: calculateAOV(inputs.attributedSales, inputs.orders),
    unitsPerOrder: calculateUnitsPerOrder(inputs.unitsSold, inputs.orders),
    // Phase 1: Customer Acquisition
    ntbSales,
    repeatSales,
    cac: calculateCAC(inputs.adSpend, inputs.ntbPercent),
    repeatCustomerPercent: calculateRepeatPercent(inputs.ntbPercent),
  };
}

/**
 * Determines profitability status based on margin after ads percentage.
 * 
 * @param marginAfterAdsPercent - Margin after ads as decimal (e.g., 0.15 for 15%)
 * @returns Profitability status
 */
export function getProfitabilityStatus(
  marginAfterAdsPercent: number | null
): ProfitabilityStatus {
  if (marginAfterAdsPercent === null) {
    return 'waiting';
  }
  
  if (marginAfterAdsPercent < 0) {
    return 'unprofitable';
  }
  
  if (marginAfterAdsPercent <= 0.1) {
    return 'near-breakeven';
  }
  
  return 'profitable';
}
