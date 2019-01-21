interface Coordinate {
  id: number,
  x: number,
  y: number
}

export function parseCoordinate(coordinate: string, id: number) {
  const tokens = coordinate.trim().split(/\s*,\s*/).map(i => parseInt(i))
  return {
    id: id,
    x: tokens[0],
    y: tokens[1]
  }
}

function findManhattanDistance(x: number, y: number, coordinate: Coordinate) {
  return Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y)
}

function findBoundary(coordinates: Coordinate[], lens: (coordinate: Coordinate) => number) {
  const allVals = coordinates.map(lens).sort((a, b) => a - b)
  return [allVals.shift() || 0, allVals.pop() || 0]  
}

export function findLargestArea(coordinates: Coordinate[]) {
  // find boundary
  const [minX, maxX] = findBoundary(coordinates, c => c.x)
  const [minY, maxY] = findBoundary(coordinates, c => c.y)
    
  // find closest coordinate for each location within the boundary

  const locationMap: {[key:string] : [number[], number]} = {}
  // let visual = ""
  for(let y=minY; y<=maxY; y++) {
    for(let x=minX; x<=maxX; x++) {
      const key = `${x},${y}`
      coordinates.forEach(c => {
        const d = findManhattanDistance(x, y, c);
        if(locationMap[key] === undefined) {
          locationMap[key] = [[c.id], d]
        } else if(locationMap[key][1] > d){
          locationMap[key] = [[c.id], d]
        } else if(locationMap[key][1] === d && locationMap[key][0].indexOf(c.id) < 0) {
          locationMap[key][0].push(c.id)
        }
      })
    }
  }  

  // find area of each coordinate
  function findAreaOfCoordinate(locationMap: {[key:string] : [number[], number]}, coordinate: Coordinate, visited: string[]): number {
    const key = `${coordinate.x},${coordinate.y}`
    if(visited.indexOf(key) > -1) return 0;
    if(coordinate.x < minX || coordinate.x > maxX || coordinate.y < minY || coordinate.y > maxY) return Infinity;
    const [closestCoordinates, _] = locationMap[key]
    if(closestCoordinates.length > 1) return 0;
    if(closestCoordinates[0] !== coordinate.id) return 0;
    visited.push(key);
    return 1 
    + findAreaOfCoordinate(locationMap, {...coordinate, x: coordinate.x-1}, visited)
    + findAreaOfCoordinate(locationMap, {...coordinate, x: coordinate.x+1}, visited)
    + findAreaOfCoordinate(locationMap, {...coordinate, y: coordinate.y-1}, visited)
    + findAreaOfCoordinate(locationMap, {...coordinate, y: coordinate.y+1}, visited)
  }
  
  const areas = coordinates.map(c => findAreaOfCoordinate(locationMap, c, [])).filter(isFinite);
  return Math.max(...areas);
}

export function findAnotherArea(coordinates: Coordinate[], maxTotalDistance: number) {
    // find boundary
    const [minX, maxX] = findBoundary(coordinates, c => c.x)
    const [minY, maxY] = findBoundary(coordinates, c => c.y)

    let count = 0;
    for(let y=minY; y<=maxY; y++) {
      for(let x=minX; x<=maxX; x++) {
        const totalDistance = coordinates.map(c => findManhattanDistance(x, y, c)).reduce((a, b) => a + b)
        if(totalDistance < maxTotalDistance) count += 1
      }
    }
    return count;
}