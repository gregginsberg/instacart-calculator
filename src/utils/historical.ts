import { ProductSnapshot, TrendData, PeriodComparison, Product } from '../types';

/**
 * Creates a snapshot of a product's current state
 */
export function createSnapshot(
  product: Product,
  date?: string,
  notes?: string
): ProductSnapshot {
  const snapshotDate = date || new Date().toISOString().split('T')[0];
  
  return {
    id: `snapshot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    productId: product.id,
    productName: product.name,
    date: snapshotDate,
    timestamp: new Date(snapshotDate).getTime(),
    inputs: { ...product.inputs },
    metrics: { ...product.metrics },
    notes,
  };
}

/**
 * Gets all snapshots for a specific product
 */
export function getProductSnapshots(
  snapshots: ProductSnapshot[],
  productId: string
): ProductSnapshot[] {
  return snapshots
    .filter(s => s.productId === productId)
    .sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Gets snapshots within a date range
 */
export function getSnapshotsInRange(
  snapshots: ProductSnapshot[],
  startDate: string,
  endDate: string
): ProductSnapshot[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return snapshots.filter(s => s.timestamp >= start && s.timestamp <= end);
}

/**
 * Extracts trend data for a specific metric
 */
export function extractTrendData(
  snapshots: ProductSnapshot[],
  metric: 'roas' | 'profit' | 'sales' | 'spend' | 'margin' | 'ctr' | 'ntb'
): TrendData[] {
  return snapshots.map(snapshot => {
    let value = 0;
    
    switch (metric) {
      case 'roas':
        value = snapshot.metrics.roas || 0;
        break;
      case 'profit':
        value = snapshot.metrics.profitAfterAds || 0;
        break;
      case 'sales':
        value = snapshot.inputs.attributedSales || 0;
        break;
      case 'spend':
        value = snapshot.inputs.adSpend || 0;
        break;
      case 'margin':
        value = (snapshot.metrics.marginAfterAdsPercent || 0) * 100;
        break;
      case 'ctr':
        value = (snapshot.metrics.ctr || 0) * 100;
        break;
      case 'ntb':
        value = snapshot.inputs.ntbPercent || 0;
        if (value > 0 && value < 1) value *= 100; // Convert to percentage
        break;
    }
    
    return {
      date: snapshot.date,
      value,
      label: snapshot.productName,
    };
  });
}

/**
 * Compares two time periods
 */
export function comparePeriods(
  currentSnapshots: ProductSnapshot[],
  previousSnapshots: ProductSnapshot[],
  metrics: Array<'roas' | 'profit' | 'sales' | 'spend' | 'margin'>
): PeriodComparison[] {
  const comparisons: PeriodComparison[] = [];
  
  metrics.forEach(metric => {
    const currentData = extractTrendData(currentSnapshots, metric);
    const previousData = extractTrendData(previousSnapshots, metric);
    
    const currentAvg = currentData.reduce((sum, d) => sum + d.value, 0) / (currentData.length || 1);
    const previousAvg = previousData.reduce((sum, d) => sum + d.value, 0) / (previousData.length || 1);
    
    const change = currentAvg - previousAvg;
    const changePercent = previousAvg !== 0 ? (change / previousAvg) * 100 : 0;
    
    let trend: 'up' | 'down' | 'flat' = 'flat';
    if (Math.abs(changePercent) > 2) {
      trend = change > 0 ? 'up' : 'down';
    }
    
    comparisons.push({
      metric: metric.charAt(0).toUpperCase() + metric.slice(1),
      current: currentAvg,
      previous: previousAvg,
      change,
      changePercent,
      trend,
    });
  });
  
  return comparisons;
}

/**
 * Gets the most recent snapshot for each product
 */
export function getLatestSnapshots(snapshots: ProductSnapshot[]): ProductSnapshot[] {
  const latestByProduct = new Map<string, ProductSnapshot>();
  
  snapshots.forEach(snapshot => {
    const existing = latestByProduct.get(snapshot.productId);
    if (!existing || snapshot.timestamp > existing.timestamp) {
      latestByProduct.set(snapshot.productId, snapshot);
    }
  });
  
  return Array.from(latestByProduct.values());
}

/**
 * Calculates growth rate between two snapshots
 */
export function calculateGrowthRate(
  current: ProductSnapshot,
  previous: ProductSnapshot,
  metric: 'roas' | 'profit' | 'sales'
): number {
  let currentValue = 0;
  let previousValue = 0;
  
  switch (metric) {
    case 'roas':
      currentValue = current.metrics.roas || 0;
      previousValue = previous.metrics.roas || 0;
      break;
    case 'profit':
      currentValue = current.metrics.profitAfterAds || 0;
      previousValue = previous.metrics.profitAfterAds || 0;
      break;
    case 'sales':
      currentValue = current.inputs.attributedSales || 0;
      previousValue = previous.inputs.attributedSales || 0;
      break;
  }
  
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
}

/**
 * Gets snapshots grouped by week
 */
export function groupSnapshotsByWeek(snapshots: ProductSnapshot[]): Map<string, ProductSnapshot[]> {
  const weeks = new Map<string, ProductSnapshot[]>();
  
  snapshots.forEach(snapshot => {
    const date = new Date(snapshot.timestamp);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!weeks.has(weekKey)) {
      weeks.set(weekKey, []);
    }
    weeks.get(weekKey)!.push(snapshot);
  });
  
  return weeks;
}

/**
 * Identifies products with improving/declining trends
 */
export function identifyTrends(
  snapshots: ProductSnapshot[],
  productId: string,
  lookbackWeeks: number = 4
): {
  trend: 'improving' | 'declining' | 'stable';
  roasTrend: number;
  profitTrend: number;
} {
  const productSnapshots = getProductSnapshots(snapshots, productId)
    .slice(-lookbackWeeks);
  
  if (productSnapshots.length < 2) {
    return { trend: 'stable', roasTrend: 0, profitTrend: 0 };
  }
  
  // Simple linear regression slope
  const roasValues = productSnapshots.map(s => s.metrics.roas || 0);
  const profitValues = productSnapshots.map(s => s.metrics.profitAfterAds || 0);
  
  const roasTrend = calculateSlope(roasValues);
  const profitTrend = calculateSlope(profitValues);
  
  const avgTrend = (roasTrend + profitTrend) / 2;
  
  if (avgTrend > 0.05) return { trend: 'improving', roasTrend, profitTrend };
  if (avgTrend < -0.05) return { trend: 'declining', roasTrend, profitTrend };
  return { trend: 'stable', roasTrend, profitTrend };
}

/**
 * Helper: Calculates slope of values (simple trend)
 */
function calculateSlope(values: number[]): number {
  if (values.length < 2) return 0;
  
  const n = values.length;
  const xSum = (n * (n - 1)) / 2; // Sum of 0,1,2,...,n-1
  const ySum = values.reduce((a, b) => a + b, 0);
  const xySum = values.reduce((sum, y, x) => sum + x * y, 0);
  const x2Sum = (n * (n - 1) * (2 * n - 1)) / 6; // Sum of squares
  
  const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
  return slope;
}
