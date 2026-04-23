import { Currency, ExchangeRates } from "@/types/currency";

/**
 * 計算 from → to 的匯率
 *
 * @param rates 以 TWD 為基準的匯率表
 * @param from 來源幣別
 * @param to 目標幣別
 * @returns 表示 1 單位 from 幣別能換多少 to 幣別
 */
export function getExchangeRate(
  rates: ExchangeRates | null,
  from: Currency,
  to: Currency,
): number | null {
  if (!rates) return null;
  if (from === to) return 1;

  const fromRate = rates[from];
  const toRate = rates[to];

  if (!fromRate || !toRate) return null;

  return toRate / fromRate;
}
