import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const parseEquations = (input) => {
  const equations = [];
  for (let row of input) {
    const [result, values] = row.split(": ");

    equations.push({
      values: values.split(" ").map((val) => parseInt(val)),
      result: parseInt(result)
    })
  }

  return equations
}

/**
 * 
 * @param {number[]} arr 
 * @param {number} result 
 * @param {boolean} concat - default false
 * @returns 
 */
const checkEquation = (arr, result, concat = false) => {
  if (arr.length == 1) {
    return arr[0] == result;
  }

  if (arr[0] > result) {
    return false;
  }

  let num = arr.shift();
  let sumArray = [...arr];
  let prodArray = [...arr];
  let concatArray;

  sumArray[0] += num;
  prodArray[0] *= num;

  if (concat) {
    concatArray = [...arr];
    concatArray[0] = parseInt(num.toString() + concatArray[0].toString())
  }

  return checkEquation(sumArray, result, concat) || checkEquation(prodArray, result, concat) || (concat && checkEquation(concatArray, result, concat));
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const equations = parseEquations(input);

  return equations.reduce((result, equation) => {
    if (checkEquation(equation.values, equation.result, false)) {
      return result += equation.result
    }

    return result;
  }, 0)
};



const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const equations = parseEquations(input)

  return equations.reduce((result, equation) => {
    if (checkEquation(equation.values, equation.result, true)) {
      return result += equation.result
    }

    return result;
  }, 0)

};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
