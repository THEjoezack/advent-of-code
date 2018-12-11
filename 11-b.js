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

  let sum = getCachedSum(size, startingX, startingY, cache)
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
let cache = []
for (size = 1; size <= 300; size++) {
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      const cacheKey = getCacheKey(x, y)
      cache[cacheKey] = getSum(x, y, size, cache)
      if (cache[cacheKey] > max.sum) {
        max.x = x
        max.y = y
        max.sum = cache[cacheKey]
        max.size = size
      }
    }
  }
}
console.log(max)
