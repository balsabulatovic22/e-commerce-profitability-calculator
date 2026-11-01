# E-commerce Profitability Calculator

**Balsa Bulatovic**

[Open the calculator](https://balsabulatovic22.github.io/e-commerce-profitability-calculator/)

A free, browser-based calculator for understanding e-commerce profit after products, shipping, advertising and returns.

## Why I made it

Running online sales taught me that revenue and ROAS alone do not show what a business keeps. I defined the calculator around that practical question: **after all the costs entered, does this product make money?**

This independent portfolio project was developed with AI assistance. I defined the business requirements, reviewed the assumptions and tested the tool. It is not presented as a commercial product with paying customers or measured business savings.

## What it does

- Estimates operating profit, margin and profit per completed order.
- Compares actual ROAS with the break-even threshold.
- Calculates break-even selling price and maximum advertising cost per order.
- Accounts for failed deliveries, returns, stock losses, payment fees, packaging, VAT and fixed costs.
- Shows a cost breakdown and explains loss scenarios.
- Compares price and advertising scenarios at a fixed order volume.
- Saves up to eight scenarios locally and exports results as CSV.

## Worked example

100 shipped orders at EUR 25, product cost EUR 6, shipping EUR 3 and total advertising EUR 500, with no other entered costs:

| Metric | Result |
| --- | ---: |
| Collected sales | EUR 2,500 |
| Total costs | EUR 1,400 |
| Operating profit | EUR 1,100 |
| Profit margin | 44% |
| Actual ROAS | 5.00x |
| Break-even ROAS | 1.5625x |
| Break-even selling price | EUR 14 |

Figures are illustrative, not a claim about my past sales.

## Run locally

Open `index.html` in a browser, or serve this folder with any static web server. There are no dependencies, API keys, AI API calls or build step.

Run calculation checks with Node.js:

```sh
node test.cjs
```

Tests cover returns, damaged stock, VAT, fees, zero orders, zero ad spend, unprofitable products, invalid input, and break-even identities.

## Calculation assumptions

Use one product or an average order over a single period. Include customer-paid shipping in selling price and the full shipment expense in shipping cost.

Completed orders = shipped orders x (1 - failed/returned share). Collected sales = completed orders x selling price. Revenue excluding VAT = collected sales / (1 + VAT rate).

Operating profit = revenue excluding VAT - goods - delivery - packaging - payment fees - advertising - fixed costs.

All shipped orders incur outbound shipping and packaging. Failed/returned orders generate no revenue. Returned stock is reusable except for the entered product-loss share. Payment fees apply only to completed orders; nonrefundable fees on returns should be added to fixed costs.

Break-even ad budget = revenue excluding VAT - all entered costs other than ads. Break-even ROAS = collected sales / break-even ad budget, where both values are positive. Break-even selling price solves for zero profit at the same order volume and return rate.

When separating VAT, enter costs excluding recoverable input VAT. Profit excludes income/corporate tax and unentered costs. Inventory funding, settlement timing and cash flow are not modelled. Price and ad-budget sliders keep order volume fixed; they are sensitivity checks, not demand forecasts. ROAS uses collected sales after returns and can differ from ad-platform reporting.

## Privacy

Calculations run in the browser. Saved scenarios use browser local storage; the application does not upload entered figures. Clearing browser data removes saved scenarios. Hosting providers can maintain ordinary access logs.

## License

MIT. See `LICENSE`. Created for Balsa Bulatovic.
