const fs = require("fs");
const Lazy = require("lazy.js");
const {
  calculateFrequency,
  findFirstDuplicateFrequency,
  reduceWhile,
  findFirstDuplicateFrequencyFP
} = require("./day-1");

function loadTestInput(filename) {
  const convertFileContentToIntegerArray = s =>
    s
      .split("\n")
      .map(s => s.replace(/\+/, ""))
      .map(s => parseInt(s));
  return fs.promises
    .readFile(filename, "utf8")
    .then(convertFileContentToIntegerArray);
}

describe("calculateFrequency", () => {
  it("should calculate final requency based on frequency drifts", () => {
    expect(calculateFrequency([1, 1, 1])).toBe(3);
    expect(calculateFrequency([1, 1, -2])).toBe(0);
    expect(calculateFrequency([-1, -2, -3])).toBe(-6);
  });
  it("should work with test input", () => {
    return loadTestInput("../tasks/day1/input.txt").then(input =>
      expect(calculateFrequency(input)).toBe(518)
    );
  });
});

describe("findFirstDuplicateFrequency", () => {
  it("should find the first repeated frequency", () => {
    expect(findFirstDuplicateFrequency([1, -2, 3, 1, 1, -2])).toBe(2);
    expect(findFirstDuplicateFrequency([1, -1])).toBe(0);
    expect(findFirstDuplicateFrequency([3, 3, 4, -2, -4])).toBe(10);
    expect(findFirstDuplicateFrequency([-6, 3, 8, 5, -6])).toBe(5);
    expect(findFirstDuplicateFrequency([7, 7, -2, -7, -4])).toBe(14);
  });
  it("should work with test input", () => {
    return loadTestInput("../tasks/day1/input.txt").then(input =>
      expect(findFirstDuplicateFrequency(input)).toBe(72889)
    );
  });
});

test("reduceWhile", () => {
  const sut = sequence => reduceWhile(
    (acc, val) => acc + val, 
    acc => acc > 9,
    0,
    sequence)
  expect(sut(Lazy([1]))).toBe(1);
  expect(sut(Lazy([1, 2, 3]))).toBe(6);
  expect(sut(Lazy([1, 2, 3, 4]))).toBe(10);
  expect(sut(Lazy([1, 2, 3, 4, 6]))).toBe(10);
});

describe("findFirstDuplicateFrequencyFP", () => {
  it("should find the first repeated frequency", () => {
    expect(findFirstDuplicateFrequencyFP([1, -2, 3, 1, 1, -2, 3, 4, 5])).toBe(2);
    expect(findFirstDuplicateFrequencyFP([1, -1])).toBe(0);
    expect(findFirstDuplicateFrequencyFP([3, 3, 4, -2, -4])).toBe(10);
    expect(findFirstDuplicateFrequencyFP([-6, 3, 8, 5, -6])).toBe(5);
    expect(findFirstDuplicateFrequencyFP([7, 7, -2, -7, -4])).toBe(14);
  });
  // !!! it is super low with a larger input size
  xit("should work with test input", () => {
    return loadTestInput("../tasks/day1/input.txt").then(input =>
      expect(findFirstDuplicateFrequencyFP(input)).toBe(72889)
    );
  });
});