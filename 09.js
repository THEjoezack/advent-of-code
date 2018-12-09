class MarbleRing {
  // Initialize with 0
  constructor () {
    this.current = { value: 0 }
    this.current.clockwise = this.current
    this.current.counterClockwise = this.current
  }
  place (value) {
    // Special case, don't place 23, remove -7
    if (value % 23 === 0) {
      const removeMarble = this.removeRelative(-7)
      this.current = removeMarble.clockwise
      return value + removeMarble.value
    }

    // Place between the marbles that are 1 and 2 marbles clockwise
    this.current = this.insert(
      value,
      this.cycle(this.current, 2),
      this.cycle(this.current, 1)
    )

    return 0
  }
  insert (value, clockwise, counterClockwise) {
    const newNode = { value, clockwise, counterClockwise }
    counterClockwise.clockwise = newNode
    clockwise.counterClockwise = newNode
    return newNode
  }
  removeRelative (difference) {
    const removeMarble = this.cycle(this.current, difference)
    removeMarble.clockwise.counterClockwise = removeMarble.counterClockwise
    removeMarble.counterClockwise.clockwise = removeMarble.clockwise
    return removeMarble
  }
  cycle (node, distance) {
    let result = node
    while (distance > 0) {
      result = result.clockwise
      distance--
    }
    while (distance < 0) {
      result = result.counterClockwise
      distance++
    }
    return result
  }
}

const [playerCount, lastValue] = [477, 70851 * 100]
const scores = new Array(playerCount).fill(0)
const ring = new MarbleRing()

for (let value = 1; value <= lastValue; value++) {
  scores[value % playerCount] += ring.place(value)
}
maxScore = scores.sort()[scores.length - 1]
console.log(maxScore)
