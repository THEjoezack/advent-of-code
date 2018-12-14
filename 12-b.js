const getInputData = () => {
  const lines = require('fs')
    .readFileSync('inputData\\12-rules.txt', 'utf-8')
    .split('\r\n')
  const state = {}
  let max = 0
  lines[0]
    .match(/.*:\s(.*)/)[1]
    .split('')
    .forEach((l, i) => {
      if (l === '#') {
        state[i] = '#'
      }
      max++
    })
  const rules = lines.slice(2, lines.length).map(r => {
    const parts = r.split(' => ')
    return { set: parts[0], result: parts[1] }
  })
  return { state, rules, min: 0, max }
}

const setResult = (next, input, index) => {
  const { state, rules } = input
  const set = getSet(state, index)
  const match = rules.find(r => r.set === set)
  if (match && match.result === '#') {
    next[index] = '#'
    return index
  }
  return null
}

get = (i, state) => (state[i] ? state[i] : '.')

const getSet = (state, i) => {
  return [
    get(i - 2, state),
    get(i - 1, state),
    get(i, state),
    get(i + 1, state),
    get(i + 2, state)
  ].join('')
}

const getSum = state => {
  return Object.keys(state).reduce((sum, k) => sum + parseInt(k), 0)
}

const input = getInputData()
const stopValue = 1000

const predict = (lastStop, currentIndex, plantCount, currentTotal) => {
  return currentTotal + (lastStop - currentIndex) * plantCount
}

for (let round = 0; round < stopValue; round++) {
  let next = {}
  input.min = input.min - 2
  input.max = input.max + 2
  let localMin = Infinity
  let localMax = -Infinity
  for (let i = input.min; i < input.max; i++) {
    const result = setResult(next, input, i)
    if (result !== null) {
      if (localMin > result) {
        localMin = result
      } else if (localMax < result) {
        localMax = result
      }
    }
  }
  input.min = localMin
  input.max = localMax
  const currentPlantCount = Object.keys(input.state).length
  const nextPlantCount = Object.keys(input.state).length
  const currentSum = getSum(input.state)
  if (
    currentPlantCount === nextPlantCount &&
    currentSum === getSum(next) - nextPlantCount
  ) {
    console.log(
      `Pattern detected at round ${round}, length: ${currentPlantCount}, sum: ${currentSum}}`
    )

    const lastRound = 50000000000
    console.log(
      `Predicting round ${lastRound} at ${predict(
        lastRound,
        round,
        currentPlantCount,
        currentSum
      )}`
    )
    return
  }
  input.state = next
}
