import { sortSteps, computeConstructionTime } from "./day-7";
import { loadTestInputAsStringArray } from "./utils";

describe("sortSteps", () => {
  it("should sort the steps according to requirement in instructions", () => {
    const inputs = [
      "Step C must be finished before step A can begin.",
      "Step C must be finished before step F can begin.",
      "Step A must be finished before step B can begin.",
      "Step A must be finished before step D can begin.",
      "Step B must be finished before step E can begin.",
      "Step D must be finished before step E can begin.",
      "Step F must be finished before step E can begin."
    ];
    expect(sortSteps(inputs)).toBe("CABDFE");
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day7/input.txt");
    expect(sortSteps(inputs)).toBe("BFGKNRTWXIHPUMLQVZOYJACDSE");
  });
});

describe("computeConstructionTime", () => {
  it("should compute construction time with given instruction, number of workers and base step time", () => {
    const instructions = [
      "Step C must be finished before step A can begin.",
      "Step C must be finished before step F can begin.",
      "Step A must be finished before step B can begin.",
      "Step A must be finished before step D can begin.",
      "Step B must be finished before step E can begin.",
      "Step D must be finished before step E can begin.",
      "Step F must be finished before step E can begin."
    ];
    expect(computeConstructionTime(instructions, 2, 0)).toBe(15);
  });
  it("should work with task input", async () => {
    const instructions = await loadTestInputAsStringArray("../tasks/day7/input.txt");
    expect(computeConstructionTime(instructions, 5, 60)).toBe(1163);
  });
})
