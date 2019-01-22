import SortedSet from "collections/sorted-set"
import _ from 'lodash'

export function sortSteps(instructions: string[]) {
  const requirements =  _
  .chain(instructions)
  .map(parseInstruction)
  .groupBy(e => e[1])
  .mapValues(v => v.map(e => e[0]))
  .value()

  const nextSteps = _
  .chain(instructions)
  .map(parseInstruction)
  .groupBy(e => e[0])
  .mapValues(v => v.map(e => e[1]))
  .value()

  const firstSteps = _.difference(_.keys(nextSteps), _.chain(nextSteps).values().flatten().value())
  const pendingSteps = new SortedSet(firstSteps)
  let sortedSteps: string[] = []

  let nextStep = pendingSteps.shift()
  while(nextStep !== undefined) {
    sortedSteps.push(nextStep)
    const candidateSteps = nextSteps[nextStep]
    if(candidateSteps !== undefined) {
      candidateSteps.filter(s => _.difference(requirements[s], sortedSteps).length === 0).forEach(s => pendingSteps.add(s))
    }
    nextStep = pendingSteps.shift()
  }
  return sortedSteps.join("")
}

function parseInstruction(instruction: string) {
  const tokens = instruction.match(/Step (\w+) must be finished before step (\w+) can begin/)
  return tokens === null ? [] : tokens.slice(1)
}

class Step {
  id: string;
  duration: number;
  timeSpent: number;

  constructor(id: string, duration: number) {
    this.id = id;
    this.duration = duration;
    this.timeSpent = 0;
  }

  continue() {
    this.timeSpent += 1
  }

  isCompleted() {
    return this.timeSpent >= this.duration
  }
}

export function computeConstructionTime(instructions: string[], numWorkers: number, baseStepTime: number) {
  const requirements =  _
  .chain(instructions)
  .map(parseInstruction)
  .groupBy(e => e[1])
  .mapValues(v => v.map(e => e[0]))
  .value()

  const nextSteps = _
  .chain(instructions)
  .map(parseInstruction)
  .groupBy(e => e[0])
  .mapValues(v => v.map(e => e[1]))
  .value()

  const firstSteps = _.difference(_.keys(nextSteps), _.chain(nextSteps).values().flatten().value())
  const pendingSteps = new SortedSet(firstSteps)
  let completedSteps: string[] = []
  let timeSpent = 0
  let workStarted = true
  let stepsInProgress: Step[] = []

  // allocated new steps
  const availableWorkers = numWorkers - stepsInProgress.length;
  for(let i=0; i<availableWorkers; i++) {
    const next = pendingSteps.shift()
    if(next === undefined) break;
    stepsInProgress.push(new Step(next, baseStepTime + next.charCodeAt(0) - "A".charCodeAt(0) + 1))
  }
  
  while(stepsInProgress.length > 0) {
    // increase time
    timeSpent += 1
    // update steps
    stepsInProgress.forEach(s => s.continue())
    // remove completed steps
    const completed = _.remove(stepsInProgress, s => s.isCompleted()).map(s => s.id)
    completedSteps.push(...completed)
    // add pending steps
    completed.forEach(s => {
      const candidateSteps = nextSteps[s]
      if(candidateSteps !== undefined) {
        candidateSteps.filter(s => _.difference(requirements[s], completedSteps).length === 0).forEach(s => pendingSteps.add(s))
      }
    })
    // allocated new steps
    const availableWorkers = numWorkers - stepsInProgress.length;
    for(let i=0; i<availableWorkers; i++) {
      const next = pendingSteps.shift()
      if(next === undefined) break;
      stepsInProgress.push(new Step(next, baseStepTime + next.charCodeAt(0) - "A".charCodeAt(0) + 1))
    }
  }
  return timeSpent
}