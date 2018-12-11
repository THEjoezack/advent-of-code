const getRackID = x => x + 10

const getPowerLevel = (x, y, serialNumber) => {
  const rackID = getRackID(x)
  const reducedRackID = rackID / 100
  const result = (((rackID * y + serialNumber) * reducedRackID) % 10) - 5
  return Math.floor(result)
}

const cells = [] // for memoization
const getSum = (startingX, startingY, serialNumber) => {
  let sum = 0
  for (let x = startingX; x < startingX + 3; x++) {
    for (let y = startingY; y < startingY + 3; y++) {
      const key = x * 300 + y
      if (!cells[key]) {
        cells[key] = getPowerLevel(x, y, serialNumber)
      }
      sum += cells[key]
    }
  }
  return sum
}

const serialNumber = 2568
const max = { x: null, y: null, sum: 0 }
for (let x = 1; x <= 297; x++) {
  for (let y = 1; y <= 297; y++) {
    const squareSum = getSum(x, y, serialNumber)
    if (squareSum > max.sum) {
      max.x = x
      max.y = y
      max.sum = squareSum
    }
  }
}
console.log(max)
