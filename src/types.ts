/**
 * Input data structure for the calculator
 */
export interface CalculatorInputs {
  adSpend: number | null;
  attributedSales: number | null;
  grossMarginPercent: number | null;
  otherCostsPercent: number | null;
  promoCosts: number | null;
  unitsSold: number | null;
  instacartCommissionPercent: number | null;
  targetROAS: number | null;
  // Phase 1: Engagement Metrics
  impressions: number | null;
  clicks: number | null;
  orders: number | null;
  // Phase 1: Customer Acquisition
  ntbPercent: number | null; // New to Brand % (safe to share as percentage)
  // Phase 2.5: UPC-level data
  upcs?: UPCData[]; // Array of UPC-level breakdowns
}

/**
 * Individual UPC/SKU level data
 */
export interface UPCData {
  id: string;
  upcCode: string; // UPC identifier
  productName: string;
  unitsSold: number | null;
  adSpend: number | null;
  attributedSales: number | null;
  grossMarginPercent: number | null;
  instacartCommissionPercent: number | null;
}

/**
 * Calculated metrics from the inputs
 */
export interface CalculatedMetrics {
  roas: number | null;
  investmentRate: number | null;
  effectiveMarginPercent: number | null;
  grossMarginDollars: number | null;
  profitAfterAds: number | null;
  marginAfterAdsPercent: number | null;
  breakevenROAS: number | null;
  marginPerDollarSpend: number | null;
  // Unit-level metrics
  costPerUnit: number | null;
  revenuePerUnit: number | null;
  profitPerUnitAfterAds: number | null;
  marginPerUnit: number | null;
  // Advanced cost breakdown
  instacartCommissionDollars: number | null;
  totalCosts: number | null;
  netProfit: number | null;
  // Comparison metrics
  roasVsTarget: number | null;
  performanceIndicator: 'above' | 'below' | 'on-target' | 'no-target';
  // Phase 1: Engagement Metrics
  ctr: number | null; // Click-Through Rate
  cpc: number | null; // Cost Per Click
  cpm: number | null; // Cost Per Thousand Impressions
  conversionRate: number | null; // Orders / Clicks
  cpo: number | null; // Cost Per Order
  aov: number | null; // Average Order Value
  unitsPerOrder: number | null;
  // Phase 1: Customer Acquisition Metrics
  ntbSales: number | null; // New to Brand Sales
  repeatSales: number | null;
  cac: number | null; // Customer Acquisition Cost (total spend * NTB%)
  repeatCustomerPercent: number | null;
}

/**
 * UPC-level calculated metrics
 */
export interface UPCMetrics {
  id: string;
  upcCode: string;
  productName: string;
  // Input values
  unitsSold: number;
  adSpend: number;
  attributedSales: number;
  grossMarginPercent: number;
  // Calculated values
  roas: number | null;
  grossMarginDollars: number | null;
  instacartCommissionDollars: number | null;
  profitAfterAds: number | null;
  marginPercent: number | null;
  revenuePerUnit: number | null;
  costPerUnit: number | null;
  profitPerUnit: number | null;
}

/**
 * What-if scenario inputs
 */
export interface ScenarioInputs {
  adSpendChange: number; // percentage change
  targetMarginPercent: number | null;
}

/**
 * Cost breakdown for visualization
 */
export interface CostBreakdown {
  adSpend: number;
  instacartCommission: number;
  otherCosts: number;
  promoCosts: number;
  cogs: number; // Cost of Goods Sold
}

/**
 * Status of profitability
 */
export type ProfitabilityStatus = 'unprofitable' | 'near-breakeven' | 'profitable' | 'waiting';

/**
 * Individual product/SKU data structure
 */
export interface Product {
  id: string;
  name: string;
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
}

/**
 * Portfolio-level aggregated metrics
 */
export interface PortfolioMetrics {
  totalAdSpend: number;
  totalAttributedSales: number;
  totalUnits: number;
  totalOrders: number;
  totalProfit: number;
  portfolioROAS: number | null;
  portfolioMarginPercent: number | null;
  averageCPC: number | null;
  averageAOV: number | null;
  weightedNTBPercent: number | null;
  productCount: number;
}

/**
 * Snapshot of product data at a specific point in time
 */
export interface ProductSnapshot {
  id: string;
  productId: string;
  productName: string;
  date: string; // ISO format: YYYY-MM-DD
  timestamp: number;
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
  notes?: string;
}

/**
 * Trend data for a specific metric over time
 */
export interface TrendData {
  date: string;
  value: number;
  label?: string;
}

/**
 * Comparison between two time periods
 */
export interface PeriodComparison {
  metric: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
}
