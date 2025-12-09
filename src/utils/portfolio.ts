import { Product, PortfolioMetrics } from '../types';

/**
 * Calculates portfolio-level aggregated metrics from multiple products
 */
export function calculatePortfolioMetrics(products: Product[]): PortfolioMetrics {
  if (products.length === 0) {
    return {
      totalAdSpend: 0,
      totalAttributedSales: 0,
      totalUnits: 0,
      totalOrders: 0,
      totalProfit: 0,
      portfolioROAS: null,
      portfolioMarginPercent: null,
      averageCPC: null,
      averageAOV: null,
      weightedNTBPercent: null,
      productCount: 0,
    };
  }

  let totalAdSpend = 0;
  let totalAttributedSales = 0;
  let totalUnits = 0;
  let totalOrders = 0;
  let totalProfit = 0;
  let totalClicks = 0;
  let totalNTBSales = 0;

  products.forEach(product => {
    totalAdSpend += product.inputs.adSpend || 0;
    totalAttributedSales += product.inputs.attributedSales || 0;
    totalUnits += product.inputs.unitsSold || 0;
    totalOrders += product.inputs.orders || 0;
    totalProfit += product.metrics.profitAfterAds || 0;
    totalClicks += product.inputs.clicks || 0;
    totalNTBSales += product.metrics.ntbSales || 0;
  });

  const portfolioROAS = totalAdSpend > 0 ? totalAttributedSales / totalAdSpend : null;
  const portfolioMarginPercent = totalAttributedSales > 0 ? totalProfit / totalAttributedSales : null;
  const averageCPC = totalClicks > 0 ? totalAdSpend / totalClicks : null;
  const averageAOV = totalOrders > 0 ? totalAttributedSales / totalOrders : null;
  const weightedNTBPercent = totalAttributedSales > 0 ? totalNTBSales / totalAttributedSales : null;

  return {
    totalAdSpend,
    totalAttributedSales,
    totalUnits,
    totalOrders,
    totalProfit,
    portfolioROAS,
    portfolioMarginPercent,
    averageCPC,
    averageAOV,
    weightedNTBPercent,
    productCount: products.length,
  };
}

/**
 * Sorts products by a specific metric
 */
export function sortProducts(
  products: Product[],
  sortBy: 'roas' | 'profit' | 'sales' | 'spend' | 'ntb' | 'units',
  direction: 'asc' | 'desc' = 'desc'
): Product[] {
  const sorted = [...products].sort((a, b) => {
    let aValue = 0;
    let bValue = 0;

    switch (sortBy) {
      case 'roas':
        aValue = a.metrics.roas || 0;
        bValue = b.metrics.roas || 0;
        break;
      case 'profit':
        aValue = a.metrics.profitAfterAds || 0;
        bValue = b.metrics.profitAfterAds || 0;
        break;
      case 'sales':
        aValue = a.inputs.attributedSales || 0;
        bValue = b.inputs.attributedSales || 0;
        break;
      case 'spend':
        aValue = a.inputs.adSpend || 0;
        bValue = b.inputs.adSpend || 0;
        break;
      case 'ntb':
        aValue = a.metrics.ntbSales || 0;
        bValue = b.metrics.ntbSales || 0;
        break;
      case 'units':
        aValue = a.inputs.unitsSold || 0;
        bValue = b.inputs.unitsSold || 0;
        break;
    }

    return direction === 'desc' ? bValue - aValue : aValue - bValue;
  });

  return sorted;
}

/**
 * Gets top N performers by a specific metric
 */
export function getTopPerformers(
  products: Product[],
  metric: 'roas' | 'profit' | 'sales',
  count: number = 5
): Product[] {
  return sortProducts(products, metric, 'desc').slice(0, count);
}

/**
 * Gets bottom N performers by a specific metric
 */
export function getBottomPerformers(
  products: Product[],
  metric: 'roas' | 'profit' | 'sales',
  count: number = 5
): Product[] {
  return sortProducts(products, metric, 'asc').slice(0, count);
}

/**
 * Filters products based on criteria
 */
export function filterProducts(
  products: Product[],
  filters: {
    minROAS?: number;
    maxROAS?: number;
    minProfit?: number;
    maxProfit?: number;
    profitable?: boolean;
  }
): Product[] {
  return products.filter(product => {
    if (filters.minROAS !== undefined && (product.metrics.roas || 0) < filters.minROAS) {
      return false;
    }
    if (filters.maxROAS !== undefined && (product.metrics.roas || 0) > filters.maxROAS) {
      return false;
    }
    if (filters.minProfit !== undefined && (product.metrics.profitAfterAds || 0) < filters.minProfit) {
      return false;
    }
    if (filters.maxProfit !== undefined && (product.metrics.profitAfterAds || 0) > filters.maxProfit) {
      return false;
    }
    if (filters.profitable !== undefined) {
      const isProfitable = (product.metrics.profitAfterAds || 0) > 0;
      if (filters.profitable !== isProfitable) {
        return false;
      }
    }
    return true;
  });
}
