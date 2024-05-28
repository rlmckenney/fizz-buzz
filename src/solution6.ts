import type { TransformerRange } from "./types";
import { isRange } from "./types";

function* range(start: number, end: number) {
  let current = start;
  while (current <= end) {
    yield current++;
  }
}

function getLabel(num: number, labelMap: Map<number, string>) {
  let label = "";
  for (const [divisor, text] of labelMap) {
    if (num % divisor === 0) label += text;
  }
  return label || String(num);
}

const labelMap = new Map([
  [3, "Fizz"],
  [5, "Buzz"],
  [7, "Zapp"],
  // [11, "Bapp"],
  // [13, "Plop"],
]);

export function transform({ start, end }: TransformerRange = { start: 1, end: 25 }) {
  if (!isRange({ start, end })) {
    throw new Error(`${JSON.stringify({ start, end })} is an Invalid Range`);
  }
  let result = "";
  for (const num of range(start, end)) {
    result += getLabel(num, labelMap);
    result += num === end ? "" : ", ";
  }
  return result;
}
