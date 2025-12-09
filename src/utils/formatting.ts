/**
 * Formats a number as USD currency with thousand separators.
 * 
 * @param value - Number to format
 * @returns Formatted string (e.g., "$12,345.67")
 */
export function formatCurrency(value: number | null): string {
  if (value === null || isNaN(value) || !isFinite(value)) {
    return '—';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a decimal as a percentage.
 * 
 * @param value - Decimal value (e.g., 0.184 for 18.4%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string (e.g., "18.4%")
 */
export function formatPercent(value: number | null, decimals: number = 1): string {
  if (value === null || isNaN(value) || !isFinite(value)) {
    return '—';
  }
  
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Formats a ratio/multiplier with fixed decimal places.
 * 
 * @param value - Ratio value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "2.50")
 */
export function formatRatio(value: number | null, decimals: number = 2): string {
  if (value === null || isNaN(value) || !isFinite(value)) {
    return '—';
  }
  
  return value.toFixed(decimals);
}
