import React, { useState } from 'react';
import { UPCData } from '../types';
import { CSVUpload } from './CSVUpload';

interface UPCManagerProps {
  upcs: UPCData[];
  onAddUPC: (upc: UPCData) => void;
  onUpdateUPC: (upc: UPCData) => void;
  onDeleteUPC: (id: string) => void;
  onImportUPCs: (upcs: UPCData[]) => void;
  defaultMargin: number | null;
}

/**
 * Component for managing UPC-level data entry
 */
export const UPCManager: React.FC<UPCManagerProps> = ({
  upcs,
  onAddUPC,
  onUpdateUPC,
  onDeleteUPC,
  onImportUPCs,
  defaultMargin,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UPCData>>({
    upcCode: '',
    productName: '',
    unitsSold: null,
    adSpend: null,
    attributedSales: null,
    grossMarginPercent: null,
    instacartCommissionPercent: null // No commission,
  });

  const handleAdd = () => {
    if (!formData.upcCode || !formData.productName) {
      alert('Please enter UPC Code and Product Name');
      return;
    }

    const newUPC: UPCData = {
      id: `upc-${Date.now()}`,
      upcCode: formData.upcCode || '',
      productName: formData.productName || '',
      unitsSold: formData.unitsSold,
      adSpend: formData.adSpend,
      attributedSales: formData.attributedSales,
      grossMarginPercent: formData.grossMarginPercent,
      instacartCommissionPercent: formData.instacartCommissionPercent || null // No commission,
    };

    onAddUPC(newUPC);
    resetForm();
  };

  const handleUpdate = () => {
    if (editingId && formData.upcCode && formData.productName) {
      const updatedUPC: UPCData = {
        id: editingId,
        upcCode: formData.upcCode,
        productName: formData.productName,
        unitsSold: formData.unitsSold,
        adSpend: formData.adSpend,
        attributedSales: formData.attributedSales,
        grossMarginPercent: formData.grossMarginPercent,
        instacartCommissionPercent: formData.instacartCommissionPercent || null // No commission,
      };

      onUpdateUPC(updatedUPC);
      resetForm();
    }
  };

  const startEdit = (upc: UPCData) => {
    setEditingId(upc.id);
    setFormData(upc);
    setIsAdding(true);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      upcCode: '',
      productName: '',
      unitsSold: null,
      adSpend: null,
      attributedSales: null,
      grossMarginPercent: null,
      instacartCommissionPercent: null // No commission,
    });
  };

  const handleCSVImport = (importedUPCs: UPCData[]) => {
    onImportUPCs(importedUPCs);
    setShowCSVUpload(false);
  };

  const handleInputChange = (field: keyof UPCData, value: string) => {
    if (field === 'upcCode' || field === 'productName') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      const numValue = value === '' ? null : parseFloat(value);
      setFormData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  return (
    <div className="upc-manager">
      <div className="upc-header">
        <h3>📊 UPC-Level Analysis</h3>
        <p className="upc-subtitle">Break down spend and margins by individual UPC</p>
      </div>

      {showCSVUpload ? (
        <CSVUpload
          onImportUPCs={handleCSVImport}
          defaultMargin={defaultMargin}
        />
      ) : (
        <>
          {upcs.length > 0 && (
        <div className="upc-list">
          <table className="upc-table">
            <thead>
              <tr>
                <th>UPC Code</th>
                <th>Product</th>
                <th>Units</th>
                <th>Spend</th>
                <th>Sales</th>
                <th>Margin %</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcs.map(upc => (
                <tr key={upc.id}>
                  <td className="upc-code">{upc.upcCode}</td>
                  <td className="product-name">{upc.productName}</td>
                  <td>{upc.unitsSold?.toLocaleString() || '—'}</td>
                  <td>${upc.adSpend?.toLocaleString() || '—'}</td>
                  <td>${upc.attributedSales?.toLocaleString() || '—'}</td>
                  <td>
                    {upc.grossMarginPercent 
                      ? `${(upc.grossMarginPercent > 1 ? upc.grossMarginPercent : upc.grossMarginPercent * 100).toFixed(0)}%`
                      : '—'}
                  </td>
                  <td className="actions">
                    <button onClick={() => startEdit(upc)} className="btn-edit">✏️</button>
                    <button onClick={() => onDeleteUPC(upc.id)} className="btn-delete-upc">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAdding ? (
        <div className="add-upc-buttons">
          <button onClick={() => setShowCSVUpload(true)} className="btn-import-csv">
            📁 Import from CSV
          </button>
          <button onClick={() => setIsAdding(true)} className="btn-add-upc">
            + Add UPC Manually
          </button>
        </div>
      ) : (
        <div className="upc-form">
          <h4>{editingId ? 'Edit UPC' : 'Add New UPC'}</h4>
          
          <div className="form-row">
            <div className="form-field">
              <label>UPC Code *</label>
              <input
                type="text"
                value={formData.upcCode || ''}
                onChange={(e) => handleInputChange('upcCode', e.target.value)}
                placeholder="e.g., 012345678905"
              />
            </div>
            
            <div className="form-field">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.productName || ''}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., Cola 12oz 6-pack"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Units Sold</label>
              <input
                type="number"
                value={formData.unitsSold ?? ''}
                onChange={(e) => handleInputChange('unitsSold', e.target.value)}
                placeholder="150"
              />
            </div>

            <div className="form-field">
              <label>Ad Spend ($)</label>
              <input
                type="number"
                value={formData.adSpend ?? ''}
                onChange={(e) => handleInputChange('adSpend', e.target.value)}
                placeholder="500"
              />
            </div>

            <div className="form-field">
              <label>Attributed Sales ($)</label>
              <input
                type="number"
                value={formData.attributedSales ?? ''}
                onChange={(e) => handleInputChange('attributedSales', e.target.value)}
                placeholder="2000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Gross Margin (%)</label>
              <input
                type="number"
                value={formData.grossMarginPercent ?? ''}
                onChange={(e) => handleInputChange('grossMarginPercent', e.target.value)}
                placeholder="40"
              />
              <span className="field-hint">Product margin before fees</span>
            </div>

            <div className="form-field">
              <label>Instacart Commission (%)</label>
              <input
                type="number"
                value={formData.instacartCommissionPercent ?? ''}
                onChange={(e) => handleInputChange('instacartCommissionPercent', e.target.value)}
                placeholder="20"
              />
              <span className="field-hint">Defaults from campaign level</span>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={resetForm} className="btn-cancel">
              Cancel
            </button>
            <button 
              onClick={editingId ? handleUpdate : handleAdd} 
              className="btn-save"
            >
              {editingId ? 'Update UPC' : 'Add UPC'}
            </button>
          </div>
        </div>
      )}

      {upcs.length === 0 && !isAdding && (
        <div className="upc-empty">
          <p>No UPCs added yet.</p>
          <p className="empty-hint">Import from CSV or add manually to analyze your products.</p>
        </div>
      )}
        </>
      )}
    </div>
  );
};
