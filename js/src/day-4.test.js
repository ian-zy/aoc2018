const { loadTestInputAsStringArray } = require("./utils");
const { findSleepyGuardStrategy1, findSleepyGuardStrategy2 } = require("./day-4");

describe("findSleepyGuardStrategy1", () => {
  it("should find the guard*minute product where the guard has most minutes asleep", () => {
    const inputs = [
      "[1518-11-01 00:25] wakes up",
      "[1518-11-01 00:00] Guard #10 begins shift",
      "[1518-11-05 00:45] falls asleep",
      "[1518-11-01 00:05] falls asleep",
      "[1518-11-03 00:05] Guard #10 begins shift",
      "[1518-11-01 23:58] Guard #99 begins shift",
      "[1518-11-02 00:50] wakes up",
      "[1518-11-01 00:55] wakes up",
      "[1518-11-02 00:40] falls asleep",
      "[1518-11-05 00:03] Guard #99 begins shift",
      "[1518-11-01 00:30] falls asleep",
      "[1518-11-04 00:02] Guard #99 begins shift",
      "[1518-11-03 00:24] falls asleep",
      "[1518-11-04 00:36] falls asleep",
      "[1518-11-03 00:29] wakes up",
      "[1518-11-04 00:46] wakes up",
      "[1518-11-05 00:55] wakes up"
    ];
    expect(findSleepyGuardStrategy1(inputs)).toBe(240);
  });
  it("should work with task input", async () => {
    const inputs = await loadTestInputAsStringArray("../tasks/day4/input.txt");
    expect(findSleepyGuardStrategy1(inputs)).toBe(36898);
  });
});

describe("findSleepyGuardStrategy2", () => {
    it("should find the guard*minute product where the guard most frequently sleep on the same minute", () => {
      const inputs = [
        "[1518-11-01 00:25] wakes up",
        "[1518-11-01 00:00] Guard #10 begins shift",
        "[1518-11-05 00:45] falls asleep",
        "[1518-11-01 00:05] falls asleep",
        "[1518-11-03 00:05] Guard #10 begins shift",
        "[1518-11-01 23:58] Guard #99 begins shift",
        "[1518-11-02 00:50] wakes up",
        "[1518-11-01 00:55] wakes up",
        "[1518-11-02 00:40] falls asleep",
        "[1518-11-05 00:03] Guard #99 begins shift",
        "[1518-11-01 00:30] falls asleep",
        "[1518-11-04 00:02] Guard #99 begins shift",
        "[1518-11-03 00:24] falls asleep",
        "[1518-11-04 00:36] falls asleep",
        "[1518-11-03 00:29] wakes up",
        "[1518-11-04 00:46] wakes up",
        "[1518-11-05 00:55] wakes up"
      ];
      expect(findSleepyGuardStrategy2(inputs)).toBe(4455);
    });
    it("should work with task input", async () => {
      const inputs = await loadTestInputAsStringArray("../tasks/day4/input.txt");
      expect(findSleepyGuardStrategy2(inputs)).toBe(80711);
    });
  });