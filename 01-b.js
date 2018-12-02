// https://adventofcode.com/2018/day/1

const inputText = require(`fs`).readFileSync(
  `inputData/01-frequencies.txt`,
  `utf8`
)
const frequencyTracker = {} // initialize with 0, our starting value
const changeSequence = inputText.split('\n').map(i => parseInt(i)) // meh, it's a small file

let currentFrequency = 0
let i = 0

// While our current frequency is unique....
while (!frequencyTracker[currentFrequency]) {
  frequencyTracker[currentFrequency] = true // log it
  currentFrequency += changeSequence[i % changeSequence.length] // update our current frequency
  i++
}

console.log(currentFrequency)
