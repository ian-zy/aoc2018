function checksum(ids) {
  const countLetters = id => {
    const counts = {};
    Array.from(id).forEach(c => {
      if (!!counts[c]) {
        counts[c]++;
      } else {
        counts[c] = 1;
      }
    });
    return counts;
  };

  const hasExactly = (n ,counts) => Object.values(counts).some(c => c === n) ? 1 : 0

  const countExactlyLetters = counts => [hasExactly(2, counts),hasExactly(3, counts)];

  const counts = ids
    .map(countLetters)
    .map(countExactlyLetters)
    .reduce((preV, curV) => [preV[0] + curV[0], preV[1] + curV[1]]);

  return counts[0] * counts[1];
}

function findCommonID(ids) {
  const findCommonPart = (s1, s2) => {
    if (s1.length !== s2.length) return null;
    for (let i = 0; i < s1.length; i++) {
      const t1 = s1.substring(0, i).concat(s1.substring(i + 1));
      const t2 = s2.substring(0, i).concat(s2.substring(i + 1));
      if (t1 === t2) return t1;
    }
    return null;
  };
  for (let i = 0; i < ids.length - 1; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const commonPart = findCommonPart(ids[i], ids[j]);
      if (!!commonPart) return commonPart;
    }
  }
}

module.exports = {
  checksum,
  findCommonID
};
