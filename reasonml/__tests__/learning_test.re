open Jest;
open Expect;

test("loadTestInputAsStringArray", () =>
  expect(TestUtils.loadTestInputAsStringArray("../tasks/day9/input.txt"))
  |> toEqual([|"478 players; last marble is worth 71240 points"|])
);

test("loadTestInputAsIntArray", () =>
  expect(TestUtils.loadTestInputAsIntArray("../tasks/day1/input.txt")[0]) |> toEqual(-7));
