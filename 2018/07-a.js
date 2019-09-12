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
      stepMap[step.name] = { depedencies: [], dependents: [] }
    }
    if (!stepMap[step.requires]) {
      stepMap[step.requires] = { depedencies: [], dependents: [] }
    }
    return step
  })
  .forEach(i => {
    // track it both ways for easier lookups later
    stepMap[i.name].depedencies.push(i.requires)
    stepMap[i.requires].dependents.push(i.name)
  })

const getNextStepIndex = () => {
  for (let i = 0; i < alphaSteps.length; i++) {
    const stepName = alphaSteps[i]
    if (stepMap[stepName].depedencies.length === 0) {
      return i
    }
  }
}

const updateNextStep = nextStepIndex => {
  const nextStep = alphaSteps[nextStepIndex]
  alphaSteps.splice(nextStepIndex, 1)
  stepMap[nextStep].dependents.forEach(dependent => {
    stepMap[dependent].depedencies = stepMap[dependent].depedencies.filter(
      d => d !== nextStep
    )
  })
  orderedSteps.push(nextStep)
}

let alphaSteps = Object.keys(stepMap).sort()
const orderedSteps = []

while (alphaSteps.length) {
  const nextStepIndex = getNextStepIndex()
  updateNextStep(nextStepIndex)
}

console.log(orderedSteps.join(''))
