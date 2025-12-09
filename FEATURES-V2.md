# 🚀 Version 2.0 - Enhanced Features

## What's New in V2.0

The calculator now includes advanced features for deeper analysis and scenario planning!

---

## 🆕 New Features

### 1. Unit-Level Metrics ✅

**What it does:** Calculate profitability on a per-unit basis

**New Inputs:**
- Units Sold (optional)

**New Metrics:**
- **Cost Per Unit (CPU)** - How much ad spend per unit sold
- **Revenue Per Unit** - Average selling price
- **Margin Per Unit** - Gross margin earned per unit
- **Profit Per Unit After Ads** - Net profit per unit after all costs

**When to use:** Great for understanding unit economics and comparing products

---

### 2. Advanced Cost Breakdown ✅

**What it does:** Visual breakdown of all costs as percentage of sales

**New Inputs:**
- Instacart Commission % (typically 15-30%)

**New Features:**
- Detailed cost table showing each cost type
- Visual bar chart showing cost structure
- Net profit after ALL costs (including commission)
- Percentage of sales for each cost

**When to use:** When you need to understand your complete cost structure

---

### 3. Performance Comparison ✅

**What it does:** Compare your actual performance against targets

**New Inputs:**
- Target ROAS

**New Features:**
- Visual comparison: Target vs Actual ROAS
- Performance indicator (Above/Below/On-Target)
- Difference calculations
- Actionable insights based on performance

**When to use:** When you have specific ROAS goals to hit

---

### 4. What-If Scenarios ✅

**What it does:** Model different scenarios to plan your strategy

**Scenario 1: Adjust Ad Spend**
- Interactive slider to change ad spend by -50% to +50%
- See real-time impact on profit and margin
- Compare current vs scenario side-by-side

**Scenario 2: Target Margin Calculator**
- Enter desired margin percentage
- Calculate required ROAS to hit that margin
- See if your current ROAS meets the requirement

**When to use:** 
- Planning budget changes
- Setting performance targets
- Understanding what-if impacts

---

## 📊 Feature Comparison

| Feature | V1.0 | V2.0 |
|---------|------|------|
| Basic profitability | ✅ | ✅ |
| ROAS calculation | ✅ | ✅ |
| Margin analysis | ✅ | ✅ |
| **Unit-level metrics** | ❌ | ✅ |
| **Instacart commission** | ❌ | ✅ |
| **Cost breakdown visual** | ❌ | ✅ |
| **Target comparison** | ❌ | ✅ |
| **What-if scenarios** | ❌ | ✅ |
| **Interactive planning** | ❌ | ✅ |

---

## 🎯 How to Use New Features

### Getting Started

All new features are **optional** - the calculator still works great with just the basic inputs!

### Unit Metrics

1. Enter your **Units Sold** in Section 1
2. Scroll down to see the **Unit-Level Analysis** section
3. Compare CPU, revenue/unit, and profit/unit

### Cost Breakdown

1. Add **Instacart Commission %** in Section 2 (typically 15-30%)
2. View the **Cost Breakdown** section
3. See visual bar showing all costs as % of sales

### Performance Comparison

1. Enter **Target ROAS** in Section 4
2. View **Performance vs Target** section
3. Get insights on whether you're hitting goals

### What-If Scenarios

**Scenario 1:**
1. Use the slider to adjust ad spend up or down
2. Watch profit and margin change in real-time
3. Find the optimal ad spend level

**Scenario 2:**
1. Enter your target margin % (e.g., 15%)
2. See what ROAS you need to achieve it
3. Compare to your current ROAS

---

## 💡 Pro Tips

### For Unit Economics
- CPU should be lower than your margin per unit
- Track CPU trends over time to optimize
- Compare CPU across products

### For Cost Analysis
- Commission typically 15-30% on Instacart
- Total marketing costs (ads + commission + promo) should be < 40% of sales for most categories
- COGS + all costs should leave healthy net profit margin

### For Performance Tracking
- Set realistic ROAS targets based on your margins
- Within 10% of target = "on target"
- Review weekly and adjust campaigns

### For Scenario Planning
- Test reducing spend by 20-30% first
- Calculate required ROAS before committing to margin targets
- Model best/worst case scenarios

---

## 📈 Example Workflow

**Planning a New Campaign:**

1. Enter expected sales and units
2. Enter your margins and Instacart commission
3. Set target ROAS in Section 4
4. Use What-If scenarios to model different spend levels
5. Find the spend level that hits your margin target
6. Launch campaign with that budget

**Analyzing Current Campaign:**

1. Enter actual numbers (spend, sales, units)
2. Review Cost Breakdown to see where money goes
3. Check Performance vs Target
4. Use What-If to see if reducing spend improves profit
5. Adjust campaign based on insights

---

## 🔢 New Calculations

### Cost Per Unit
```
CPU = Ad Spend / Units Sold
```

### Revenue Per Unit
```
Revenue/Unit = Attributed Sales / Units Sold
```

### Margin Per Unit
```
Margin/Unit = Gross Margin $ / Units Sold
```

### Instacart Commission
```
Commission $ = Attributed Sales × Commission %
```

### Net Profit (with commission)
```
Net Profit = Gross Margin $ - Ad Spend - Commission - Promo
```

### Required ROAS for Target Margin
```
Required ROAS = 1 / (Effective Margin % - Target Margin %)
```

---

## 🎨 Visual Enhancements

- Color-coded performance indicators
- Interactive sliders for what-if analysis
- Visual cost breakdown bar chart
- Side-by-side scenario comparison
- Responsive design for all new components

---

## 🚀 Coming Soon

Potential future enhancements:
- ✨ Multi-campaign comparison
- 📊 Charts and trend visualizations
- 💾 Save/load scenarios
- 📤 Export to Excel/PDF
- 🔄 Historical tracking
- 🎯 A/B test calculator

---

## 💻 Technical Updates

**New Components:**
- UnitMetrics.tsx
- CostBreakdown.tsx
- PerformanceComparison.tsx
- WhatIfScenarios.tsx

**New Calculations:**
- calculateCostPerUnit
- calculateRevenuePerUnit
- calculateMarginPerUnit
- calculateInstacartCommission
- calculateNetProfit
- compareROASToTarget
- getPerformanceIndicator

**Enhanced Styling:**
- Responsive layouts for all new features
- Interactive elements (sliders, inputs)
- Color-coded insights
- Visual data representations

---

**Enjoy the new features! The calculator is now even more powerful for optimizing your Instacart advertising.** 🎉
