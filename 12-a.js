const getInputData = () => {
  const lines = require('fs')
    .readFileSync('inputData\\12-rules.txt', 'utf-8')
    .split('\r\n')
  const state = lines[0].match(/.*:\s(.*)/)[1]
  const rules = lines.slice(2, lines.length).map(r => {
    const parts = r.split(' => ')
    return { set: parts[0], result: parts[1] }
  })
  return { state, rules, start: 0 }
}

const getResult = (input, index) => {
  const { state, rules } = input
  const set = getSet(state, index)
  const match = rules.find(r => r.set === set)
  if (match) {
    return match.result
  }
  return '.'
}

const getSet = (state, i) => {
  get = i => (state[i] ? state[i] : '.')
  return [get(i - 2), get(i - 1), get(i), get(i + 1), get(i + 2)].join('')
}

const compress = input => {
  const trimmedBeginning = input.state.replace(/^\.+/, '')
  const trimCount = input.state.length - trimmedBeginning.length
  input.start = input.start - 2 + trimCount
  input.state = trimmedBeginning.replace(/\.+$/, '')
}

const getSum = input => {
  let sum = 0
  for (let i = 0; i < input.state.length; i++) {
    if (input.state[i] === '#') {
      sum = sum + input.start + i
    }
  }
  return sum
}

const input = getInputData()

for (let round = 0; round < 20; round++) {
  let next = []
  for (let i = -2; i < input.state.length + 2; i++) {
    next.push(getResult(input, i))
  }
  input.state = next.join('')
  compress(input)
}
console.log('ok')
console.log(`Final start: ${input.start}`)

console.log(getSum(input))
