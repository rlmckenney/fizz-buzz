# FizBuzzZapp

For any given range of positive integers, this program will print the numbers from `start` to `end`, replacing those numbers divisible by 3 with 'Fizz', those divisible by 5 with 'Buzz', and those divisible by 7 with 'Zapp'. 

When a given value is divisible by multiple defined replacement cases, they will all be applied in increasing order. e.g. 15 becomes 'FizzBuzz', 21 becomes 'FizzZapp', 35 becomes 'BuzzZapp'. 

## Implementation Variants
For the sake of demonstration, this program has been implemented in six different ways. Each 'solution' module exports a `transform` function that takes an optional range (default is 1-25) and returns a string with each number in sequence or its designated replacement (Fizz, Buzz, Zapp, etc).

1. **Simple**: A simple implementation using a for loop and if statements.
2. **Functional**: A function to encapsulate the number<->string replacement logic.
3. **Function per case**: Builds on the previous implementation with named functions for each case.
4. **Function array**: An array of functions for each case with a reducer to combine the results.
5. **Function with Map**: A single function that uses a map to apply the replacement parameters.
6. **Range Generator**: Same as 5, with a range generator function and a for..of loop.

## Performance Comparison
Using node's `PerformanceObserver` and `performance.timerify`, the _main.ts_ module runs each of the six implementations with a range of 1-5,000,000 and logs the time taken to complete each.

On an Mac mini (M1), the calculated run times vary a little, but this is a representative sample of the results:

```
# Range: 1-5,000,000
transform1 duration: 771.874791ms
transform2 duration: 629.4537090000001ms
transform3 duration: 673.6324169999998ms
transform4 duration: 1162.2952080000005ms
transform5 duration: 733.4822089999998ms
transform6 duration: 990.6222500000003ms
```

```
# Range: 1-100
transform1 duration: 0.04262500000000102ms
transform2 duration: 0.10329099999999869ms
transform3 duration: 0.05741700000000094ms
transform4 duration: 0.2861250000000126ms
transform5 duration: 0.12170800000001236ms
transform6 duration: 0.2692920000000072ms
```

### Conclusion
For small ranges (less than 100), Solution 1 is the winner, but the sub-millisecond differences in performance are negligible for most practical purposes.

However, Solution 2 outperforms the others by a significant margin for large ranges. This implementation likely benefits from the V8 engine's caching of the function and the reduced overhead of calling a single function with different parameters for each substitution case.

# Usage
This project assumes you have version 20.x.x or later of [Node.js](https://nodejs.org) installed on your system. It is also using PNPM as the package manager, which will be installed automatically when you run `npm install` for the first time -- assumes that you have `corepack` enabled. 

## Enable Corepack (if not already enabled)
[corepack](https://nodejs.org/api/corepack.html) has been bundled with Node.js since Node.js 14.19, but it is not enabled by default. If you haven't enabled it already, run the following command:

```bash
corepack enable && corepack enable npm
```
This enables corepack globally. It is not necessary to enable it for each project.

## To install dependencies:

```bash
pnpm install
```

## To run durring development:

```bash
pnpm dev
```
This will run the TypeScript compiler in watch mode, so any changes you make to the source code will be automatically compiled to the dist folder. In paralell, it will run `node dist/main.js` in watch mode to exercise the application on any changes.

## To run tests:

```bash
# A suite of 12 tests will be run for each of the six implementations.
pnpm test

# Example partial output:
  ✔ transforms 3 to Fizz (0.883667ms)
  ✔ transforms 5 to Buzz (0.055791ms)
  ✔ transforms 7 to Zapp (0.046667ms)
  ✔ transforms 15 to FizzBuzz (0.042542ms)
  ✔ transforms 21 to FizzZapp (0.047125ms)
  ✔ transforms 35 to BuzzZapp (0.050417ms)
  ✔ returns FizzBuzzZapp for 0 (0.048666ms)
  ✔ does not transform 1 (0.137ms)
  ✔ transforms numbers from 1 to 25 if no range is given (0.171416ms)
  ✔ throws an error if end < start (0.576792ms)
  ✔ throws an error if range.start is not a positive number (0.066708ms)
  ✔ throws an error if range.end is not a positive number (0.0485ms)
```

_NOTE:_ This project uses Node.js's built-in test-runner, which has a few limitations when working with TypeScript source code. If you want to check code coverage, you can run `pnpm test:dist` after building the project.

## To build:

```bash
pnpm run build
```

## To run the built version:

```bash
pnpm start
```
