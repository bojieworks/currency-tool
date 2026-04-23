import { useMemo } from "react";
import { FormValues } from "@/types/currency";
import { isOperationWithCurrency } from "@/utils//operations";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { calculateResult } from "@/utils/calculations";
import { getExchangeRate } from "@/utils//getExchangeRate";

/**
 * 根據表單輸入，計算出結果與顯示用的匯率資訊。
 *
 * @param input 表單所有輸入值
 * @returns 一個物件，包含計算結果與匯率資訊：
 *   - needsRates: boolean
 *       表示此模式是否需要匯率
 *   - rates: ExchangeRates | null
 *       匯率資料（僅在 needsRates 為 true 時才會有資料）
 *   - loading: boolean
 *       匯率是否正在載入中
 *   - error: string | null
 *       匯率抓取錯誤訊息
 *   - result: number | null
 *       計算結果
 *   - rateA: number | null
 *       顯示用 A → outputCurrency 的單位匯率
 *   - rateB: number | null
 *       顯示用 B → outputCurrency 的單位匯率
 */

export function useCurrencyCalculation(input: FormValues) {
  const needsRates = isOperationWithCurrency(input.operation);
  const { rates, loading, error } = useExchangeRates(needsRates);

  const result = useMemo(() => {
    if (needsRates && !rates) return null;
    return calculateResult(
      {
        amountA: input.amountA,
        amountB: input.amountB,
        operation: input.operation,
        currencyA: input.currencyA,
        currencyB: input.currencyB,
        outputCurrency: input.outputCurrency,
      },
      rates ?? undefined,
    );
  }, [
    needsRates,
    rates,
    input.amountA,
    input.amountB,
    input.operation,
    input.currencyA,
    input.currencyB,
    input.outputCurrency,
  ]);

  const { rateA, rateB } = useMemo(() => {
    if (!needsRates || !rates)
      return { rateA: null as number | null, rateB: null as number | null };
    return {
      rateA: getExchangeRate(rates, input.currencyA, input.outputCurrency),
      rateB: getExchangeRate(rates, input.currencyB, input.outputCurrency),
    };
  }, [needsRates, rates, input.currencyA, input.currencyB, input.outputCurrency]);

  return { needsRates, rates, loading, error, result, rateA, rateB };
}
