# Example Usage & Sample Calculations

## Sample Scenario 1: Profitable Campaign

### Inputs
```
Ad Spend: $5,000
Attributed Sales: $18,000
Gross Margin %: 40 (or 0.4)
Other Costs %: 5 (or 0.05)
Promo Costs: $500
```

### Results
```
ROAS: 3.60
Investment Rate: 27.8%
Effective Margin %: 35.0%
Gross Margin $: $6,300.00
Profit After Ads: $800.00
Margin After Ads %: 4.4%
Breakeven ROAS: 2.86
Margin per $1 Ad Spend: 1.26

Status: 🟡 NEAR BREAKEVEN
```

**Interpretation**: This campaign is slightly profitable. Your actual ROAS (3.60) exceeds your breakeven ROAS (2.86), meaning you're making money. However, at 4.4% margin after ads, there's limited room for additional costs.

---

## Sample Scenario 2: Highly Profitable Campaign

### Inputs
```
Ad Spend: $3,000
Attributed Sales: $15,000
Gross Margin %: 45
Other Costs %: 3
Promo Costs: $200
```

### Results
```
ROAS: 5.00
Investment Rate: 20.0%
Effective Margin %: 42.0%
Gross Margin $: $6,300.00
Profit After Ads: $3,100.00
Margin After Ads %: 20.7%
Breakeven ROAS: 2.38
Margin per $1 Ad Spend: 2.10

Status: 🟢 PROFITABLE
```

**Interpretation**: Excellent performance! Your ROAS significantly exceeds breakeven, and you're earning over $2 in margin for every $1 spent on ads. This campaign has healthy margins.

---

## Sample Scenario 3: Unprofitable Campaign

### Inputs
```
Ad Spend: $8,000
Attributed Sales: $15,000
Gross Margin %: 35
Other Costs %: 8
Promo Costs: $1,000
```

### Results
```
ROAS: 1.88
Investment Rate: 53.3%
Effective Margin %: 27.0%
Gross Margin $: $4,050.00
Profit After Ads: -$4,950.00
Margin After Ads %: -33.0%
Breakeven ROAS: 3.70
Margin per $1 Ad Spend: 0.51

Status: 🔴 UNPROFITABLE
```

**Interpretation**: This campaign is losing money. Your actual ROAS (1.88) is below your breakeven ROAS (3.70). You're only earning $0.51 in margin for every $1 spent on ads. Consider:
- Reducing ad spend
- Improving targeting/efficiency
- Increasing prices
- Reducing other costs

---

## Understanding Key Metrics

### ROAS (Return on Ad Spend)
- **What it is**: Attributed Sales ÷ Ad Spend
- **Good benchmark**: 3.0+ for most CPG brands
- **Important**: Must exceed Breakeven ROAS to be profitable

### Investment Rate
- **What it is**: Ad spend as % of attributed sales
- **Good benchmark**: <25% for profitable campaigns
- **Why it matters**: Shows how much of your revenue goes to ads

### Margin per $1 Ad Spend
- **What it is**: Gross Margin $ ÷ Ad Spend
- **Critical threshold**: 
  - < 1.0 = Losing money
  - = 1.0 = Breaking even
  - > 1.0 = Making money
- **Good target**: 1.5+ for healthy margins

### Breakeven ROAS
- **What it is**: The ROAS you need to not lose money
- **Formula**: 1 ÷ Effective Margin %
- **Example**: 
  - 40% margin → Need 2.5 ROAS to break even
  - 30% margin → Need 3.33 ROAS to break even
  - 25% margin → Need 4.0 ROAS to break even

---

## Tips for Using the Calculator

1. **Start with actual data from Instacart Ads Manager**
   - Use complete campaign periods for accuracy
   - Include all attributed sales, not just incremental

2. **Be conservative with margin inputs**
   - Include all variable costs in "Other Costs %"
   - Don't forget Instacart commissions/fees

3. **Track promo costs separately**
   - SUAS placement fees
   - Ibotta/Fetch redemption costs
   - Free product costs
   - Any temporary price reductions

4. **Compare to breakeven ROAS regularly**
   - If actual < breakeven → Losing money
   - If actual = breakeven → Break even
   - If actual > breakeven → Making money

5. **Test different scenarios**
   - What if we reduced ad spend by 20%?
   - What if we improved margin by 5%?
   - What if promo costs were eliminated?

---

## Common Questions

**Q: My ROAS is 4.0 but I'm still unprofitable. Why?**
A: High ROAS doesn't guarantee profitability if your margins are low or other costs are high. Check your breakeven ROAS - you might need 5.0+ to be profitable.

**Q: Should I enter my margin as 40 or 0.4?**
A: Either works! The calculator accepts both formats and normalizes them automatically.

**Q: What should I include in "Other Costs %"?**
A: Include any costs that reduce your effective margin: freight, fulfillment, Instacart commissions, payment processing, packaging, etc.

**Q: My margin per $1 ad spend is 0.8. Is that bad?**
A: Yes - you're losing money. You need it above 1.0 to break even, and ideally 1.5+ for healthy profitability.

**Q: Can I use this for non-Instacart campaigns?**
A: Absolutely! The math works for any digital advertising channel. Just input your platform's metrics.
