import React, { useState } from 'react';
import { CalculatorInputs } from '../types';

interface SaveLoadToolsProps {
  inputs: CalculatorInputs;
  onLoad: (inputs: CalculatorInputs) => void;
}

interface SavedCalculation {
  name: string;
  date: string;
  inputs: CalculatorInputs;
}

/**
 * Save and load calculations to browser storage
 */
export const SaveLoadTools: React.FC<SaveLoadToolsProps> = ({ inputs, onLoad }) => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>(() => {
    const saved = localStorage.getItem('instacart-saved-calculations');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  const saveCalculation = () => {
    if (!saveName.trim()) {
      alert('Please enter a name for this calculation');
      return;
    }

    const newCalculation: SavedCalculation = {
      name: saveName,
      date: new Date().toISOString(),
      inputs: inputs
    };

    const updated = [...savedCalculations, newCalculation];
    localStorage.setItem('instacart-saved-calculations', JSON.stringify(updated));
    setSavedCalculations(updated);
    setSaveName('');
    setShowSaveDialog(false);
    
    alert(`Saved as "${saveName}"!`);
  };

  const loadCalculation = (calc: SavedCalculation) => {
    if (confirm(`Load "${calc.name}"? This will replace your current inputs.`)) {
      onLoad(calc.inputs);
      setShowLoadDialog(false);
      alert(`Loaded "${calc.name}"!`);
    }
  };

  const deleteCalculation = (index: number) => {
    const calc = savedCalculations[index];
    if (confirm(`Delete "${calc.name}"?`)) {
      const updated = savedCalculations.filter((_, i) => i !== index);
      localStorage.setItem('instacart-saved-calculations', JSON.stringify(updated));
      setSavedCalculations(updated);
    }
  };

  const autoSave = () => {
    localStorage.setItem('instacart-autosave', JSON.stringify(inputs));
    alert('Auto-saved current inputs!');
  };

  const loadAutoSave = () => {
    const saved = localStorage.getItem('instacart-autosave');
    if (saved) {
      if (confirm('Load auto-saved data? This will replace your current inputs.')) {
        onLoad(JSON.parse(saved));
        alert('Loaded auto-saved data!');
      }
    } else {
      alert('No auto-saved data found');
    }
  };

  return (
    <div className="save-load-tools">
      <h3>💾 Save & Load</h3>
      
      <div className="save-load-buttons">
        <button onClick={() => setShowSaveDialog(true)} className="btn-save">
          💾 Save Calculation
        </button>
        <button onClick={() => setShowLoadDialog(true)} className="btn-load" disabled={savedCalculations.length === 0}>
          📂 Load Calculation ({savedCalculations.length})
        </button>
        <button onClick={autoSave} className="btn-autosave">
          ⚡ Quick Save
        </button>
        <button onClick={loadAutoSave} className="btn-autoload">
          ⚡ Quick Load
        </button>
      </div>

      {showSaveDialog && (
        <div className="save-dialog">
          <div className="dialog-content">
            <h4>Save Calculation</h4>
            <input
              type="text"
              placeholder="Enter name (e.g., 'Q4 Campaign')"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && saveCalculation()}
            />
            <div className="dialog-buttons">
              <button onClick={() => setShowSaveDialog(false)} className="btn-cancel">
                Cancel
              </button>
              <button onClick={saveCalculation} className="btn-confirm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoadDialog && (
        <div className="load-dialog">
          <div className="dialog-content">
            <h4>Load Calculation</h4>
            <div className="saved-list">
              {savedCalculations.length === 0 ? (
                <p>No saved calculations yet</p>
              ) : (
                savedCalculations.map((calc, index) => (
                  <div key={index} className="saved-item">
                    <div className="saved-info">
                      <strong>{calc.name}</strong>
                      <span className="saved-date">
                        {new Date(calc.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="saved-actions">
                      <button onClick={() => loadCalculation(calc)} className="btn-load-item">
                        Load
                      </button>
                      <button onClick={() => deleteCalculation(index)} className="btn-delete-item">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button onClick={() => setShowLoadDialog(false)} className="btn-close-dialog">
              Close
            </button>
          </div>
        </div>
      )}

      <p className="save-note">
        💡 Quick Save for temporary storage. Named saves persist across sessions.
      </p>
    </div>
  );
};
