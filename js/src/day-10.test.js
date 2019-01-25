const {loadTestInputAsStringArray} = require('./utils');
const { createStar, move, getBound, findConvergenceTime, plotStarsInSeconds } = require("./day-10");

test("helper functions", () => {
  expect(createStar("position=< 9,  1> velocity=< 0,  2>")).toEqual({
    x: 9,
    y: 1,
    vx: 0,
    vy: 2
  });
  expect(move({ x: 9, y: 1, vx: 0, vy: 2 }, 2)).toEqual({
    x: 9,
    y: 5,
    vx: 0,
    vy: 2
  });
  expect(
    getBound([{ x: 9, y: 1, vx: 0, vy: 2 }, { x: 9, y: 5, vx: 0, vy: 2 }])
  ).toEqual([0, 4]);
});

describe("findConvergenceTime", () => {
  it("should find the time where all stars aligned", () => {
    const inputs = [
      "position=< 9,  1> velocity=< 0,  2>",
      "position=< 7,  0> velocity=<-1,  0>",
      "position=< 3, -2> velocity=<-1,  1>",
      "position=< 6, 10> velocity=<-2, -1>",
      "position=< 2, -4> velocity=< 2,  2>",
      "position=<-6, 10> velocity=< 2, -2>",
      "position=< 1,  8> velocity=< 1, -1>",
      "position=< 1,  7> velocity=< 1,  0>",
      "position=<-3, 11> velocity=< 1, -2>",
      "position=< 7,  6> velocity=<-1, -1>",
      "position=<-2,  3> velocity=< 1,  0>",
      "position=<-4,  3> velocity=< 2,  0>",
      "position=<10, -3> velocity=<-1,  1>",
      "position=< 5, 11> velocity=< 1, -2>",
      "position=< 4,  7> velocity=< 0, -1>",
      "position=< 8, -2> velocity=< 0,  1>",
      "position=<15,  0> velocity=<-2,  0>",
      "position=< 1,  6> velocity=< 1,  0>",
      "position=< 8,  9> velocity=< 0, -1>",
      "position=< 3,  3> velocity=<-1,  1>",
      "position=< 0,  5> velocity=< 0, -1>",
      "position=<-2,  2> velocity=< 2,  0>",
      "position=< 5, -2> velocity=< 1,  2>",
      "position=< 1,  4> velocity=< 2,  1>",
      "position=<-2,  7> velocity=< 2, -2>",
      "position=< 3,  6> velocity=<-1, -1>",
      "position=< 5,  0> velocity=< 1,  0>",
      "position=<-6,  0> velocity=< 2,  0>",
      "position=< 5,  9> velocity=< 1, -2>",
      "position=<14,  7> velocity=<-2,  0>",
      "position=<-3,  6> velocity=< 2, -1>"
    ];
    expect(findConvergenceTime(inputs)).toBe(3);
    console.log(plotStarsInSeconds(inputs, 3));
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day10/input.txt");
    expect(findConvergenceTime(inputs)).toBe(10558);
    console.log(plotStarsInSeconds(inputs, 10558));
  });
});
