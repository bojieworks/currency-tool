# Currency Hunter

A React + TypeScript demo app for performing addition/subtraction across multiple currencies. You can add or subtract two amounts in possibly different currencies and choose the output currency.

[Problem-solving approach](https://gamma.app/docs/Copy-of-Currency-Hunter-at5wfxi07g0ujsh)

---

## Features

- Operation modes
  - Add: simple addition (no currency symbol shown)
  - Subtract: simple subtraction (no currency symbol shown)
  - Add with currency: addition with currency symbol shown
  - Subtract with currency: subtraction with currency symbol shown
- Supported currencies: TWD, USD, JPY, EUR
- Output currency: selectable when a mode requires exchange rates
- Exchange rate source: `https://open.er-api.com/v6/latest/TWD` (TWD as base)
- Fetch rates only when required: determined by operation mode to avoid unnecessary requests
- Loading and error states: surfaced in UI for better observability

---

## Tech Stack

- React 18
- TypeScript
- React Hook Form (form state & validation)
- Ant Design (numeric input & basic styles)
- CSS Modules (SCSS)

---

## Getting Started

Prerequisites: Node.js ≥ 16

- Install dependencies
  ```bash
  npm install
  ```
- Start development server
  ```bash
  npm start
  ```
- Run tests
  ```bash
  npm test
  ```
- Build for production
  ```bash
  npm run build
  ```
---

## Project Structure

```
/ (root)
├─ src/
│  ├─ pages/
│  │  └─ CurrencyHunter.tsx        # Main page
│  ├─ components/
│  │  │─ BaseSelect/               # antd select component
│  │  │  └─ BaseSelect.tsx
│  │  ├─ FormSelect/               # Generic select + slot
│  │  │  └─ FormSelect.tsx
│  │  └─ ResultPanel/              # Result and exchange rates display
│  │     └─ ResultPanel.tsx
│  ├─ hooks/
│  │  ├─ useExchangeRates.ts       # Fetch rates on demand
│  │  └─ useCurrencyCalculation.ts # Combines logic: need rates?, result & rate info
│  ├─ utils/
│  │  ├─ calculations.ts           # Calculate the final result based on the form values and exchange rates.
│  │  └─ getExchangeRate.ts        # Compute unit rate from → to
│  │  └─ operations.ts             # Determine whether this operation requires exchange rates.
│  ├─ constants/
│  │  └─ currency.ts               # Currency constants/symbols/select options
│  ├─ types/
│  │  └─ currency.ts               
│  ├─ App.tsx
│  └─ index.tsx
├─ tsconfig.json                    
├─ .prettierrc                      
└─ README.md                        
```

---

## License

This example project is for learning and interview demonstration purposes only. For commercial use, please review dependencies and risks on your own.
