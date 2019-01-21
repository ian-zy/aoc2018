import fs from "fs";
import { parseCoordinate, findLargestArea, findAnotherArea } from "./day-6";

async function loadTestInputAsStringArray(filename: string) {
  const fileContent = await fs.promises.readFile(filename, "utf8");
  return fileContent.split("\n");
}

test("parseCoordinate", () => {
  expect(parseCoordinate("1, 1", 1)).toEqual({id: 1, x: 1, y: 1 });
  expect(parseCoordinate(" 1, 1 ", 1)).toEqual({id: 1,  x: 1, y: 1 });
  expect(parseCoordinate("1  ,  1", 1)).toEqual({id: 1, x: 1, y: 1 });
});

describe("findLargestArea", () => {
  it("should find the size of the largest area that isn't infinite", () => {
    const inputs = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].map(
      parseCoordinate
    );
    expect(findLargestArea(inputs)).toBe(17);
  });
  xit("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day6/input.txt");
    expect(findLargestArea(inputs.map(parseCoordinate))).toBe(5035);
  });
});

describe("findAnotherArea", () => {
  it("should find the size of the area where total distance is less than given number", () => {
    const inputs = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].map(
      parseCoordinate
    );
    expect(findAnotherArea(inputs, 32)).toBe(16);
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day6/input.txt");
    expect(findAnotherArea(inputs.map(parseCoordinate), 10000)).toBe(35294);
  });
});