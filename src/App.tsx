import React, { useState, useMemo } from 'react';
import { CalculatorInputs, Product, ProductSnapshot, UPCData } from './types';
import { calculateAllMetrics, getProfitabilityStatus } from './utils/calculations';
import { calculateAllUPCMetrics } from './utils/upc';
import { InputsPanel } from './components/InputsPanel';
import { ResultsSummary } from './components/ResultsSummary';
import { KeyMetrics } from './components/KeyMetrics';
import { UnitMetrics } from './components/UnitMetrics';
import { UnitEconomics } from './components/UnitEconomics';
import { CostBreakdown } from './components/CostBreakdown';
import { PerformanceComparison } from './components/PerformanceComparison';
import { WhatIfScenarios } from './components/WhatIfScenarios';
import { EngagementMetrics } from './components/EngagementMetrics';
import { CustomerMetrics } from './components/CustomerMetrics';
import { MultiProductView } from './components/MultiProductView';
import { HistoricalView } from './components/HistoricalView';
import { UPCManager } from './components/UPCManager';
import { UPCAnalysis } from './components/UPCAnalysis';
import { ExportTools } from './components/ExportTools';
import { SaveLoadTools } from './components/SaveLoadTools';
import { PlanningTools } from './components/PlanningTools';
import { AlertsPanel } from './components/AlertsPanel';
import { ChartsView } from './components/ChartsView';
import './App.css';

/**
 * Main application component
 * Manages state and orchestrates the calculator interface
 */
