const { loadTestInputAsStringArray } = require('./utils')
const { checksum, findCommonID } = require('./day-2')

describe('checksum', () => {
    it('should compute checksum for example inputs', () => {
        const inputs = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']
        expect(checksum(inputs)).toBe(12)
    })
    it('should work with test inputs', async () => {
        const inputs = await loadTestInputAsStringArray('../tasks/day2/input.txt')
        expect(checksum(inputs)).toBe(7410)
    })
})


describe('findCommonID', () => {
    it('should work with examples', () => {
        const inputs = ['abcde','fghij','klmno','pqrst','fguij','axcye','wvxyz'];
        expect(findCommonID(inputs)).toBe('fgij')
    })
    it('should work with test inputs', async () => {
        const inputs = await loadTestInputAsStringArray('../tasks/day2/input.txt')
        expect(findCommonID(inputs)).toBe('cnjxoritzhvbosyewrmqhgkul')
    })
})
