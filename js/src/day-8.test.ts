import {loadSingleLineInputAsIntegerArray} from "./utils"
import {checksumLicense, findRootValueOfLicense} from './day-8'

describe("checksumLicense", () => {
  it("should compute the sum of all metadata", () => {
    const inputs = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
    expect(checksumLicense(inputs)).toBe(138)
  })
  it("should work with task input", async () => {
    const inputs = await loadSingleLineInputAsIntegerArray("../tasks/day8/input.txt")
    expect(checksumLicense(inputs)).toBe(42254)
  })
})

describe("findRootValueOfLicense", () => {
  it("should return the value of the root node in the license tree", () => {
    const inputs = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
    expect(findRootValueOfLicense(inputs)).toBe(66)
  })
  it("should work with task input", async () => {
    const inputs = await loadSingleLineInputAsIntegerArray("../tasks/day8/input.txt")
    expect(findRootValueOfLicense(inputs)).toBe(25007)
  })
})

