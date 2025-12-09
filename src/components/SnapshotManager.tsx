import React, { useState } from 'react';
import { Product, ProductSnapshot } from '../types';
import { createSnapshot } from '../utils/historical';

interface SnapshotManagerProps {
  products: Product[];
  snapshots: ProductSnapshot[];
  onAddSnapshot: (snapshot: ProductSnapshot) => void;
  onDeleteSnapshot: (snapshotId: string) => void;
}

/**
 * Component for managing product snapshots
 */
export const SnapshotManager: React.FC<SnapshotManagerProps> = ({
  products,
  snapshots,
  onAddSnapshot,
  onDeleteSnapshot,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [snapshotDate, setSnapshotDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [snapshotNotes, setSnapshotNotes] = useState<string>('');
  const [showForm, setShowForm] = useState(false);

  const handleCreateSnapshot = () => {
    if (!selectedProductId) {
      alert('Please select a product');
      return;
    }

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    const snapshot = createSnapshot(product, snapshotDate, snapshotNotes || undefined);
    onAddSnapshot(snapshot);
    
    // Reset form
    setSnapshotNotes('');
    setShowForm(false);
  };

  const getProductName = (productId: string) => {
    return products.find(p => p.id === productId)?.name || 'Unknown Product';
  };

  const groupedSnapshots = snapshots.reduce((acc, snapshot) => {
    if (!acc[snapshot.productId]) {
      acc[snapshot.productId] = [];
    }
    acc[snapshot.productId].push(snapshot);
    return acc;
  }, {} as Record<string, ProductSnapshot[]>);

  // Sort snapshots by date descending
  Object.values(groupedSnapshots).forEach(snaps => {
    snaps.sort((a, b) => b.timestamp - a.timestamp);
  });

  return (
    <div className="snapshot-manager">
      <div className="snapshot-header">
        <h3>📸 Historical Snapshots</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-create-snapshot"
        >
          {showForm ? 'Cancel' : '+ Create Snapshot'}
        </button>
      </div>

      {showForm && (
        <div className="snapshot-form">
          <h4>Create New Snapshot</h4>
          
          <div className="form-row">
            <label>Product:</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Select Product --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Date:</label>
            <input
              type="date"
              value={snapshotDate}
              onChange={(e) => setSnapshotDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label>Notes (optional):</label>
            <input
              type="text"
              value={snapshotNotes}
              onChange={(e) => setSnapshotNotes(e.target.value)}
              placeholder="e.g., Week ending 12/7, Post-holiday sale"
              className="form-input"
            />
          </div>

          <button onClick={handleCreateSnapshot} className="btn-save-snapshot">
            Save Snapshot
          </button>
        </div>
      )}

      <div className="snapshots-list">
        {Object.keys(groupedSnapshots).length === 0 ? (
          <div className="no-snapshots">
            <p>No snapshots yet. Create your first snapshot to track performance over time!</p>
          </div>
        ) : (
          Object.entries(groupedSnapshots).map(([productId, productSnapshots]) => (
            <div key={productId} className="product-snapshots">
              <h4 className="product-snapshots-title">
                {getProductName(productId)}
                <span className="snapshot-count">({productSnapshots.length} snapshots)</span>
              </h4>
              
              <div className="snapshots-timeline">
                {productSnapshots.map(snapshot => (
                  <div key={snapshot.id} className="snapshot-card">
                    <div className="snapshot-date">
                      {new Date(snapshot.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    
                    <div className="snapshot-metrics">
                      <div className="snapshot-metric">
                        <span className="metric-label">ROAS:</span>
                        <span className="metric-value">
                          {snapshot.metrics.roas?.toFixed(2) || '—'}
                        </span>
                      </div>
                      <div className="snapshot-metric">
                        <span className="metric-label">Profit:</span>
                        <span className={`metric-value ${(snapshot.metrics.profitAfterAds || 0) >= 0 ? 'positive' : 'negative'}`}>
                          ${Math.abs(snapshot.metrics.profitAfterAds || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="snapshot-metric">
                        <span className="metric-label">Sales:</span>
                        <span className="metric-value">
                          ${(snapshot.inputs.attributedSales || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {snapshot.notes && (
                      <div className="snapshot-notes">
                        <em>{snapshot.notes}</em>
                      </div>
                    )}

                    <button
                      onClick={() => onDeleteSnapshot(snapshot.id)}
                      className="btn-delete-snapshot"
                      title="Delete snapshot"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {snapshots.length > 0 && (
        <div className="snapshot-tips">
          <h5>💡 Pro Tips:</h5>
          <ul>
            <li>Take weekly snapshots to track trends over time</li>
            <li>Add notes for context (promos, holidays, changes)</li>
            <li>Use the Trends view to visualize performance</li>
          </ul>
        </div>
      )}
    </div>
  );
};
