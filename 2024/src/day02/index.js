import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let safeCount = 0;
  input.forEach((report) => {
    let levels = report.split(" ");
    let dirAsc;
    for (let i = 0; i < levels.length - 1; i++) {

      let diff = parseInt(levels[i + 1]) - parseInt(levels[i]);
      if (!diff) {
        return
      }

      if (Math.abs(diff) > 3) {
        return
      }

      if (dirAsc == undefined) {
        dirAsc = parseInt(levels[i]) < parseInt(levels[i + 1])
        continue
      }

      if (dirAsc !== diff > 0) {
        return
      }

    }
    safeCount++
  })

  return safeCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let safeCount = 0;
  input.forEach((report) => {
    let levels = report.split(" ");
    let fixed = false;
    let dirAsc

    if (parseInt(levels[0]) == parseInt(levels[1])) {
      levels.shift()
      fixed = true

      dirAsc = parseInt(levels[0]) < parseInt(levels[1])
    } else {

      // initialize direction
       dirAsc = parseInt(levels[0]) < parseInt(levels[1])
      if (parseInt(levels[0]) != parseInt(levels[1]) && dirAsc != parseInt(levels[1]) < parseInt(levels[2])) {
        fixed = true;

        if (dirAsc == parseInt(levels[2]) < parseInt(levels[3])) {
          levels.splice(1, 1);
        } else {
          levels.shift()
          dirAsc = !dirAsc;
        }
      }
    }


    for (let i = 0; i < levels.length - 1; i++) {

      // difference of current and next level
      let diff = parseInt(levels[i + 1]) - parseInt(levels[i]);

      // levels are equal
      if (diff === 0) {
        if (!fixed) {
          fixed = true;
          continue;
        }
        console.log("diff", levels, levels[i])
        return
      }

      // difference not between 1-3
      if (Math.abs(diff) > 3) {
        if (!fixed) {
          levels[i + 1] = levels[i]
          fixed = true;
          continue;
        }

        console.log("abs", levels, levels[i], diff)
        return
      }

      // direction changed
      if (dirAsc !== diff > 0) {
        if (!fixed) {
          levels[i + 1] = levels[i]
          fixed = true;
          continue;
        }
        console.log("dir", levels, levels[i])
        return
      }

    }
    safeCount++
  })

  return safeCount;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `4 5 3 2 1
        4 5 6 3 2 1
        5 10 9 8 7`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
