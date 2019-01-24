const { computeHighScore } = require('./day-9');

describe("computeHighScore", () => {
  it("should compute the highest score when game ends", () => {
    expect(computeHighScore(9, 25)).toBe(32);
    expect(computeHighScore(10, 1618)).toBe(8317);
    expect(computeHighScore(13, 7999)).toBe(146373);
    expect(computeHighScore(17, 1104)).toBe(2764);
    expect(computeHighScore(21, 6111)).toBe(54718);
    expect(computeHighScore(30, 5807)).toBe(37305);
  });
  it("should work with task input", () => {
    expect(computeHighScore(478, 71240)).toBe(375465);
  });
  it("should work with large task input", () => {
    expect(computeHighScore(478, 7124000)).toBe(3037741441);
  });
});
