# 🎉 Phase 3 - Historical Tracking & Trends

## ✅ What's in Phase 3

Phase 3 adds **time-series analysis** to track product performance over time and identify trends!

---

## 📸 NEW FEATURES

### 1. Snapshot System ⭐⭐⭐

**Take Snapshots:**
- Save product data at any date
- Weekly snapshots for consistent tracking
- Add notes for context (promos, holidays, etc.)
- Unlimited snapshots per product

**What Gets Saved:**
- All input data (spend, sales, units, etc.)
- All calculated metrics (ROAS, profit, margins)
- Date and timestamp
- Optional notes

**Use Cases:**
- Weekly performance tracking
- Pre/post campaign analysis
- Seasonal comparisons
- Year-over-year trends

---

### 2. Historical Timeline

**View All Snapshots:**
- Grouped by product
- Sorted by date (newest first)
- Quick metric view (ROAS, Profit, Sales)
- Expandable notes

**Manage Snapshots:**
- Delete outdated snapshots
- Review historical context
- Track changes over time

---

### 3. Trend Charts 📈

**Visualize Performance:**
- Line chart showing metric over time
- Choose from 7 metrics:
  - ROAS
  - Profit
  - Sales
  - Ad Spend
  - Margin %
  - CTR %
  - NTB %

**Interactive Features:**
- Hover for exact values
- See first vs last value
- % change calculation
- Color-coded trend lines (green up, red down)

**View Options:**
- All products combined
- Individual product trends
- Switch metrics instantly

---

### 4. Performance Insights 💡

**Automatic Trend Detection:**
- **Improving** - Performance trending up
- **Declining** - Performance trending down
- **Stable** - No significant change

**Trend Analysis:**
- ROAS trend slope
- Profit trend slope
- Based on last 4 weeks of data
- Simple linear regression

**Recommendations:**
- Scale budget for improving products
- Optimize declining products
- Maintain stable products

**Summary Dashboard:**
- Count of improving products
- Count of stable products
- Count of declining products
- Quick portfolio health check

---

## 💡 HOW TO USE

### Taking Snapshots

**Weekly Workflow:**

1. **End of Week:**
   - Click "Historical" tab
   - Click "Create Snapshot"

2. **Select Product:**
   - Choose from dropdown
   - Or use "all" for portfolio

3. **Set Date:**
   - Defaults to today
   - Can backdate if needed

4. **Add Notes:**
   - "Week ending 12/7"
   - "Post-Black Friday"
   - "New creative launched"

5. **Save:**
   - Click "Save Snapshot"
   - Snapshot appears in timeline

**Pro Tip:** Take snapshots every Sunday evening to build consistent weekly data!

---

### Viewing Trends

**Access Trend Chart:**
1. Click "Historical" tab
2. Click "Trends" sub-tab
3. Select product (or "all")
4. Choose metric from dropdown

**Interpret Trends:**
- **Green line** = Improving
- **Red line** = Declining
- **Blue line** = Flat/stable
- **Hover** = See exact values

**Best Practices:**
- Need 2+ snapshots minimum
- 4+ snapshots for reliable trends
- Weekly snapshots = clearest picture

---

### Reading Insights

**Trend Classification:**

**Improving:**
- ROAS and/or profit increasing
- Consider scaling budget
- Replicate winning tactics

**Declining:**
- ROAS and/or profit decreasing
- Review and optimize
- Check for external factors

**Stable:**
- Performance consistent
- Maintain current approach
- Monitor for changes

---

## 🎯 USE CASES

### Use Case 1: Weekly Performance Review

**Goal:** Track portfolio health week-over-week

**Workflow:**
1. Every Sunday, create snapshots for all active products
2. Monday morning, review "Insights" tab
3. Identify improving/declining products
4. Take action:
   - Scale budget on improving
   - Optimize declining
   - Document in notes for next week

**Result:** Data-driven weekly optimization

---

### Use Case 2: Campaign Launch Analysis

**Goal:** Measure impact of new creative

**Workflow:**
1. **Before launch:** Take snapshot (note: "Pre-launch")
2. **Week 1:** Take snapshot (note: "Week 1 new creative")
3. **Week 2:** Take snapshot (note: "Week 2 new creative")
4. **Week 3:** Take snapshot (note: "Week 3 new creative")
5. **Analyze:** Use Trends chart to see ROAS/profit change

