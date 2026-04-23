import { forwardRef, memo } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import styles from "./BaseSelect.module.scss";

export interface Option {
  value: string;
  label: string;
}

export interface BaseSelectProps extends Omit<SelectProps<string>, "options" | "onChange"> {
  options: Option[];
  onChange?: (value: string) => void;
}

const BaseSelectInner = forwardRef<React.ElementRef<typeof Select>, BaseSelectProps>(
  ({ options, onChange, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        options={options}
        onChange={onChange}
        className={styles["base-select"]}
        {...props}
      />
    );
  },
);

BaseSelectInner.displayName = "BaseSelect";

export const BaseSelect = memo(BaseSelectInner);
