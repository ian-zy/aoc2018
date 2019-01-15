const { loadTestInputAsStringArray } = require('./utils')
const { findOverlap, findNonOverlapClaim } = require('./day-3')

describe('findOverlap', () => {
    it('should find the total overlapping area of given claims', () => {
        const inputs = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']
        expect(findOverlap(inputs)).toBe(4)
    })
    it('should work with task input', async () => {
        const inputs = await loadTestInputAsStringArray('../tasks/day3/input.txt')
        expect(findOverlap(inputs)).toBe(110383)
    })
})

describe('findNonOverlapClaim', () => {
    it('should find the id of the claim that does not overlap with any others', () => {
        const inputs = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']
        expect(findNonOverlapClaim(inputs)).toBe(3)
    })
    it('should work with task input', async () => {
        const inputs = await loadTestInputAsStringArray('../tasks/day3/input.txt')
        expect(findNonOverlapClaim(inputs)).toBe(129)
    })
})