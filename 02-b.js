// https://adventofcode.com/2018/day/2

// if two strings are off by one or less letter (ordered), then return the common letters
getCloseMatchLetters = (a, b) => {
  let letterMismatch = false
  const matches = []
  for (let i = 0; i < a.length; i++) {
    // assuming they are all the same length...
    if (a[i] !== b[i]) {
      if (letterMismatch) {
        // if there's more than oen discrepancy...
        return null
      }
      letterMismatch = true
    } else {
      matches.push(a[i])
    }
  }
  return matches.join('')
}

const boxList = require('fs')
  .readFileSync('inputData/02-likelyBoxID.txt', 'utf-8')
  .split(require('os').EOL)

for (let i = 0; i < boxList.length; i++) {
  for (let j = i + 1; j < boxList.length; j++) {
    let matchingLetters = getCloseMatchLetters(boxList[i], boxList[j])
    if (matchingLetters) {
      console.log(`Common letters for close match: ${matchingLetters}`)
      process.exit(0)
    }
  }
}
