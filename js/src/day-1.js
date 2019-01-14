const Lazy = require("lazy.js");
const { Map } = require("immutable");

function calculateFrequency(freqeuncyChanges) {
  return freqeuncyChanges.reduce((pv, cv) => pv + cv, 0);
}

function findFirstDuplicateFrequency(freqeuncyChanges) {
  const prevResults = {};
  let lastResult = 0;
  let index = 0;
  do {
    prevResults[lastResult] = true;
    lastResult += freqeuncyChanges[index];
    index = (index + 1) % freqeuncyChanges.length;
  } while (!prevResults[lastResult]);
  return lastResult;
}

function reduceWhile(aggregator, terminator, memo, sequence) {
  let iteration = 0;
  do {
    memo = aggregator(memo, sequence.head());
    sequence = sequence.tail();
  } while (!sequence.isEmpty() && !terminator(memo));
  return memo;
  // const val = sequence.head();
  // const acc = aggregator(memo, val);
  // return sequence.tail().isEmpty() || terminator(acc)
  //   ? acc
  //   : reduceWhile(aggregator, terminator, acc, sequence.tail());
}

function findFirstDuplicateFrequencyFP(freqeuncyChanges) {
  const aggregator = (acc, val) => {
    const newFrequency = acc.lastFrequency + val;
    return {
      frequencyCounts: acc.frequencyCounts.has(newFrequency)
        ? acc.frequencyCounts.update(newFrequency, count => count + 1)
        : acc.frequencyCounts.set(newFrequency, 1),
      lastFrequency: newFrequency
    };
  };
  const terminator = acc => acc.frequencyCounts.get(acc.lastFrequency) > 1;
  const memo = {
    frequencyCounts: Map().set(0, 1),
    lastFrequency: 0
  };
  const sequence = Lazy.generate(
    index => freqeuncyChanges[index % freqeuncyChanges.length]
  );
  return reduceWhile(aggregator, terminator, memo, sequence).lastFrequency;
}

module.exports = {
  calculateFrequency,
  findFirstDuplicateFrequency,
  reduceWhile,
  findFirstDuplicateFrequencyFP
};
