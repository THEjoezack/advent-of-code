const width = 350
const height = 350

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

const updateOwners = matrix => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sorted = matrix[x][y].distances.sort(
        (a, b) => a.distance - b.distance
      )
      matrix[x][y].owner =
        sorted[0].distance === sorted[1].distance ? '.' : sorted[0].owner
    }
  }
}

const findLargestSize = matrix => {
  const counts = {}
  const excludeList = ['.']
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const owner = matrix[x][y].owner
      counts[owner] = (counts[owner] || 0) + 1
      // ignore infinites by not counting items on edges
      if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
        excludeList.push(owner)
      }
    }
  }

  excludeList.forEach(x => delete counts[x])
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
  return counts[sorted[0]]
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

updateOwners(matrix)
// print(matrix)
const size = findLargestSize(matrix)
console.log(size)
