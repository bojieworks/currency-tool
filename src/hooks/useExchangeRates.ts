import { useEffect, useState } from "react";
import { ExchangeRates } from "@/types/currency";

const API_URL = "https://open.er-api.com/v6/latest/TWD";

/**
 * 依據 enabled flag 抓取匯率。
 * - enabled = false：重置 state（rates/error/loading）並不發出請求。
 * - enabled = true：開始請求，期間 loading = true。
 * - Success：標準化 rates（補上 TWD: 1）並設到 state。
 * - Error：顯示錯誤訊息字串。
 * - Cancel：使用 AbortController 中止網路請求。
 */

export function useExchangeRates(enabled: boolean) {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) {
      setRates(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    // console.log("fetch API");
    fetch(API_URL, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const usd = data?.rates?.USD;
        const jpy = data?.rates?.JPY;
        const eur = data?.rates?.EUR;

        if (typeof usd !== "number" || typeof jpy !== "number" || typeof eur !== "number") {
          throw new Error("Invalid rates payload");
        }

        const normalized: ExchangeRates = {
          TWD: 1,
          USD: usd,
          JPY: jpy,
          EUR: eur,
        };
        setRates(normalized);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load exchange rates");
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [enabled]);

  return { rates, loading, error };
}
