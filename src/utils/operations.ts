import { Operation } from "@/types/currency";

export type OperationKind = "BASE" | "WITH_CURRENCY";

/**
 * 用來記錄各 Operation 的性質與是否需要匯率。
 * 未來若新增 Operation，需補上設定。
 */
export const OperationMeta: Record<Operation, { kind: OperationKind; needsRates: boolean }> = {
  ADD: { kind: "BASE", needsRates: false },
  SUBTRACT: { kind: "BASE", needsRates: false },
  ADD_WITH_CURRENCY: { kind: "WITH_CURRENCY", needsRates: true },
  SUBTRACT_WITH_CURRENCY: { kind: "WITH_CURRENCY", needsRates: true },
};

/**
 * 判斷此 Operation 是否需要匯率。
 */
export const isOperationWithCurrency = (op: Operation): boolean => OperationMeta[op].needsRates;
