import assert from "node:assert";
import { describe, it } from "node:test";

import { transform as solution1 } from "./solution1";
import { transform as solution2 } from "./solution2";
import { transform as solution3 } from "./solution3";
import { transform as solution4 } from "./solution4";
import { transform as solution5 } from "./solution5";
import { transform as solution6 } from "./solution6";

type Transformer = (range?: { start: number; end: number }) => string;

const suites: Array<[string, Transformer]> = [
  ["solution1", solution1],
  ["solution2", solution2],
  ["solution3", solution3],
  ["solution4", solution4],
  ["solution5", solution5],
  ["solution6", solution6],
];
for (const [suiteLabel, transform] of suites) {
  testTransform(suiteLabel, transform);
}

function testTransform(suiteLabel: string, transform: Transformer) {
  describe(suiteLabel, () => {
    it("transforms 3 to Fizz", () => {
      const expected = "Fizz";
      const result = transform({ start: 3, end: 3 });
      assert.equal(result, expected);
    });

    it("transforms 5 to Buzz", () => {
      const expected = "Buzz";
      const result = transform({ start: 5, end: 5 });
      assert.equal(result, expected);
    });

    it("transforms 7 to Zapp", () => {
      const expected = "Zapp";
      const result = transform({ start: 7, end: 7 });
      assert.equal(result, expected);
    });

    it("transforms 15 to FizzBuzz", () => {
      const expected = "FizzBuzz";
      const result = transform({ start: 15, end: 15 });
      assert.equal(result, expected);
    });

    it("transforms 21 to FizzZapp", () => {
      const expected = "FizzZapp";
      const result = transform({ start: 21, end: 21 });
      assert.equal(result, expected);
    });

    it("transforms 35 to BuzzZapp", () => {
      const expected = "BuzzZapp";
      const result = transform({ start: 35, end: 35 });
      assert.equal(result, expected);
    });

    it("returns FizzBuzzZapp for 0", () => {
      const expected = "FizzBuzzZapp";
      const result = transform({ start: 0, end: 0 });
      assert.equal(result, expected);
    });

    it("does not transform 1", () => {
      const expected = "1";
      const result = transform({ start: 1, end: 1 });
      assert.equal(result, expected);
    });

    it("transforms numbers from 1 to 25 if no range is given", () => {
      const expected =
        "1, 2, Fizz, 4, Buzz, Fizz, Zapp, 8, Fizz, Buzz, 11, Fizz, 13, Zapp, FizzBuzz, 16, 17, Fizz, 19, Buzz, FizzZapp, 22, 23, Fizz, Buzz";
      const result = transform();
      assert.equal(result, expected);
    });

    it("throws an error if end < start", () => {
      assert.throws(() => transform({ start: 1, end: 0 }), /Invalid Range/);
    });

    it("throws an error if range.start is not a positive number", () => {
      assert.throws(() => transform({ start: -1, end: 0 }), /Invalid Range/);
    });

    it("throws an error if range.end is not a positive number", () => {
      assert.throws(() => transform({ start: 0, end: -1 }), /Invalid Range/);
    });
  });
}
