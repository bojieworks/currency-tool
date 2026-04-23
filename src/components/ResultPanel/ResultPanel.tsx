import { memo } from "react";
import { CURRENCY_SYMBOL } from "@/constants/currency";
import { Currency } from "@/types/currency";

import styles from "./ResultPanel.module.scss";

export type RateItem = {
  label: string;
  rate: number | null;
};

type Props = {
  value: number | null;
  outputCurrency: Currency;
  rates: RateItem[];
  showSymbol: boolean;
  loading: boolean;
  error: string | null;
};

const formatNumber = (n: number) => n.toFixed(2);
const formatResultValue = (value: number, currency: Currency, withSymbol: boolean) =>
  withSymbol ? `${CURRENCY_SYMBOL[currency]} ${formatNumber(value)}` : formatNumber(value);
const isNonNull = (n: number | null): n is number => n !== null;

const RatesList = memo(function RatesList({ rates }: { rates: RateItem[] }) {
  const visible = rates.filter((r) => isNonNull(r.rate));
  return (
    <div className={styles["result-panel__rates"]}>
      {visible.map(({ label, rate }) => (
        <div key={label}>
          <span>{label} → Output：</span>
          <span>{formatNumber(rate!)}</span>
        </div>
      ))}
    </div>
  );
});

const PanelValue = memo(function PanelValue({
  value,
  currency,
  withSymbol,
}: {
  value: number;
  currency: Currency;
  withSymbol: boolean;
}) {
  return (
    <div className={styles["result-panel__value"]}>
      {formatResultValue(value, currency, withSymbol)}
    </div>
  );
});

function ResultPanelCmp({ value, outputCurrency, rates, showSymbol, loading, error }: Props) {
  if (loading) return <p className={styles["result-panel__loading"]}>Loading...</p>;
  if (error) return <p className={styles["result-panel__error"]}>{error}</p>;
  if (value === null) return null;
  return (
    <div className={styles["result-panel"]}>
      {showSymbol && (
        <div>
          <div className={styles["result-panel__currency"]}>Exchange Rates</div>

          <RatesList rates={rates} />
        </div>
      )}
      <PanelValue value={value} currency={outputCurrency} withSymbol={showSymbol} />
    </div>
  );
}

export const ResultPanel = memo(ResultPanelCmp);
