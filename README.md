# Instacart Profitability Calculator

## 🚨 SETUP REQUIRED - READ THIS FIRST!

**After extracting the ZIP, you MUST install dependencies:**

```bash
cd instacart-calculator
npm install          # ← THIS IS REQUIRED!
npm run dev
```

Then open **http://localhost:5173/** in your browser.

**Having issues?** See **[SETUP-HELP.md](SETUP-HELP.md)** for detailed troubleshooting.

---

A clean, modern web application that helps CPG marketers calculate the true profitability of their Instacart advertising campaigns after accounting for ad spend, product margins, and promotional costs.

## Features

- **Real-time Calculations**: All metrics update instantly as you type
- **Comprehensive Metrics**: Investment rate, gross margin dollars, ROAS, breakeven analysis, and more
- **Smart Input Handling**: Accepts percentages in multiple formats (40 or 0.4 for 40%)
- **Profitability Status**: Clear visual indicators (red/yellow/green) based on campaign performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Production-Ready Code**: TypeScript, well-commented, easy to extend

## What This Tool Does

This calculator helps you answer the crucial question: **"Are my Instacart ads actually profitable?"**

By combining your ad performance data with your brand's financial inputs, it shows:
- Whether you're making or losing money after all costs
- Your margin as a percentage of attributed sales
- How much margin you earn per dollar of ad spend
- The ROAS you need to break even given your margins

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended) - [Download here](https://nodejs.org)
- npm (comes with Node.js)

### Quick Start

**⚠️ IMPORTANT: You MUST run `npm install` before `npm run dev`!**

1. **Navigate to the project directory:**
   ```bash
   cd instacart-calculator
   ```

2. **Install dependencies (REQUIRED FIRST STEP):**
   ```bash
   npm install
   ```
   This will take 30-60 seconds and download all required packages.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will typically run at `http://localhost:5173`
   - The terminal will show the exact URL

**Troubleshooting:** If you get "Failed to load url /src/main.tsx", you forgot step 2! Run `npm install` first.

5. **Build for production (optional):**
   ```bash
   npm run build
   ```
   - Output will be in the `dist/` folder
   - Deploy this folder to any static hosting service

## How to Use

### Required Inputs

1. **Ad Spend ($)** - Total amount spent on Instacart ads
2. **Attributed Sales ($)** - Sales attributed to your ad campaign
3. **Gross Margin %** - Your product's gross margin (enter as 40 or 0.4 for 40%)

### Optional Inputs

4. **Other Costs %** - Additional costs like freight, fulfillment, fees (reduces effective margin)
5. **Promo / Redemption Costs ($)** - Promotional expenses like SUAS fees, Ibotta costs, free gifts

### Understanding the Results

#### Summary Card
- **Profit After Ads**: Your net profit/loss after all costs
- **Margin After Ads %**: Profit as a percentage of attributed sales
- **Status Badge**: 
  - 🔴 Red (Unprofitable): Margin < 0%
  - 🟡 Yellow (Near Breakeven): Margin 0-10%
  - 🟢 Green (Profitable): Margin > 10%

#### Key Metrics

- **Investment Rate**: Ad spend as % of sales (lower is better)
- **Gross Margin $**: Total margin dollars from attributed sales
- **Margin per $1 Ad Spend**: Margin returned per ad dollar (>1.0 = profitable)
- **Actual ROAS**: Your campaign's return on ad spend
- **Breakeven ROAS**: ROAS needed to break even given your margins
- **Effective Margin %**: Gross margin after other costs

## Input Field Explanations

### Instacart Ad Metrics

**Ad Spend ($)**
- Total dollars spent on Instacart advertising during the campaign period
- Found in Instacart Ads Manager

**Attributed Sales ($)**
- Total sales attributed to your ad campaign
- Reported by Instacart as the revenue driven by your ads

**ROAS**
- Read-only, auto-calculated field
- Formula: Attributed Sales ÷ Ad Spend
- Example: $15,000 sales ÷ $5,000 spend = 3.0 ROAS

### Brand Financial Inputs

**Gross Margin %**
- Your product's gross margin before additional costs
- Can enter as whole number (40) or decimal (0.4) for 40%
- Formula: (Revenue - COGS) ÷ Revenue

**Other Costs %**
- Additional costs that reduce your effective margin
- Includes: freight, fulfillment fees, payment processing, Instacart fees
- Entered same way as Gross Margin (5 or 0.05 for 5%)

### Promo Costs

**Promo / Redemption Costs ($)**
- Total promotional expenses during the campaign
- Examples: SUAS fees, Ibotta redemption costs, free gift expenses
- Enter as flat dollar amount

## Project Structure

```
instacart-calculator/
├── src/
│   ├── components/
│   │   ├── InputsPanel.tsx       # Left panel with all inputs
│   │   ├── ResultsSummary.tsx    # Top summary card with status
│   │   ├── KeyMetrics.tsx        # Grid of calculated metrics
│   │   └── MetricDisplay.tsx     # Reusable metric component
│   ├── utils/
│   │   ├── calculations.ts       # All business logic functions
│   │   └── formatting.ts         # Number/currency formatting
│   ├── types.ts                  # TypeScript interfaces
│   ├── App.tsx                   # Main app component
│   ├── App.css                   # All styling
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
└── README.md                     # This file
```

## Calculation Formulas

All calculations are implemented in `src/utils/calculations.ts`:

```typescript
Investment Rate = Ad Spend / Attributed Sales
Effective Margin % = Gross Margin % - Other Costs %
Gross Margin $ = Attributed Sales × Effective Margin %
Profit After Ads = Gross Margin $ - Ad Spend - Promo Costs
Margin After Ads % = Profit After Ads / Attributed Sales
Breakeven ROAS = 1 / Effective Margin %
Margin per $1 Spend = Gross Margin $ / Ad Spend
ROAS = Attributed Sales / Ad Spend
```

## Extending the Application

The code is structured for easy extension:

### Adding New Calculations

1. Add the calculation function to `src/utils/calculations.ts`
2. Update the `CalculatedMetrics` interface in `src/types.ts`
3. Call your function in `calculateAllMetrics()`
4. Display in `KeyMetrics.tsx` or `ResultsSummary.tsx`

### Adding New Input Fields

1. Update the `CalculatorInputs` interface in `src/types.ts`
2. Add state management in `App.tsx`
3. Add the input field in `InputsPanel.tsx`
4. Use the value in your calculations

### Customizing Styles

All styles are in `src/App.css` with clear section comments. The design uses:
- CSS Grid for layout
- CSS custom properties could be added for theming
- Mobile-first responsive design

## Technology Stack

- **React 18**: Modern functional components with hooks
- **TypeScript**: Type-safe code with full IDE support
- **Vite**: Fast development server and optimized builds
- **CSS**: Custom CSS (no framework dependencies)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Calculations use `useMemo` to prevent unnecessary recomputation
- Pure functions enable easy testing and optimization
- Small bundle size (~50kb gzipped)

## Future Enhancement Ideas

- Export results to PDF or Excel
- Save/load calculation scenarios
- Multi-campaign comparison
- Historical tracking and charts
- Integration with Instacart API
- Scenario modeling (what-if analysis)
- Custom threshold settings

## Support

For issues or questions about the code:
1. Check the inline comments in each file
2. Review the calculation logic in `calculations.ts`
3. Refer to the type definitions in `types.ts`

## License

MIT License - feel free to use and modify for your needs.

---

Built with ❤️ for CPG marketers who want to understand the true ROI of their Instacart advertising.
