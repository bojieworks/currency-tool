/**
 * 支援的幣別
 */
export type Currency = "TWD" | "USD" | "JPY" | "EUR";

/**
 * 可執行的運算模式
 */
export type Operation = "ADD" | "SUBTRACT" | "ADD_WITH_CURRENCY" | "SUBTRACT_WITH_CURRENCY";

/**
 * 表單輸入的完整資料
 */
export type FormValues = {
  amountA: number;
  currencyA: Currency;
  amountB: number;
  currencyB: Currency;
  operation: Operation;
  outputCurrency: Currency;
};

/**
 * 匯率表
 */
export type ExchangeRates = Record<Currency, number>;
