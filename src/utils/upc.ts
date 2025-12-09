import { UPCData, UPCMetrics } from '../types';

/**
 * Calculate all metrics for a single UPC
 */
export function calculateUPCMetrics(upc: UPCData): UPCMetrics {
  const unitsSold = upc.unitsSold || 0;
  const adSpend = upc.adSpend || 0;
  const attributedSales = upc.attributedSales || 0;
  const grossMarginPercent = upc.grossMarginPercent || 0;
  const instacartCommissionPercent = upc.instacartCommissionPercent || 0;

  // Convert percentages if needed (handle both 40 and 0.4 formats)
  const marginPct = grossMarginPercent > 1 ? grossMarginPercent / 100 : grossMarginPercent;
  const commissionPct = instacartCommissionPercent > 1 ? instacartCommissionPercent / 100 : instacartCommissionPercent;

  // Calculate ROAS
  const roas = adSpend > 0 ? attributedSales / adSpend : null;

  // Calculate gross margin dollars
  const grossMarginDollars = attributedSales * marginPct;

  // Calculate Instacart commission
  const instacartCommissionDollars = attributedSales * commissionPct;

  // Calculate profit after ads
  const profitAfterAds = grossMarginDollars - instacartCommissionDollars - adSpend;

  // Calculate margin percentage
  const marginPercent = attributedSales > 0 ? profitAfterAds / attributedSales : null;

  // Unit-level metrics
  const revenuePerUnit = unitsSold > 0 ? attributedSales / unitsSold : null;
  const costPerUnit = unitsSold > 0 ? adSpend / unitsSold : null;
  const profitPerUnit = unitsSold > 0 ? profitAfterAds / unitsSold : null;

  return {
    id: upc.id,
    upcCode: upc.upcCode,
    productName: upc.productName,
    unitsSold,
    adSpend,
    attributedSales,
    grossMarginPercent: marginPct,
    roas,
    grossMarginDollars,
    instacartCommissionDollars,
    profitAfterAds,
    marginPercent,
    revenuePerUnit,
    costPerUnit,
    profitPerUnit,
  };
}

/**
 * Calculate metrics for all UPCs
 */
export function calculateAllUPCMetrics(upcs: UPCData[]): UPCMetrics[] {
  return upcs.map(upc => calculateUPCMetrics(upc));
}

/**
 * Aggregate UPC-level data to campaign totals
 */
export function aggregateUPCData(upcMetrics: UPCMetrics[]) {
  const totals = {
    totalAdSpend: 0,
    totalAttributedSales: 0,
    totalUnits: 0,
    totalGrossMargin: 0,
    totalCommission: 0,
    totalProfit: 0,
  };

  upcMetrics.forEach(upc => {
    totals.totalAdSpend += upc.adSpend;
    totals.totalAttributedSales += upc.attributedSales;
    totals.totalUnits += upc.unitsSold;
    totals.totalGrossMargin += upc.grossMarginDollars || 0;
    totals.totalCommission += upc.instacartCommissionDollars || 0;
    totals.totalProfit += upc.profitAfterAds || 0;
  });

  return totals;
}

/**
 * Sort UPCs by a specific metric
 */
export function sortUPCs(
  upcs: UPCMetrics[],
  sortBy: 'roas' | 'profit' | 'sales' | 'units' | 'margin',
  direction: 'asc' | 'desc' = 'desc'
): UPCMetrics[] {
  const sorted = [...upcs].sort((a, b) => {
    let aValue = 0;
    let bValue = 0;

    switch (sortBy) {
      case 'roas':
        aValue = a.roas || 0;
        bValue = b.roas || 0;
        break;
      case 'profit':
        aValue = a.profitAfterAds || 0;
        bValue = b.profitAfterAds || 0;
        break;
      case 'sales':
        aValue = a.attributedSales;
        bValue = b.attributedSales;
        break;
      case 'units':
        aValue = a.unitsSold;
        bValue = b.unitsSold;
        break;
      case 'margin':
        aValue = a.marginPercent || 0;
        bValue = b.marginPercent || 0;
        break;
    }

    return direction === 'desc' ? bValue - aValue : aValue - bValue;
  });

  return sorted;
}

/**
 * Find top performing UPCs
 */
export function getTopUPCs(upcs: UPCMetrics[], count: number = 5): UPCMetrics[] {
  return sortUPCs(upcs, 'profit', 'desc').slice(0, count);
}

/**
 * Find underperforming UPCs
 */
export function getUnderperformingUPCs(upcs: UPCMetrics[]): UPCMetrics[] {
  return upcs.filter(upc => (upc.profitAfterAds || 0) < 0);
}

/**
 * Calculate weighted average margin across UPCs
 */
export function calculateWeightedMargin(upcs: UPCMetrics[]): number | null {
  const totalSales = upcs.reduce((sum, upc) => sum + upc.attributedSales, 0);
  
  if (totalSales === 0) return null;

  const weightedMargin = upcs.reduce((sum, upc) => {
    const weight = upc.attributedSales / totalSales;
    const margin = upc.marginPercent || 0;
    return sum + (margin * weight);
  }, 0);

  return weightedMargin;
}
