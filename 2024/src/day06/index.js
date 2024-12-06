import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

const part1 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const height = matrix.length;
  const width = matrix[0].length;
  let pos = {
    h: 0,
    w: 0
  }

  // search guard position
  for (let i = 0; i < height; i++) {
    let wPos = matrix[i].indexOf('^');
    if (wPos > -1) {
      pos.h = i;
      pos.w = wPos;
      console.log({ pos })
      break;
    }
  }

  const directions = [
    { h: -1, w: 0 },   // up
    { h: 0, w: 1 },   // right
    { h: 1, w: 0 },   // down
    { h: 0, w: -1 },   // left
  ];
  let currentDirection = 0;

  let visitedFields = 0;
  while (pos.h > -1 && pos.h < height && pos.w > -1 && pos.w < width) {
    if (matrix[pos.h][pos.w] == '^' || matrix[pos.h][pos.w] == '.') {
      matrix[pos.h][pos.w] = 'X';
      visitedFields++;
    } else if (matrix[pos.h][pos.w] == '#') {
      pos.h -= directions[currentDirection].h;
      pos.w -= directions[currentDirection].w;

      currentDirection = (currentDirection + 1) % directions.length;
    }

    pos.h += directions[currentDirection].h;
    pos.w += directions[currentDirection].w;
  }

  return visitedFields;
};

const part2 = (rawInput) => {
  const input = parseMatrix(rawInput);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ``,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
