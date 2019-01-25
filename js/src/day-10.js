const createStar = str => {
  const [x, y, vx, vy] = str.match(/position=<\s*(-*\d+)\s*,\s*(-*\d+)\s*> velocity=<\s*(-*\d+)\s*,\s*(-*\d+)\s*>/).slice(1).map(n => parseInt(n)); 
  return {x, y, vx, vy};
};

const move = ({ x, y, vx, vy }, time) => ({
  x: x + vx * time,
  y: y + vy * time,
  vx,
  vy
});

const getBound = stars => {
  const xs = stars.map(s => s.x);
  const ys = stars.map(s => s.y);
  const delta = ns => Math.max(...ns) - Math.min(...ns);
  return [delta(xs), delta(ys)];
}

function findConvergenceTime(inputs) {
  let stars = inputs.map(s => createStar(s));
  let timeSpent = 0;
  let prevBound = Infinity;

  while(true) {
    stars = stars.map(s => move(s, 1));
    const [_, yBound] = getBound(stars);
    if(yBound <= prevBound) {
      prevBound = yBound;
    } else {
      break;
    }
    timeSpent += 1;
  }

  return timeSpent;
}

function plotStars(stars) {
  const xs = stars.map(s => s.x);
  const ys = stars.map(s => s.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const starLocations = new Set();
  stars.forEach(s => starLocations.add(`${s.x - minX}-${s.y - minY}`));

  let bitmap = "";
  for(let r=0; r<=(maxY-minY); r++) {
    for(let c=0; c<=(maxX-minX); c++) {
      if(starLocations.has(`${c}-${r}`)) {
        bitmap += "X";
      } else {
        bitmap += " ";
      }
    }
    bitmap += "\n";
  }
  return bitmap;
}

function plotStarsInSeconds(inputs, time) {
  const stars = inputs.map(s => createStar(s)).map(s => move(s, time));
  return plotStars(stars);
}

module.exports = {
  createStar,
  move,
  getBound,
  findConvergenceTime,
  plotStarsInSeconds
}