export type PositiveNumber = number;
export type TransformerRange = { start: PositiveNumber; end: PositiveNumber };
export type Transformer = (range?: TransformerRange) => string;

/**
 * Type Guards
 */

export function isPositiveNumber(range: any): range is PositiveNumber {
  return typeof range === "number" && range >= 0;
}

export function isRange(range: any): range is TransformerRange {
  return (
    isPositiveNumber(range?.start) && 
    isPositiveNumber(range?.end) && 
    range.start <= range.end
  );
}