**Result:** Clear before/after comparison

---

### Use Case 3: Seasonal Performance

**Goal:** Compare Q4 vs Q1 performance

**Workflow:**
1. Take weekly snapshots throughout both quarters
2. Filter snapshots by date range (future feature)
3. Compare average ROAS in Q4 vs Q1
4. Identify seasonal patterns
5. Plan budget accordingly for next year

**Result:** Seasonal insights for planning

---

### Use Case 4: Portfolio Optimization

**Goal:** Identify which products to scale/pause

**Workflow:**
1. Take snapshots for 4+ weeks
2. Review "Insights" tab
3. Sort by trend direction
4. **Improving products:**
   - Increase budgets 20-30%
   - Test new placements
5. **Declining products:**
   - Pause or reduce spend
   - Diagnose issues
   - Plan fixes

**Result:** Portfolio rebalancing based on trends

---

## 📊 METRICS EXPLAINED

### Trendable Metrics

**ROAS:**
- Return on Ad Spend efficiency
- Higher is better
- Target: >3.0 and improving

**Profit:**
- Actual dollars earned
- Critical for P&L
- Target: Positive and growing

**Sales:**
- Attributed revenue
- Shows volume trends
- Use with profit to understand margins

**Ad Spend:**
- Budget trends
- Ensure alignment with performance
- Don't scale spend on declining ROAS

**Margin %:**
- Profitability percentage
- Should be stable or improving
- Declining = cost issues

**CTR %:**
- Engagement efficiency
- Improving = better creative
- Declining = creative fatigue

**NTB %:**
- New customer acquisition
- Important for growth
- Track over product lifecycle

---

## 📈 TREND CALCULATIONS

### How Trends Are Calculated

**Data Collection:**
- Uses last 4 snapshots (configurable)
- Minimum 2 snapshots required

**Algorithm:**
- Simple linear regression
- Calculates slope of ROAS
- Calculates slope of Profit
- Averages slopes for overall trend

**Classification:**
- Slope > 0.05 = **Improving**
- Slope < -0.05 = **Declining**
- Between -0.05 and 0.05 = **Stable**

**Why Linear Regression:**
- Smooths out weekly noise
- Shows overall direction
- Industry-standard approach

---

## 🎨 VISUAL GUIDE

### Snapshot Timeline

```
Product A (5 snapshots)
├─ Dec 1  | ROAS: 3.2 | Profit: $1,200 | Notes: "Normal week"
├─ Nov 24 | ROAS: 4.1 | Profit: $1,800 | Notes: "Black Friday"
├─ Nov 17 | ROAS: 3.0 | Profit: $1,100 |
├─ Nov 10 | ROAS: 2.9 | Profit: $1,050 |
└─ Nov 3  | ROAS: 2.8 | Profit: $  950 |
```

**Shows:**
- Chronological history
- Key metrics at a glance
- Contextual notes
- ROAS improving trend

---

### Trend Chart Example

```
ROAS Trend - Product A

4.5x │                              ●
     │                         ●
4.0x │                    ●
     │               ●
3.5x │          ●
     │     ●
3.0x │●
     └─────────────────────────────────
       Week 1  Week 2  Week 3  Week 4

First: 3.0x  →  Latest: 4.2x  →  Change: +40% ↗
```

**Shows:**
- Clear upward trend
- All data points
- % change
- Visual clarity

---

## 💻 TECHNICAL DETAILS

### Data Structure

**ProductSnapshot:**
```typescript
{
  id: string;           // Unique snapshot ID
  productId: string;    // Which product
  productName: string;  // Product name at time
  date: string;         // ISO date (YYYY-MM-DD)
  timestamp: number;    // Unix timestamp
  inputs: {...};        // All calculator inputs
  metrics: {...};       // All calculated metrics
  notes?: string;       // Optional context
}
```

**Storage:**
- In-app state (Phase 3)
- LocalStorage (Phase 4)
- Export/import (Phase 4)

---

### Calculations

**extractTrendData():**
```typescript
// Converts snapshots to chart data
snapshots → [{date, value, label}, ...]
```

**identifyTrends():**
```typescript
// Calculates slope and classifies
snapshots → {trend, roasTrend, profitTrend}
```

