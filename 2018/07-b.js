const stepMap = {}
require('fs')
  .readFileSync(`inputData/07-steps.txt`, 'utf-8')
  .split(`\n`)
  .map(i => {
    const matches = i.match(
      /Step (\w) must be finished before step (\w) can begin./
    )

    const step = { name: matches[2], requires: matches[1] }
    if (!stepMap[step.name]) {
      stepMap[step.name] = { depedencies: [], dependents: [], worker: 0 }
    }
    if (!stepMap[step.requires]) {
      stepMap[step.requires] = {
        depedencies: [],
        dependents: [],
        worker: 0
      }
    }
    return step
  })
  .forEach(i => {
    // track it both ways for easier lookups later
    stepMap[i.name].depedencies.push(i.requires)
    stepMap[i.requires].dependents.push(i.name)
  })

const workerPool = [1, 2, 3, 4, 5] // TODO

const getNextStepIndexes = () => {
  const nextStepIndexes = []
  for (let i = 0; i < alphaSteps.length; i++) {
    const stepName = alphaSteps[i]
    if (
      stepMap[stepName].depedencies.length === 0 &&
      !stepMap[stepName].worker &&
      workerPool.length
    ) {
      nextStepIndexes.push(i)
    }
  }
  return nextStepIndexes
}

const eventTracker = {}
const updateNextStep = nextStepIndexes => {
  nextStepIndexes.forEach(nextStepIndex => {
    const nextStep = alphaSteps[nextStepIndex]
    if (!workerPool.length) {
      return
    }
    const worker = workerPool.shift()
    stepMap[nextStep].worker = worker

    const completeTime =
      60 + 1 + currentSecond + nextStep.charCodeAt(0) - 'A'.charCodeAt(0) // TODO

    eventTracker[completeTime] = () => {
      stepMap[nextStep].dependents.forEach(dependent => {
        stepMap[dependent].depedencies = stepMap[dependent].depedencies.filter(
          d => d !== nextStep
        )
      })

      workerPool.push(worker)
      alphaSteps = alphaSteps.filter(i => i != nextStep)
      orderedSteps.push(nextStep)
    }
  })
}

let currentSecond = 0
const tick = () => {
  currentSecond++
  if (eventTracker[currentSecond]) {
    eventTracker[currentSecond]()
  }
  console.log(
    `[${currentSecond}] PoolSize: ${
      workerPool.length
    } Done: ${orderedSteps.join('')}`
  )
}

let alphaSteps = Object.keys(stepMap).sort()
const orderedSteps = []

while (alphaSteps.length) {
  const nextStepIndexes = getNextStepIndexes()
  updateNextStep(nextStepIndexes)
  tick()
  if (currentSecond > 1000) {
    break
  }
}

console.log(orderedSteps.join(''))
