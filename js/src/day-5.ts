export function reactPolymer(polymer: string) {
  function isDestroyable(a: string, b: string) {
    return a !== undefined && a !== null
    && b !== undefined && b !== null
    && a.length === 1 && b.length === 1 
    && Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32
  }

  function subtractString(s: string, start: number, end: number) {
    return s.substring(0, start).concat(s.substring(end+1))
  }

  let index = 0
  let remaining = polymer
  while(index < remaining.length) {
    if(isDestroyable(remaining[index-1], remaining[index])) {
      remaining = subtractString(remaining, index-1, index)
      index -= 2
    } else if(isDestroyable(remaining[index], remaining[index+1])) {
      remaining = subtractString(remaining, index, index+1)
    } else {
      index += 1
    }
  }

  return remaining
}

export function findShortestPolymer(polymer: string) {
  let shortestLength = Number.MAX_VALUE
  let shortestPolymer = undefined
  for(let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    const regex = new RegExp(String.fromCharCode(i),'gi')
    const candidate = reactPolymer(polymer.replace(regex, ''))
    if(candidate.length < shortestLength) {
      shortestLength = candidate.length
      shortestPolymer = candidate
    }
  }
  return shortestPolymer
}
