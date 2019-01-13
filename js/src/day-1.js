function calculateFrequency(freqeuncyChanges) {
  return freqeuncyChanges.reduce((pv, cv) => pv + cv, 0);
}

function findFirstDuplicateFrequency(freqeuncyChanges) {
    const prevResults = {}
    let lastResult = 0
    let index = 0
    do {
        prevResults[lastResult] = true
        lastResult += freqeuncyChanges[index]
        index = (index + 1) % freqeuncyChanges.length
    } while(!prevResults[lastResult])
    return lastResult
}

module.exports = {
  calculateFrequency,
  findFirstDuplicateFrequency
};
