const eol = require('os').EOL

const log = (message, level) => {
  const currentLevel = 1
  if (currentLevel === 0 || level) {
    // current level
    console.log(message)
  }
}

const getBasicMap = () => {
  const map = []
  require('fs')
    .readFileSync(`inputData/15-map.txt`, `ascii`)
    .split(eol)
    .forEach(line => {
      map.push(
        line.split('').map((glyph, x) => {
          const node = {
            key: `${x}x${map.length}`,
            x: x,
            y: map.length,
            initialGlyph: glyph,
            floor: glyph === '#' ? glyph : '.',
            goblin: glyph === 'G',
            elf: glyph === 'E',
            getUnit: () => node.elf || node.goblin,
            isOpen: () => !node.getUnit() && node.floor === '.'
          }
          return node
        })
      )
    })
  return map
}

const createUnits = map => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].elf) {
        map[y][x].elf = createUnit(map[y][x])
      } else if (map[y][x].goblin) {
        map[y][x].goblin = createUnit(map[y][x])
      }
    }
  }
}

const getNeighborNodes = node => {
  // no diagonals, reading order
  const { x, y } = node
  return [
    getNode(x, y - 1),
    getNode(x - 1, y),
    getNode(x + 1, y),
    getNode(x, y + 1)
  ]
}

const getNode = (x, y) => {
  if (y >= map.length || y < 0 || x >= map[y].length || x < 0) {
    return null
  }
  return map[y][x]
}

const createUnit = node => {
  const unit = {
    title: node.elf ? 'Elf' : 'Goblin',
    glyph: node.elf ? 'E' : 'G',
    node: node,
    getTargets: () => {
      return node.elf ? units.goblins : units.elves
    },
    getTargetTilesInRange: range => {
      const targetTiles = (range || unit.getTilesInRange()).filter(n => {
        return n !== null && n.getUnit() && n.getUnit().glyph != unit.glyph
      })

      return targetTiles
    },
    getOpenTilesInRange: range => {
      return (
        range ||
        unit.getTilesInRange().filter(t => {
          return t !== null && t.isOpen()
        })
      )
    },
    getTilesInRange: () => {
      return getNeighborNodes(unit.node)
    },
    lastAction: null,
    takeTurn: round => {
      if (unit.lastAction === round) {
        return
      }
      unit.lastAction = round

      // identify targets
      const targets = unit.getTargets()
      log(`Got ${targets.length} targets`)

      // if no targets left, game over
      if (!targets.length) {
        log(`No more targets! ${unit.glyph} won!`)
        process.exit()
      }

      const unitRange = unit.getTilesInRange()
      let targetsInRange = unit.getTargetTilesInRange(unitRange)

      // if in range, attack
      if (targetsInRange.length) {
        unit.attack(targetsInRange[0].getUnit())
      } else {
        // otherwise move
        unit.move(unitRange, targets)
      }
    },
    attack: target => {
      log(
        `${unit.node.key} will attack ${target.glyph} unit: ${target.node.key}`,
        2
      )
    },
    move: (unitRange, targets) => {
      let destinationTiles = []
      targets.forEach(t => {
        destinationTiles = destinationTiles.concat(t.getOpenTilesInRange())
      })
      log(`TODO is it reachable?`)
      log(`${destinationTiles.length} tiles we want to move to`)

      const move = unit.getMove(destinationTiles, unitRange)
      if (!move) {
        log(`${unit.glyph} at ${unit.node.key} is not moving`)
        return
      }
      const moveFromNode = unit.node
      move.elf = moveFromNode.elf
      move.goblin = moveFromNode.goblin
      moveFromNode.elf = null
      moveFromNode.goblin = null
      unit.node = move
      log(`Moved ${unit.glyph} from ${moveFromNode.key} to ${unit.node.key}`)
    },
    getMove: (destinationTiles, unitRange) => {
      const myAvailableMoves = unit.getOpenTilesInRange(unitRange)
      log(
        `${myAvailableMoves.length} moves available to ${unit.glyph} at ${
          unit.node.key
        }`
      )

      // Is there a move I can make that will immediately put me in range of a target?
      let move = null
      for (let i = 0; i < myAvailableMoves.length; i++) {
        const inRangeForMovement = destinationTiles.filter(
          dt => dt.key === myAvailableMoves[i].key
        )
        if (inRangeForMovement.length) {
          move = inRangeForMovement[0]
          log(`Found a move that is in range of a target: ${move.key}!!`)
          return move
        }
      }

      // Find the best move that wil put me closer to getting in range of an attacker
      // go through the destination tiles, find the closest, make sure it is navigable
      let min = Infinity
      destinationTiles.forEach(dt => {
        // TODO - do from each step in case 1 is better than another
        const bestPaths = unit.getAllPaths()
        log(`Getting best path to ${dt.key}`)
        const path = unit.getBestPath(dt, bestPaths)
        if (min > path.length) {
          console.log(
            `${path.length} steps from ${unit.node.key} to ${
              dt.key
            } starts at ${path[1].key}`
          )
          min = path.length
          move = path[1]
        }
      })

      return move
    },
    getBestPath: (end, allPaths) => {
      const path = []
      let currentKey = end.key
      while (currentKey != unit.node.key) {
        log(`Get best path, from ${unit.node.key} -> ${currentKey}`)
        path.push(allPaths[currentKey])
        currentKey = allPaths[currentKey].key
      }
      return path.reverse()
    },
    getAllPaths: () => {
      const start = unit.node
      const unexplored = [start]
      bestPaths = {}
      bestPaths[start.key] = null
      while (unexplored.length) {
        log(`Node ${start.key} unexplored: ${unexplored.length}`)

        current = unexplored.shift()
        const currentNeighbors = getNeighborNodes(current).filter(
          n => n != null && n.isOpen()
        )
        log(`Node ${current.key} currentNeighbors: ${currentNeighbors.length}`)
        currentNeighbors.forEach(next => {
          if (!bestPaths[next.key]) {
            log(`Next ${next.key} is unexplored, push ${current.key}`)
            unexplored.push(next)
            bestPaths[next.key] = current
          }
        })
      }
      return bestPaths
    }
  }
  if (node.elf) {
    units.elves.push(unit)
  } else {
    units.goblins.push(unit)
  }
  return unit
}

const getNodeByKey = key => {
  const [x, y] = key.split('x')
  return map[y][x]
}

const drawMap = map => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const unit = map[y][x].getUnit()
      if (unit) {
        process.stdout.write(unit.glyph)
      } else {
        process.stdout.write(map[y][x].floor)
      }
    }
    process.stdout.write(eol)
  }
}

let roundCount = 0
const round = map => {
  roundCount++
  // reading order
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const unit = map[y][x].getUnit()
      if (unit) {
        log(`${unit.glyph} at ${unit.node.key} goes next`)
        unit.takeTurn(roundCount)
        // drawMap(map)
      }
    }
  }
}
for (let i = 0; i < 10; i++) {
  console.log('.')
}
const map = getBasicMap()
const units = {
  goblins: [],
  elves: []
}
createUnits(map)
drawMap(map)
round(map)
drawMap(map)
round(map)
drawMap(map)
round(map)
drawMap(map)
