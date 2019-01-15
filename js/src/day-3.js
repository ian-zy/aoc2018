// This is a similar question on reddit
// https://www.reddit.com/r/dailyprogrammer/comments/23b1pr/4182014_challenge_158_hard_intersecting_rectangles/


function parseClaim(claim) {
  const [id, x, y, w, h] = claim
    .match(/#(\d+)\s*@\s*(\d+)\,(\d+)\:\s*(\d+)x(\d+)/)
    .slice(1)
    .map(n => parseInt(n));
  return { id, x, y, w, h };
}

function findMaxX(parsedClaims) {
  const allXs = parsedClaims.reduce(
    (xs, claim) => xs.concat([claim.x, claim.x + claim.w]),
    []
  );
  return Math.max(...allXs);
}

function renderClaim(bitmap, claim) {
  const { id, x, y, w, h } = claim;
  for (let r = y; r < y + h; r++) {
    for (let c = x; c < x + w; c++) {
      const pos = r * bitmap.width + c;
      if (!!bitmap[pos]) {
        bitmap[pos].push(id);
      } else {
        bitmap[pos] = [id];
      }
    }
  }
  return bitmap;
}

function renderClaims(parsedClaims) {
  const maxX = findMaxX(parsedClaims);
  return parsedClaims.reduce(renderClaim, { width: maxX });
}

function findOverlap(claims) {
  const parsedClaims = claims.map(parseClaim);
  return Object.values(renderClaims(parsedClaims)).filter(ids => ids.length > 1)
    .length;
}

function findNonOverlapClaim(claims) {
    const parsedClaims = claims.map(parseClaim);
    const allIds = new Set(parsedClaims.map(claim => claim.id))
    Object.values(renderClaims(parsedClaims))
    .filter(ids => ids.length > 1)
    .forEach(ids => ids.forEach(id => allIds.delete(id)))
    return allIds.values().next().value
}

module.exports = {
  findOverlap,
  findNonOverlapClaim
};
