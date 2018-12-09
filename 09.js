class MarbleRing {
  // First, the marble numbered 0 is placed in the circle.
  // The marble is both clockwise from itself and counter-clockwise from itself
  // 0 is the current marble.
  constructor () {
    this.current = { value: 0 }
    this.current.clockwise = this.current
    this.current.counterClockwise = this.current
  }
  place (value) {
    // special case
    if (value % 23 === 0) {
      const removeMarble = this.removeRelative(-7)
      this.current = removeMarble.clockwise
      return value + removeMarble.value
    }

    // place between the marbles that are 1 and 2 marbles clockwise
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
  find (fn) {
    let node = this.current
    let startingValue = node.value
    do {
      if (fn(node)) {
        return node
      }
      node = this.cycle(node, 1)
    } while (node.value !== startingValue)
  }
  toString () {
    let node = this.find(n => n.value === 0)
    let startingValue = node.value
    const result = []

    do {
      result.push(
        this.current.value === node.value
          ? `(${node.value})`
          : node.value.toString()
      )
      node = this.cycle(node, 1)
    } while (node.value !== startingValue)

    return result.join(' ')
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
