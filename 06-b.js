const width = 350
const height = 350
const maxDistance = 10000

const loadCoords = () => {
  return require('fs')
    .readFileSync('inputData/06-coords.txt', 'utf-8')
    .split(require('os').EOL)
    .map(c => {
      const parts = c.split(', ')
      return {
        x: parts[0],
        y: parts[1]
      }
    })
}

const getStartingMatrix = () => {
  const matrix = []
  for (let x = 0; x < width; x++) {
    matrix[x] = []
    for (let y = 0; y < width; y++) {
      matrix[x][y] = { owner: '.', distances: [] }
    }
  }
  return matrix
}

const plot = (coords, matrix) => {
  coords.forEach((c, i) => {
    const owner = getLetter(i)
    updateDistances(owner, c, matrix)
  })
}

const getLetter = n => {
  return String.fromCharCode(65 + n)
}

const updateDistances = (owner, ownerCoords, matrix) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const deltaX = Math.abs(ownerCoords.x - x)
      const deltaY = Math.abs(ownerCoords.y - y)
      matrix[x][y].distances.push({
        owner,
        distance: deltaX + deltaY
      })
    }
  }
}

const updateSum = matrix => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sum = matrix[x][y].distances.reduce((sum, i) => {
        return sum + i.distance
      }, 0)
      matrix[x][y].owner = sum < maxDistance ? '#' : '.'
    }
  }
}

const findSafeRegionSize = matrix => {
  let sum = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const owner = matrix[x][y].owner
      if (owner === '#') {
        sum++
      }
    }
  }
  return sum
}

const print = matrix => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      process.stdout.write(matrix[x][y].owner)
    }
    process.stdout.write(require('os').EOL)
  }
}

const matrix = getStartingMatrix()
const coords = loadCoords()
plot(coords, matrix)
updateSum(matrix)
// print(matrix)
const size = findSafeRegionSize(matrix)
console.log(size)