function App() {
  // State for all calculator inputs
  const [inputs, setInputs] = useState<CalculatorInputs>({
    adSpend: null,
    attributedSales: null,
    grossMarginPercent: null,
    otherCostsPercent: null,
    promoCosts: null,
    unitsSold: null,
    instacartCommissionPercent: null,
    targetROAS: null,
    // Phase 1: Engagement
    impressions: null,
    clicks: null,
    orders: null,
    // Phase 1: Customer Acquisition
    ntbPercent: null, // Can share as percentage (not raw counts)
    // Phase 2.5: UPC data
    upcs: [],
  });

  // Phase 2: Multi-product state
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'single' | 'portfolio' | 'historical'>('single');

  // Phase 3: Historical tracking state
  const [snapshots, setSnapshots] = useState<ProductSnapshot[]>([]);

  /**
   * Updates a single input field
   */
  const handleInputChange = (field: keyof CalculatorInputs, value: number | null) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Adds current inputs as a new product to portfolio
   */
  const handleAddProduct = () => {
    const productName = `Product ${products.length + 1}`;
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: productName,
      inputs: { ...inputs },
      metrics: calculateAllMetrics(inputs),
    };
    setProducts(prev => [...prev, newProduct]);
    setViewMode('portfolio');
  };

  /**
   * Updates an existing product
   */
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  /**
   * Deletes a product from portfolio
   */
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (products.length === 1) {
      setViewMode('single');
    }
  };

  /**
   * Duplicates a product
   */
  const handleDuplicateProduct = (product: Product) => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: `${product.name} (Copy)`,
      inputs: { ...product.inputs },
      metrics: { ...product.metrics },
    };
    setProducts(prev => [...prev, newProduct]);
  };

  /**
   * Switches to a specific product
   */
  const handleSwitchToProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setInputs(product.inputs);
      setViewMode('single');
    }
  };

  /**
   * UPC Management Functions
   */
  const handleAddUPC = (upc: UPCData) => {
    setInputs(prev => ({
      ...prev,
      upcs: [...(prev.upcs || []), upc]
    }));
  };

  const handleUpdateUPC = (updatedUPC: UPCData) => {
    setInputs(prev => ({
      ...prev,
      upcs: (prev.upcs || []).map(upc => 
        upc.id === updatedUPC.id ? updatedUPC : upc
      )
    }));
  };

  const handleDeleteUPC = (upcId: string) => {
    setInputs(prev => ({
      ...prev,
      upcs: (prev.upcs || []).filter(upc => upc.id !== upcId)
    }));
  };

  const handleImportUPCs = (importedUPCs: UPCData[]) => {
    setInputs(prev => ({
      ...prev,
      upcs: [...(prev.upcs || []), ...importedUPCs]
    }));
  };

  /**
   * Adds a new snapshot
   */
  const handleAddSnapshot = (snapshot: ProductSnapshot) => {
    setSnapshots(prev => [...prev, snapshot]);
  };

  /**
   * Deletes a snapshot
   */
  const handleDeleteSnapshot = (snapshotId: string) => {
    setSnapshots(prev => prev.filter(s => s.id !== snapshotId));
  };

  /**
   * Calculate all metrics whenever inputs change
   * Uses useMemo to avoid unnecessary recalculations
   */
  const metrics = useMemo(() => calculateAllMetrics(inputs), [inputs]);

  /**
   * Calculate UPC-level metrics
   */
  const upcMetrics = useMemo(() => 
    calculateAllUPCMetrics(inputs.upcs || []), 
    [inputs.upcs]
  );

  /**
   * Determine profitability status
   */
  const status = useMemo(
    () => getProfitabilityStatus(metrics.marginAfterAdsPercent),
    [metrics.marginAfterAdsPercent]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instacart Profitability Calculator</h1>
        <p className="subtitle">
          Complete analytics for CPG brands: profitability, engagement funnel, customer acquisition & unit economics
        </p>
      </header>

      <main className="app-main">
        <div className="view-mode-toggle">
          <button 
            onClick={() => setViewMode('single')}
            className={`mode-btn ${viewMode === 'single' ? 'active' : ''}`}
          >
            📊 Single Product
          </button>
          <button 
            onClick={() => setViewMode('portfolio')}
            className={`mode-btn ${viewMode === 'portfolio' ? 'active' : ''}`}
          >
            📦 Portfolio ({products.length})
          </button>
          <button 
            onClick={() => setViewMode('historical')}
            className={`mode-btn ${viewMode === 'historical' ? 'active' : ''}`}
          >
            📈 Historical ({snapshots.length})
          </button>
        </div>

        {viewMode === 'single' ? (
          <div className="container">
            <div className="panel-left">
              <InputsPanel
                inputs={inputs}
                onInputChange={handleInputChange}
                calculatedROAS={metrics.roas}
              />
              
              {products.length === 0 && (
                <div className="add-to-portfolio-hint">
                  <button onClick={handleAddProduct} className="btn-add-hint">
                    + Add to Portfolio
                  </button>
                  <p className="hint-text">Save this product to compare multiple SKUs</p>
                </div>
              )}
            </div>

            <div className="panel-right">
              {products.length > 0 && (
                <div className="portfolio-action">
                  <button onClick={handleAddProduct} className="btn-add-to-portfolio">
                    + Add to Portfolio
                  </button>
                </div>
              )}

              <ResultsSummary
                profitAfterAds={metrics.profitAfterAds}
                marginAfterAdsPercent={metrics.marginAfterAdsPercent}
                status={status}
              />

              <AlertsPanel 
                metrics={metrics}
                upcMetrics={upcMetrics}
              />

              <ExportTools
                inputs={inputs}
                metrics={metrics}
                upcMetrics={upcMetrics}
              />

              <SaveLoadTools
                inputs={inputs}
                onLoad={setInputs}
              />

              <PlanningTools
                grossMarginPercent={inputs.grossMarginPercent}
                instacartCommissionPercent={inputs.instacartCommissionPercent}
              />
              
              <PerformanceComparison
                inputs={inputs}
                metrics={metrics}
              />

              <EngagementMetrics metrics={metrics} />

              <CustomerMetrics 
                inputs={inputs}
                metrics={metrics}
              />

              <UPCManager
                upcs={inputs.upcs || []}
                onAddUPC={handleAddUPC}
                onUpdateUPC={handleUpdateUPC}
                onDeleteUPC={handleDeleteUPC}
                onImportUPCs={handleImportUPCs}
                defaultMargin={inputs.grossMarginPercent}
              />

              <UPCAnalysis upcMetrics={upcMetrics} />

              <ChartsView upcMetrics={upcMetrics} />
              
              <KeyMetrics metrics={metrics} />
              
              <UnitMetrics metrics={metrics} />
              
              <UnitEconomics 
                inputs={inputs}
                metrics={metrics}
              />
              
              <CostBreakdown
                inputs={inputs}
                metrics={metrics}
              />

              <WhatIfScenarios
                inputs={inputs}
                currentMetrics={metrics}
              />
            </div>
          </div>
        ) : viewMode === 'portfolio' ? (
          <div className="portfolio-container">
            <MultiProductView
              products={products}
              currentInputs={inputs}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onSwitchToProduct={handleSwitchToProduct}
            />
          </div>
        ) : (
          <div className="historical-container">
            <HistoricalView
              products={products}
              snapshots={snapshots}
              onAddSnapshot={handleAddSnapshot}
              onDeleteSnapshot={handleDeleteSnapshot}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          💡 Pro Tip: Use the What-If Scenarios to plan your ad budget and see how changes affect profitability
        </p>
      </footer>
    </div>
  );
}

export default App;
