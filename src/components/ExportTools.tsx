import React from 'react';
import * as XLSX from 'xlsx';
import { CalculatorInputs, CalculatedMetrics, UPCMetrics } from '../types';

interface ExportToolsProps {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
  upcMetrics: UPCMetrics[];
}

/**
 * Export tools for downloading data as Excel or CSV
 */
export const ExportTools: React.FC<ExportToolsProps> = ({ inputs, metrics, upcMetrics }) => {
  
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Campaign Summary
    const summaryData = [
      ['Instacart Campaign Analysis'],
      [''],
      ['Campaign Metrics', ''],
      ['Ad Spend', `$${inputs.adSpend?.toLocaleString() || 0}`],
      ['Attributed Sales', `$${inputs.attributedSales?.toLocaleString() || 0}`],
      ['ROAS', `${metrics.roas?.toFixed(2) || 0}x`],
      ['Gross Margin $', `$${metrics.grossMarginDollars?.toLocaleString() || 0}`],
      ['Profit After Ads', `$${metrics.profitAfterAds?.toLocaleString() || 0}`],
      ['Profit Margin %', `${metrics.marginAfterAdsPercent?.toFixed(2) || 0}%`],
      [''],
      ['Engagement Metrics', ''],
      ['Impressions', inputs.impressions?.toLocaleString() || 0],
      ['Clicks', inputs.clicks?.toLocaleString() || 0],
      ['CTR', `${metrics.ctr?.toFixed(2) || 0}%`],
      ['CPC', `$${metrics.cpc?.toFixed(2) || 0}`],
      ['CPM', `$${metrics.cpm?.toFixed(2) || 0}`],
      [''],
      ['Customer Acquisition', ''],
      ['NTB %', `${inputs.ntbPercent || 0}%`],
      ['CAC', `$${metrics.cac?.toFixed(2) || 0}`],
    ];
    
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Campaign Summary');

    // Sheet 2: UPC Analysis (if available)
    if (upcMetrics.length > 0) {
      const upcData = [
        ['UPC', 'Product Name', 'Units Sold', 'Ad Spend', 'Sales', 'ROAS', 'Gross Margin $', 'Profit', 'Margin %', 'Revenue/Unit', 'Cost/Unit', 'Profit/Unit']
      ];
      
      upcMetrics.forEach(m => {
        upcData.push([
          m.upcCode || '',
          m.productName || '',
          String(m.unitsSold),
          String(m.adSpend),
          String(m.attributedSales),
          m.roas !== null ? m.roas.toFixed(2) : '0',
          m.grossMarginDollars !== null ? m.grossMarginDollars.toFixed(2) : '0',
          m.profitAfterAds !== null ? m.profitAfterAds.toFixed(2) : '0',
          m.marginPercent !== null ? m.marginPercent.toFixed(2) : '0',
          m.revenuePerUnit !== null ? m.revenuePerUnit.toFixed(2) : '0',
          m.costPerUnit !== null ? m.costPerUnit.toFixed(2) : '0',
          m.profitPerUnit !== null ? m.profitPerUnit.toFixed(2) : '0'
        ]);
      });

      // Add totals row
      const totalSpend = upcMetrics.reduce((sum, m) => sum + (m.adSpend || 0), 0);
      const totalSales = upcMetrics.reduce((sum, m) => sum + (m.attributedSales || 0), 0);
      const totalUnits = upcMetrics.reduce((sum, m) => sum + (m.unitsSold || 0), 0);
      const totalProfit = upcMetrics.reduce((sum, m) => sum + (m.profitAfterAds || 0), 0);
      const avgROAS = totalSpend > 0 ? totalSales / totalSpend : 0;
      
      upcData.push([
        'TOTAL',
        '',
        String(totalUnits),
        String(totalSpend),
        String(totalSales),
        avgROAS.toFixed(2),
        '',
        '',
        totalProfit.toFixed(2),
        '',
        '',
        '',
        ''
      ]);

      const upcSheet = XLSX.utils.aoa_to_sheet(upcData);
      XLSX.utils.book_append_sheet(workbook, upcSheet, 'UPC Analysis');
    }

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `instacart-analysis-${date}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
  };

  const exportToCSV = () => {
    if (upcMetrics.length === 0) {
      alert('No UPC data to export. Add UPCs first!');
      return;
    }

    const headers = ['UPC', 'Product Name', 'Units Sold', 'Ad Spend', 'Sales', 'ROAS', 'Profit', 'Margin %'];
    const rows = upcMetrics.map(m => [
      m.upcCode || '',
      m.productName || '',
      String(m.unitsSold),
      String(m.adSpend),
      String(m.attributedSales),
      m.roas !== null ? m.roas.toFixed(2) : '0',
      m.profitAfterAds !== null ? m.profitAfterAds.toFixed(2) : '0',
      m.marginPercent !== null ? m.marginPercent.toFixed(2) : '0'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instacart-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="export-tools">
      <h3>📥 Export & Share</h3>
      <div className="export-buttons">
        <button onClick={exportToExcel} className="btn-export btn-excel">
          📊 Export to Excel
        </button>
        <button onClick={exportToCSV} className="btn-export btn-csv" disabled={upcMetrics.length === 0}>
          📄 Export to CSV
        </button>
        <button onClick={printReport} className="btn-export btn-print">
          🖨️ Print Report
        </button>
      </div>
      <p className="export-note">
        Excel includes full analysis. CSV contains UPC data only.
      </p>
    </div>
  );
};
