const eol = require('os').EOL

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
    getOpenTilesInRange: () => {
      return unit.getTilesInRange().filter(t => {
        return t !== null && t.isOpen()
      })
    },
    getTilesInRange: () => {
      // no diagonals, reading order
      const { x, y } = unit.node
      return [
        getNode(x, y - 1),
        getNode(x - 1, y),
        getNode(x + 1, y),
        getNode(x, y + 1)
      ]
    },
    takeTurn: () => {
      // identify targets
      const targets = unit.getTargets()
      console.log(`Got ${targets.length} targets`)

      // if no targets left, game over
      if (!targets.length) {
        console.log(`No more targets! ${unit.glyph} won!`)
        process.exit()
      }

      // get target ranges
      let destinationTiles = []
      targets.forEach(t => {
        destinationTiles = destinationTiles.concat(t.getOpenTilesInRange())
      })
      console.log(`${destinationTiles.length} tiles we want to move to`)

      // if in range, attack

      // otherwise move
      unit.move(destinationTiles)
    },
    move: destinationTiles => {
      const myAvailableMoves = unit.getOpenTilesInRange()
      console.log(
        `${myAvailableMoves.length} moves available to ${unit.glyph} at ${
          unit.node.key
        }`
      )
      let move = null
      for (let i = 0; i < myAvailableMoves.length; i++) {
        const inRangeForMovement = destinationTiles.filter(
          dt => dt.key === myAvailableMoves[i].key
        )
        if (inRangeForMovement.length) {
          move = inRangeForMovement[0]
          console.log(`Found move ${move.key}!!`)
        }
      }
      return move
    }
  }
  if (node.elf) {
    units.elves.push(unit)
  } else {
    units.goblins.push(unit)
  }
  return unit
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

const round = map => {
  // reading order
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const unit = map[y][x].getUnit()
      if (unit) {
        unit.takeTurn()
        console.log(`${unit.glyph} at ${unit.node.key} goes next`)
      }
    }
  }
}

const map = getBasicMap()
const units = {
  goblins: [],
  elves: []
}
createUnits(map)
drawMap(map)
round(map)
