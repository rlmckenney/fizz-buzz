import type { TransformerRange } from "./types";
import { isRange } from "./types";

type Labeller = (num: number) => string;

const isFizz = (num: number) => getLabel(num, 3, "Fizz");
const isBuzz = (num: number) => getLabel(num, 5, "Buzz");
const isZapp = (num: number) => getLabel(num, 7, "Zapp");

function combineLabels(num: number, funcs: Labeller[]): string {
  return funcs.reduce((label, fn) => label + fn(num), "");
}

function getLabel(num: number, divisor: number, label: string) {
  return num % divisor === 0 ? label : "";
}

export function transform({ start, end }: TransformerRange = { start: 1, end: 25 }) {
  if (!isRange({ start, end })) {
    throw new Error(`${JSON.stringify({ start, end })} is an Invalid Range`);
  }
  let result = "";
  for (let num = start; num <= end; num++) {
    result += combineLabels(num, [isFizz, isBuzz, isZapp]) || String(num);
    result += num === end ? "" : ", ";
  }
  return result;
}
