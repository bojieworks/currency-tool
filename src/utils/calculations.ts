import { Currency, ExchangeRates, FormValues } from "@/types/currency";
import { OperationMeta } from "./operations";

/**
 * 將指定金額從某幣別換算成「TWD 基準值」。
 * 假設 rates 是「1 TWD 可兌換多少該幣別」的比率，因此要換回 TWD 需用除法。
 * @param amount 原始金額
 * @param fromCurrency 原始幣別
 * @param rates 匯率表（以 TWD 為基準）
 * @returns 以 TWD 表示的金額
 */
export function toTWD(amount: number, fromCurrency: Currency, rates: ExchangeRates): number {
  return amount / rates[fromCurrency];
}

/**
 * 將以 TWD 表示的金額換算成目標幣別。
 * 假設 rates 是「1 TWD 可兌換多少該幣別」的比率，因此要將 TWD 換成目標幣別，只需乘上這個比率。
 * @param amount 以 TWD 表示的金額
 * @param toCurrency 目標幣別
 * @param rates 匯率表（以 TWD 為基準）
 * @returns 換算成目標幣別的金額
 */
export function fromTWD(amount: number, toCurrency: Currency, rates: ExchangeRates): number {
  return amount * rates[toCurrency];
}

/**
 * 透過 TWD 作為中間轉換，將任意幣別金額轉為目標幣別。
 * 若 from 與 to 相同，直接回傳原金額以避免不必要運算。
 * 先把 from 金額換成 TWD，再從 TWD 換到目標幣別。
 */
function convert(amount: number, from: Currency, to: Currency, rates: ExchangeRates): number {
  if (from === to) return amount;
  return fromTWD(toTWD(amount, from, rates), to, rates);
}

/**
 * 根據表單值與匯率計算最終結果。
 * - 當不需要匯率或尚未取得匯率時：做單純加減。
 * - 當需要匯率且已就緒：先將 A/B 轉成輸出幣別，再做加減。
 */
export function calculateResult(values: FormValues, rates?: ExchangeRates): number {
  const { amountA, amountB, operation, currencyA, currencyB, outputCurrency } = values;

  const isSubtract = operation === "SUBTRACT" || operation === "SUBTRACT_WITH_CURRENCY";

  const a = rates ? convert(amountA, currencyA, outputCurrency, rates) : amountA;
  const b = rates ? convert(amountB, currencyB, outputCurrency, rates) : amountB;

  return isSubtract ? a - b : a + b;
}
