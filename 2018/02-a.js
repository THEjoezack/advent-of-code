// https://adventofcode.com/2018/day/2

const boxList = require('fs')
  .readFileSync('inputData/02-likelyBoxID.txt', 'utf-8')
  .split(require('os').EOL)

const aggregate = boxList
  // count the letters
  .map(id => {
    const counts = {}
    for (let i = 0; i < id.length; i++) {
      const letter = id[i]
      counts[letter] = counts[letter] ? counts[letter] + 1 : 1
    }
    return counts
  })
  // find the ones that have two and three matches
  .map(counts => {
    let hasTwo = 0
    let hasThree = 0
    for (const letter in counts) {
      if (hasTwo && hasThree) {
        break
      } else if (counts[letter] === 2) {
        hasTwo = 1
      } else if (counts[letter] === 3) {
        hasThree = 1
      }
    }
    return { hasTwo, hasThree }
  })
  // add up the values
  .reduce(
    (aggregate, boxValues) => {
      aggregate.hasTwo += boxValues.hasTwo
      aggregate.hasThree += boxValues.hasThree
      return aggregate
    },
    { hasTwo: 0, hasThree: 0 }
  )

console.log(`Checksum: ${aggregate.hasTwo * aggregate.hasThree}`)
