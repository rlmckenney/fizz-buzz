import { performance, PerformanceObserver } from "node:perf_hooks";

import { transform as transform1 } from "./solution1";
import { transform as transform2 } from "./solution2";
import { transform as transform3 } from "./solution3";
import { transform as transform4 } from "./solution4";
import { transform as transform5 } from "./solution5";
import { transform as transform6 } from "./solution6";

/**
 * Set up a performance observer to measure the duration of each solution.
 */
const perfObserver = new PerformanceObserver((list, observer) => {
  let count = 1;
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}${count} duration: ${entry.duration}ms`);
    count++;
  }
  performance.clearMarks();
  performance.clearMeasures();
  observer.disconnect();
});

perfObserver.observe({ entryTypes: ["function"], buffered: true });

const perfS1 = performance.timerify(transform1);
const perfS2 = performance.timerify(transform2);
const perfS3 = performance.timerify(transform3);
const perfS4 = performance.timerify(transform4);
const perfS5 = performance.timerify(transform5);
const perfS6 = performance.timerify(transform6);

/**
 * Run each solution and log the results.
 */
const params = { start: 1, end: 5000000 };

console.log("Solution One  : " + perfS1(params));
console.log("Solution Two  : " + perfS2(params));
console.log("Solution Three: " + perfS3(params));
console.log("Solution Four : " + perfS4(params));
console.log("Solution Five : " + perfS5(params));
console.log("Solution Six  : " + perfS6(params));

// Performance Observations:
// node:
// - solution 1 is the fastest when run with a low number of iterations (e.g. 100)
// - solution 2 is the fastest when run with a high number of iterations (e.g. 5,000,000)
// ts-node:
// - solution 2 is the fastest when run with both low and high numbers of iterations
