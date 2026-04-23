import { Controller, Control, useForm, useWatch, FieldPathByValue } from "react-hook-form";
import { FormValues } from "@/types/currency";
import { useCurrencyCalculation } from "@/hooks/useCurrencyCalculation";
import { FormSelect } from "@/components/FormSelect/FormSelect";
import { ResultPanel } from "@/components/ResultPanel/ResultPanel";
import { OPERATION_OPTIONS, CURRENCIES_OPTIONS } from "@/constants/currency";
import styles from "./CurrencyHunter.module.scss";
import { InputNumber } from "antd";

const RATE_LABEL = { A: "A", B: "B" } as const;

type AmountFieldName = FieldPathByValue<FormValues, number>;

const AmountField = ({
  name,
  control,
  disabled = false,
  placeholder = "Enter amount",
}: {
  name: AmountFieldName;
  control: Control<FormValues>;
  disabled?: boolean;
  placeholder?: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <InputNumber
          {...field}
          value={field.value ?? 0}
          onChange={(v) => field.onChange(v ?? 0)}
          disabled={disabled}
          min={0}
          className={styles["amount-input__field"]}
          placeholder={placeholder}
          status={fieldState.error ? "error" : undefined}
        />
      )}
    />
  );
};

export function CurrencyHunter() {
  const { control } = useForm<FormValues>({
    defaultValues: {
      amountA: 0,
      amountB: 0,
      operation: "ADD",
      currencyA: "TWD",
      currencyB: "TWD",
      outputCurrency: "TWD",
    },
  });

  const operation = useWatch({ control, name: "operation" });
  const currencyA = useWatch({ control, name: "currencyA" });
  const currencyB = useWatch({ control, name: "currencyB" });
  const outputCurrency = useWatch({ control, name: "outputCurrency" });
  const amountA = useWatch({ control, name: "amountA" });
  const amountB = useWatch({ control, name: "amountB" });

  const { needsRates, result, rateA, rateB, loading, error } = useCurrencyCalculation({
    operation,
    currencyA,
    currencyB,
    outputCurrency,
    amountA,
    amountB,
  });

  const disabledByLoading = needsRates && loading;

  return (
    <div className={styles["container"]}>
      <div className={styles["currency-hunter"]}>
        <h1 className={styles["currency-hunter__title"]}>Currency Hunter</h1>

        <FormSelect
          label="Operation"
          name="operation"
          control={control}
          options={OPERATION_OPTIONS}
          disabled={disabledByLoading}
        />

        <FormSelect
          label="Amount A"
          name="currencyA"
          disabled={disabledByLoading}
          control={control}
          options={CURRENCIES_OPTIONS}
          showSymbol={needsRates}
        >
          <AmountField name="amountA" control={control} disabled={disabledByLoading} />
        </FormSelect>

        <FormSelect
          label="Amount B"
          name="currencyB"
          disabled={disabledByLoading}
          control={control}
          options={CURRENCIES_OPTIONS}
          showSymbol={needsRates}
        >
          <AmountField name="amountB" control={control} disabled={disabledByLoading} />
        </FormSelect>

        {needsRates && (
          <FormSelect
            label="Output Currency"
            name="outputCurrency"
            control={control}
            options={CURRENCIES_OPTIONS}
            disabled={disabledByLoading}
          />
        )}

        <ResultPanel
          value={result}
          outputCurrency={outputCurrency}
          showSymbol={needsRates}
          loading={loading}
          error={error}
          rates={[
            { label: RATE_LABEL.A, rate: rateA },
            { label: RATE_LABEL.B, rate: rateB },
          ]}
        />
      </div>
    </div>
  );
}
