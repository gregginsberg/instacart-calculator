# Instacart Profitability Calculator - Quick Setup Guide

## 📦 What You Got

A complete, production-ready React + TypeScript application that helps CPG marketers calculate true ad profitability on Instacart.

## 🚀 Get Started in 3 Steps

1. **Navigate to the project folder:**
   ```bash
   cd instacart-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

## 📁 Project Structure

```
instacart-calculator/
├── src/
│   ├── components/          # React components
│   │   ├── InputsPanel.tsx        # Left panel with inputs
│   │   ├── ResultsSummary.tsx     # Top results card
│   │   ├── KeyMetrics.tsx         # Metrics grid
│   │   └── MetricDisplay.tsx      # Reusable metric display
│   ├── utils/
│   │   ├── calculations.ts        # All business logic
│   │   └── formatting.ts          # Number formatting helpers
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   └── App.css              # All styles
├── README.md                # Full documentation
├── package.json             # Dependencies
└── vite.config.ts          # Vite configuration
```

## 🎯 Key Features

✅ Real-time calculations as you type
✅ Handles percentage inputs flexibly (40 or 0.4 for 40%)
✅ Color-coded profitability status (red/yellow/green)
✅ Fully responsive (desktop to mobile)
✅ Clean, professional design for marketers
✅ Well-commented, extensible code

## 🔧 Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📊 What It Calculates

- **ROAS** - Return on ad spend
- **Investment Rate** - Ad spend as % of sales
- **Gross Margin $** - Total margin from attributed sales
- **Profit After Ads** - Net profit after all costs
- **Margin After Ads %** - Profit as % of sales
- **Breakeven ROAS** - ROAS needed to break even
- **Margin per $1 Spend** - Efficiency metric

## 🎨 Customization

All styles are in `src/App.css` with clear comments. Easy to:
- Change colors/branding
- Adjust layout
- Modify calculations in `utils/calculations.ts`
- Add new fields

## 📖 Full Documentation

See `README.md` for:
- Detailed calculation formulas
- Input field explanations
- Extension guide
- Browser support info

---

**Need Help?** Check the inline code comments - every component and function is thoroughly documented!
