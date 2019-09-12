const getRackID = x => x + 10

const getPowerLevel = (x, y, serialNumber) => {
  const rackID = getRackID(x)
  const reducedRackID = rackID / 100
  const result = (((rackID * y + serialNumber) * reducedRackID) % 10) - 5
  return Math.floor(result)
}

const cells = []
const initCells = serialNumber => {
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      const key = getCacheKey(x, y)
      cells[key] = getPowerLevel(x, y, serialNumber)
    }
  }
}

const getSum = (startingX, startingY, size, cache) => {
  if (startingX + size > 300 || startingY + size > 300) {
    return -Infinity
  }

  let sum = 0
  const maxX = startingX + size - 1
  const maxY = startingY + size - 1

  for (let x = startingX; x < startingX + size; x++) {
    const key = getCacheKey(x, maxY)
    sum += cells[key]
  }
  // need the -1 so we dont' double count
  for (let y = startingY; y < startingY + size - 1; y++) {
    const key = getCacheKey(maxX, y)
    sum += cells[key]
  }

  return sum
}

const getCachedSum = (size, x, y, cache) => {
  if (size === 1) {
    return 0
  }
  return cache[getCacheKey(x, y)]
}

const getCacheKey = (x, y) => x * 300 + y

initCells(2568)

const max = { x: null, y: null, sum: 0, size: null }

for (let startX = 1; startX <= 300; startX++) {
  for (let startY = 1; startY <= 300; startY++) {
    let sum = 0
    for (let x = startX; x < startX + size; x++) {
      if (x > 300) {
        break
      }
      for (let y = startY; y < startY + size; y++) {
        if (y > 300) {
          break
        }
        sum += cells(getCacheKey(x, y))
        if (x === y) {
          // we're at a square
        }
      }
    }
    // if (sum > max.sum) {
    //   max.x = x
    //   max.y = y
    //   max.sum = cache[cacheKey]
    //   max.size = size
    // }
  }
}
console.log(max)
