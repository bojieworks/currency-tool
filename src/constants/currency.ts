import { Currency } from "@/types/currency";

export const CURRENCIES: Currency[] = ["TWD", "USD", "JPY", "EUR"];

/**
 * 幣別對應的符號．用於 UI 顯示
 */
export const CURRENCY_SYMBOL: Record<Currency, string> = {
  TWD: "NT$",
  USD: "$",
  JPY: "¥",
  EUR: "€",
};

/**
 * 操作類型選項下拉的選項
 */
export const OPERATION_OPTIONS = [
  { value: "ADD", label: "Add" },
  { value: "SUBTRACT", label: "Subtract" },
  { value: "ADD_WITH_CURRENCY", label: "Add with currency" },
  { value: "SUBTRACT_WITH_CURRENCY", label: "Subtract with currency" },
];

/**
 * 幣別下拉的選項
 */
export const CURRENCIES_OPTIONS = CURRENCIES.map((c) => ({
  value: c,
  label: c,
}));