**calculateSlope():**
```typescript
// Linear regression slope
values → slope (positive/negative/zero)
```

---

## 🎓 PRO TIPS

### Snapshot Best Practices

1. **Consistent Timing:**
   - Take snapshots same day/time each week
   - Builds comparable data series

2. **Comprehensive Notes:**
   - Document promotions
   - Note creative changes
   - Record external factors (holidays, news)

3. **Regular Cadence:**
   - Weekly minimum for trends
   - Daily for campaign launches
   - Monthly for mature products

### Trend Analysis Tips

1. **Look for Inflection Points:**
   - When did trend change?
   - What was different that week?
   - Can you replicate or avoid?

2. **Context Matters:**
   - Check notes for explanations
   - Consider seasonality
   - Account for budget changes

3. **Act on Insights:**
   - Don't just track, optimize!
   - Improving = scale
   - Declining = fix or pause
   - Stable = maintain or test

### Common Patterns

**Creative Fatigue:**
- ROAS starts high
- Gradually declines over 4-6 weeks
- CTR also declining
- Solution: New creative

**Seasonal Spike:**
- ROAS jumps for 1-2 weeks
- Then returns to baseline
- Note the dates for next year

**Budget Scaling Effect:**
- Spend increases
- ROAS may dip slightly
- Profit should still grow
- Monitor margin %

---

## 📦 WHAT'S INCLUDED

### New Components (3)
✅ **HistoricalView** - Main container
✅ **SnapshotManager** - Create/manage snapshots
✅ **TrendChart** - Visualize trends

### New Utilities (1)
✅ **historical.ts** - All trend calculations

### New Features
✅ Third view mode (Historical)
✅ Snapshot creation
✅ Snapshot timeline
✅ Trend visualization
✅ Automatic insights
✅ Trend classification

---

## 🔄 INTEGRATION

### With Phase 1 (Engagement)
- Track CTR trends over time
- Monitor NTB % changes
- See if engagement improving

### With Phase 2 (Portfolio)
- Snapshot all portfolio products
- Compare product trends
- Identify which to scale/pause

### Standalone Value
- Even single-product users benefit
- Week-over-week tracking
- Data-driven optimization

---

## 🚀 QUICK START

**5-Minute Setup:**

1. **Add Products to Portfolio:**
   - Enter data for each SKU
   - Click "Add to Portfolio"

2. **Take First Snapshots:**
   - Go to "Historical" tab
   - Click "Snapshots" sub-tab
   - Create snapshot for each product
   - Note: "Baseline - Week of Dec 1"

3. **Come Back Next Week:**
   - Update product data
   - Take new snapshots
   - Note: "Week of Dec 8"

4. **View Trends:**
   - Click "Trends" sub-tab
   - Select product
   - Choose ROAS metric
   - See week-over-week change!

---

## 📊 EXAMPLE ANALYSIS

**Scenario:** Launching new energy drink

**Week 1 (Dec 1):**
- Snapshot: ROAS 2.1, Profit $800
- Note: "Launch week, high spend"

**Week 2 (Dec 8):**
- Snapshot: ROAS 2.8, Profit $1,200
- Note: "Optimized bids"

**Week 3 (Dec 15):**
- Snapshot: ROAS 3.4, Profit $1,600
- Note: "Expanded targeting"

**Week 4 (Dec 22):**
- Snapshot: ROAS 3.9, Profit $1,950
- Note: "Holiday boost"

**Trend Analysis:**
- Status: **Improving** ✅
- ROAS: +1.8 (+86%)
- Profit: +$1,150 (+144%)
- Recommendation: **Scale budget 25%**

---

## 🎯 OUTCOMES

### Immediate Benefits
✅ Track performance week-over-week
✅ Identify trends early
✅ Make data-driven decisions
✅ Document campaign history

### Long-Term Value
✅ Build historical database
✅ Seasonal pattern recognition
✅ Portfolio optimization
✅ Executive reporting

---

## 🔜 COMING SOON (Phase 4)

- Export snapshots to CSV
- Import historical data
- Date range filtering
- Comparison views (this week vs last week)
- Portfolio-level trends
- Annotations on chart

---

**Phase 3 Complete - Track trends like a pro!** 📈
