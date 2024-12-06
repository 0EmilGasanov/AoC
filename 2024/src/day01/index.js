import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let list1 = []
  let list2 = [];

  input.forEach((element) => {
    let nums = element.split("   ");
    list1.push(nums[0])
    list2.push(nums[1])
  })

  list1.sort();
  list2.sort();

  let result = 0;

  for (let i = 0; i < list1.length; i++) {
    result += Math.abs(list1[i] - list2[i])
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let list1 = [];
  let list2 = [];
console.log(input)
  input.forEach((element) => {
    let nums = element.split("   ");
    list1.push(nums[0])
    list2.push(nums[1])
  })

  list1.sort();
  list2.sort();

  let result = 0;
  console.log(list1, list2)

  for (let i = 0; i < list1.length; i++) {

    let count = 0;
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] == list2[j]) {
        count++
      }
    }

    result += list1[i] * count
  }
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
