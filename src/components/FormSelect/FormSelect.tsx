import { memo } from "react";
import { Control, Controller, FieldPathByValue } from "react-hook-form";
import { FormValues } from "@/types/currency";
import { BaseSelect, Option } from "../BaseSelect/BaseSelect";
import styles from "./FormSelect.module.scss";

export type StringFieldName = FieldPathByValue<FormValues, string>;

interface FormSelectProps {
  label: string;
  name: StringFieldName;
  control: Control<FormValues>;
  options: Option[];
  disabled?: boolean;
  children?: React.ReactNode;
  showSymbol?: boolean;
}

function FormSelectCmp({
  label,
  name,
  control,
  options,
  disabled = false,
  children,
  showSymbol = true,
}: FormSelectProps) {
  return (
    <div className={styles["form-select"]}>
      <label className={styles["form-select__label"]}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className={styles["form-select__container"]}>
            <div className={styles["form-select__row"]}>
              {children}
              {showSymbol && <BaseSelect {...field} options={options} disabled={disabled} />}
            </div>

            {fieldState.error && (
              <div role="alert" className={styles["form-select__error"]}>
                {fieldState.error.message}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}

export const FormSelect = memo(FormSelectCmp);
