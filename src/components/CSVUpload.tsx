import React, { useState } from 'react';
import { UPCData } from '../types';

interface CSVUploadProps {
  onImportUPCs: (upcs: UPCData[]) => void;
  defaultMargin: number | null;
}

interface ParsedRow {
  status: string;
  product: string;
  upc: string;
  spend: number;
  attributedSales: number;
  attributedQuantities: number;
  roas: number;
  impressions: number;
  clicks: number;
  ctr: number;
  ntbPercent: number;
}

/**
 * Component for uploading Instacart Ads Manager CSV exports
 */
export const CSVUpload: React.FC<CSVUploadProps> = ({
  onImportUPCs,
  defaultMargin,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<ParsedRow[]>([]);
  const [globalMargin, setGlobalMargin] = useState<number>(defaultMargin || 40);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (csvText: string): ParsedRow[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV file is empty or invalid');
    }

    // Parse CSV line with proper quote handling
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      
      return result;
    };

    const headers = parseCSVLine(lines[0].toLowerCase());
    
    // Find column indices
    const getIndex = (name: string) => {
      const variations = {
        'status': ['status'],
        'product': ['product', 'product_name'],
        'upc': ['upc', 'upc_code'],
        'spend': ['spend', 'ad_spend'],
        'sales': ['attributed_sales', 'sales'],
        'units': ['attributed_quantities', 'units', 'quantity'],
        'roas': ['roas'],
        'impressions': ['impressions'],
        'clicks': ['clicks'],
        'ctr': ['ctr', 'click_through_rate'],
        'ntb_percent': ['percent_ntb_attributed_sales', 'ntb_percent', 'ntb_%']
      };

      for (const variant of variations[name as keyof typeof variations] || []) {
        const index = headers.findIndex(h => h.includes(variant));
        if (index !== -1) return index;
      }
      return -1;
    };

    const indices = {
      status: getIndex('status'),
      product: getIndex('product'),
      upc: getIndex('upc'),
      spend: getIndex('spend'),
      sales: getIndex('sales'),
      units: getIndex('units'),
      roas: getIndex('roas'),
      impressions: getIndex('impressions'),
      clicks: getIndex('clicks'),
      ctr: getIndex('ctr'),
      ntbPercent: getIndex('ntb_percent'),
    };

    // Validate required columns
    if (indices.upc === -1 || indices.product === -1) {
      throw new Error('CSV must contain UPC and Product columns');
    }

    const parsed: ParsedRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);
      
      const status = indices.status !== -1 ? values[indices.status] : 'active';
      const product = values[indices.product];
      const upc = values[indices.upc];
      
      // Skip if no UPC or product
      if (!upc || !product) continue;
      
      // Skip paused/unavailable products
      if (status && (status.includes('paused') || status.includes('unavailable'))) {
        continue;
      }

      const spend = indices.spend !== -1 ? parseFloat(values[indices.spend]) || 0 : 0;
      const sales = indices.sales !== -1 ? parseFloat(values[indices.sales]) || 0 : 0;
      const units = indices.units !== -1 ? parseFloat(values[indices.units]) || 0 : 0;
      const clicks = indices.clicks !== -1 ? parseFloat(values[indices.clicks]) || 0 : 0;
      const impressions = indices.impressions !== -1 ? parseFloat(values[indices.impressions]) || 0 : 0;
      
      // Skip products with no activity
      if (spend === 0 && sales === 0) {
        continue;
      }

      // Calculate CTR from clicks/impressions if not provided, otherwise use CSV value
      let finalCTR = 0;
      if (indices.ctr !== -1 && values[indices.ctr]) {
        // CTR provided in CSV (as percentage like 2.5 = 2.5%)
        finalCTR = (parseFloat(values[indices.ctr]) || 0) / 100;
      } else if (clicks > 0 && impressions > 0) {
        // Calculate CTR from clicks and impressions
        finalCTR = clicks / impressions; // Already a decimal
      }

      parsed.push({
        status,
        product,
        upc,
        spend,
        attributedSales: sales,
        attributedQuantities: units,
        roas: indices.roas !== -1 ? parseFloat(values[indices.roas]) || 0 : 0,
        impressions,
        clicks,
        ctr: finalCTR,
        ntbPercent: indices.ntbPercent !== -1 ? (parseFloat(values[indices.ntbPercent]) || 0) / 100 : 0, // Convert from percentage to decimal
      });
    }

    return parsed;
  };

  const handleFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      const text = await file.text();
      const parsed = parseCSV(text);
      
      if (parsed.length === 0) {
        throw new Error('No active products found in CSV');
      }

      setPreviewData(parsed);
      setShowPreview(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleFile(file);
    } else {
      setError('Please upload a CSV file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleImport = () => {
    const upcs: UPCData[] = previewData.map((row, index) => ({
      id: `upc-import-${Date.now()}-${index}`,
      upcCode: row.upc,
      productName: row.product,
      unitsSold: row.attributedQuantities > 0 ? row.attributedQuantities : null,
      adSpend: row.spend > 0 ? row.spend : null,
      attributedSales: row.attributedSales > 0 ? row.attributedSales : null,
      grossMarginPercent: globalMargin,
      instacartCommissionPercent: null, // Instacart does not take commission
    }));

    onImportUPCs(upcs);
    setShowPreview(false);
    setPreviewData([]);
  };

  const handleCancel = () => {
    setShowPreview(false);
    setPreviewData([]);
    setError(null);
  };

  return (
    <div className="csv-upload">
      {!showPreview ? (
        <div className="upload-container">
          <h4>📁 Import from Instacart Ads Manager</h4>
          <p className="upload-description">
            Upload your Instacart CSV export and we'll automatically populate all UPC data.
            You just need to enter your margins!
          </p>

          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className="drop-icon">📤</div>
            <p className="drop-text">
              Drag & drop your Instacart CSV here
            </p>
            <p className="drop-subtext">or</p>
            <label className="file-input-label">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              <span className="btn-browse">Browse Files</span>
            </label>
          </div>

          {isProcessing && (
            <div className="processing-indicator">
              <div className="spinner"></div>
              <p>Processing CSV...</p>
            </div>
          )}

          {error && (
            <div className="upload-error">
              ⚠️ {error}
            </div>
          )}

          <div className="upload-help">
            <h5>💡 How to export from Instacart:</h5>
            <ol>
              <li>Go to Instacart Ads Manager</li>
              <li>Navigate to your campaign</li>
              <li>Click "Export" or "Download"</li>
              <li>Select date range</li>
              <li>Download CSV file</li>
              <li>Upload it here!</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="preview-container">
          <h4>📊 Preview Import ({previewData.length} Products)</h4>
          
          <div className="margin-input-section">
            <label>
              <strong>Global Gross Margin %</strong>
              <span className="margin-note">This will be applied to all UPCs</span>
            </label>
            <input
              type="number"
              value={globalMargin}
              onChange={(e) => setGlobalMargin(parseFloat(e.target.value))}
              min="0"
              max="100"
              step="0.1"
              placeholder="40"
            />
            <span className="input-hint">Enter as 40 for 40%</span>
          </div>

          <div className="preview-table-container">
            <table className="preview-table">
              <thead>
                <tr>
                  <th>UPC</th>
                  <th>Product</th>
                  <th>Units</th>
                  <th>Spend</th>
                  <th>Sales</th>
                  <th>ROAS</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 10).map((row, index) => (
                  <tr key={index}>
                    <td className="upc-cell">{row.upc}</td>
                    <td className="product-cell">{row.product}</td>
                    <td>{row.attributedQuantities.toFixed(0)}</td>
                    <td>${row.spend.toFixed(2)}</td>
                    <td>${row.attributedSales.toFixed(2)}</td>
                    <td>{row.roas.toFixed(2)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 10 && (
              <p className="preview-note">
                Showing first 10 of {previewData.length} products
              </p>
            )}
          </div>

          <div className="preview-summary">
            <div className="summary-stat">
              <span className="stat-label">Total Products:</span>
              <span className="stat-value">{previewData.length}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Spend:</span>
              <span className="stat-value">
                ${previewData.reduce((sum, r) => sum + r.spend, 0).toLocaleString()}
              </span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Total Sales:</span>
              <span className="stat-value">
                ${previewData.reduce((sum, r) => sum + r.attributedSales, 0).toLocaleString()}
              </span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Avg ROAS:</span>
              <span className="stat-value">
                {(previewData.reduce((sum, r) => sum + r.roas, 0) / previewData.length).toFixed(2)}x
              </span>
            </div>
          </div>

          <div className="preview-actions">
            <button onClick={handleCancel} className="btn-cancel-import">
              Cancel
            </button>
            <button onClick={handleImport} className="btn-import">
              Import {previewData.length} Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
