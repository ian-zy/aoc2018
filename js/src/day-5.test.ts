import fs from "fs";
import { loadTestInputAsStringArray } from './utils'
import { reactPolymer, findShortestPolymer } from "./day-5";

describe("reactPolymer", () => {
  it("should destroy all two adjacent units of the same type and opposite polarity", () => {
    expect(reactPolymer("aA")).toHaveLength(0);
    expect(reactPolymer("abBA")).toHaveLength(0);
    expect(reactPolymer("abAB")).toHaveLength(4);
    expect(reactPolymer("aabAAB")).toHaveLength(6);
    expect(reactPolymer("dabAcCaCBAcCcaDA")).toHaveLength(10);
    expect(reactPolymer("vaDcZzCdAmQqtTOoMJQqMmjrRBRrYy")).toHaveLength(2);
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day5/input.txt");
    expect(reactPolymer(inputs[0])).toHaveLength(11298);
  });
});

describe("reactPolymer", () => {
  it("should find the shortest polyer by removing problematic unit", () => {
    expect(findShortestPolymer("dabAcCaCBAcCcaDA")).toHaveLength(4);
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day5/input.txt");
    expect(findShortestPolymer(inputs[0])).toHaveLength(5148);
  });
});

