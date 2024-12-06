import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const part1 = (rawInput) => {
  const mul = (num1, num2) => num1 * num2;
  const regex = /mul\(\d\d?\d?,\d\d?\d?\)/gm
  const correctMuls = rawInput.matchAll(regex);
  let result = 0;
  for (let mulStr of correctMuls) {
    result += eval(mulStr[0]);
  }

  return result;
};
const part2 = (rawInput) => {
  const mul = (num1, num2) => num1 * num2;

  const regex = /mul\(\d\d?\d?,\d\d?\d?\)|don't\(\)|do\(\)/gm;
  const matches = rawInput.matchAll(regex);

  let result = 0;
  let doMul = true;
  for (let match of matches) {
    if (match[0] == "don't()") {
      doMul = false;
    } else if (match[0] == "do()") {
      doMul = true
    } else if (doMul) {
      result += eval(match[0]);
    }
  }

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
