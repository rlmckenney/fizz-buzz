import type { TransformerRange } from "./types";
import { isRange } from "./types";

export function transform({ start, end }: TransformerRange = { start: 1, end: 25 }) {
  if (!isRange({ start, end })) {
    throw new Error(`${JSON.stringify({ start, end })} is an Invalid Range`);
  }
  let result = "";
  for (let num = start; num <= end; num++) {
    let label = "";
    if (num % 3 === 0) label += "Fizz";
    if (num % 5 === 0) label += "Buzz";
    if (num % 7 === 0) label += "Zapp";
    result += label || String(num);
    result += num === end ? "" : ", ";
  }
  return result;
}
