const fs = require('fs')

const reserved = {}
const conflictingCount = fs
  .readFileSync('inputData/03-claims.txt', 'utf-8')
  .split(require('os').EOL)
  .map(c => {
    const parts = c.split(' ')
    const location = parts[2].replace(':', '').split(',')
    const size = parts[3].split('x')
    return {
      text: c,
      id: parts[0],
      left: parseInt(location[0]),
      top: parseInt(location[1]),
      width: parseInt(size[0]),
      height: parseInt(size[1])
    }
  })
  .reduce((conflictingCount, c) => {
    for (let x = c.left; x < c.left + c.width; x++) {
      for (let y = c.top; y < c.top + c.height; y++) {
        const key = `${x}x${y}`
        reserved[key] = (reserved[key] || 0) + 1
        // only count it the first time in conflicts
        if (reserved[key] === 2) {
          conflictingCount++
        }
      }
    }
    return conflictingCount
  }, 0)

console.log(conflictingCount)
