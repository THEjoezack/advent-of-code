const fs = require('fs')

// break up the claim data so it's easier to work with
const claims = fs
  .readFileSync('inputData/03-claims.txt', 'utf-8')
  .split(require('os').EOL)
  .reduce((claims, c) => {
    const parts = c.split(' ')
    const location = parts[2].replace(':', '').split(',')
    const size = parts[3].split('x')
    claims[parts[0]] = {
      text: c,
      id: parts[0],
      left: parseInt(location[0]),
      top: parseInt(location[1]),
      width: parseInt(size[0]),
      height: parseInt(size[1]),
      conflicts: false
    }
    return claims
  }, {})

const reserved = {}

// tag everything that conflicts
Object.keys(claims).forEach(key => {
  const c = claims[key]
  for (let x = c.left; x < c.left + c.width; x++) {
    for (let y = c.top; y < c.top + c.height; y++) {
      const location = `${x}x${y}`
      reserved[location] = reserved[location] || []
      reserved[location].push(c.id)

      // seems really inefficient to keep retagging the same claims...
      if (reserved[location].length > 1) {
        for (let i = 0; i < reserved[location].length; i++) {
          const conflictKey = reserved[location][i]
          claims[conflictKey].conflicts = true
        }
      }
    }
  }
})

const uncontestedId = Object.keys(claims).find(i => !claims[i].conflicts)
console.log(claims[uncontestedId].id)
