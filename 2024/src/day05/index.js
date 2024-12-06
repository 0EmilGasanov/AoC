import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const parseRulesUpdates = (rawInput) => {
  let rules = new Map();
  let updates = [];
  let addRule = true;
  rawInput.split("\n").map((line) => {
    if (line == '') {
      addRule = false;
      return
    }

    if (addRule) {
      const [sar, dor] = line.split("|")

      if (rules.has(sar)) {
        rules.set(sar, [...rules.get(sar), dor])
        return
      }
      rules.set(sar, [dor])
    } else {
      updates.push(line.split(","))
    }
  })

  return { rules, updates };
}

const checkRule = (rule, pages) => {
  // no rules or pages -> pass
  if (!rule || !pages.length) {
    return true
  }

  for (let page of pages) {
    // page contradicting rule! -> fail
    if (rule.includes(page)) {
      return false
    }
  }

  // everything ok -> pass
  return true
};

const part1 = (rawInput) => {
  const { rules, updates } = parseRulesUpdates(rawInput);

  console.log({ rules }, { updates })

  let result = 0;

updateLoop:
  for (let update of updates) {

    // go right to left
    for (let i = update.length - 1; i >= 0; i--) {

      // rule broken!
      if (!checkRule(rules.get(update[i]), update.slice(0, i))) {
        continue updateLoop;
      }
    }

    result += parseInt(update[Math.floor(update.length / 2)])
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseRulesUpdates(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
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
