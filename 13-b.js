const getTracks = () => {
  const lines = require('fs')
    .readFileSync('inputData\\13-tracks.txt', 'ascii')
    .split(require('os').EOL)
    .map(l => l.split(''))

  const tracks = []
  for (let y = 0; y < lines.length; y++) {
    tracks[y] = []
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === ' ') {
        tracks[y].push(null)
      } else {
        const node = {
          key: `${x},${y}`,
          x: x,
          y: y,
          cart: null,
          track: null,
          initialGlyph: lines[y][x],
          up: null,
          down: null,
          left: null,
          right: null
        }
        tracks[y].push(node)
      }
    }
  }
  return tracks
}

getNeighbor = (tracks, x, y, ...allowed) => {
  if (x < 0 || y < 0 || y >= tracks.length || x >= tracks[y.length]) {
    return null
  }
  if (!tracks[y][x]) {
    return null
  }
  if (allowed.indexOf(tracks[y][x].initialGlyph) >= 0) {
    return tracks[y][x]
  }
  return null
}

const iterateAll = (tracks, fn) => {
  for (let y = 0; y < tracks.length; y++) {
    for (let x = 0; x < tracks[y].length; x++) {
      if (tracks[y][x]) {
        fn(tracks[y][x])
      }
    }
  }
}

const diagonals = {
  left: {
    '\\': 'up',
    '/': 'down'
  },
  right: {
    '\\': 'down',
    '/': 'up'
  },
  up: {
    '\\': 'left',
    '/': 'right'
  },
  down: {
    '\\': 'right',
    '/': 'left'
  }
}

const createCart = node => {
  const turnOrder = ['left', 'straight', 'right']
  let turnCounter = 0
  const cart = {
    glyph: node.initialGlyph,
    node: node,
    lastMove: null,
    moves: [],
    turn: () => {
      const nextDirection = turnOrder[turnCounter % turnOrder.length]
      turnCounter++
      const compass = ['^', '>', 'v', '<']
      if (nextDirection === 'left') {
        const nextIndex = compass.indexOf(cart.glyph) - 1
        cart.glyph =
          nextIndex === -1 ? compass[compass.length - 1] : compass[nextIndex]
      } else if (nextDirection === 'right') {
        const nextIndex = compass.indexOf(cart.glyph) + 1
        cart.glyph = compass[nextIndex % compass.length]
      }
    },
    move: tick => {
      if (cart.lastMove === tick) {
        return
      }
      cart.lastMove = tick
      const lastNode = cart.node
      lastNode.cart = null
      cart.node = null

      const direction = cartShapes[cart.glyph]
      const nextNode = lastNode[direction]

      if (!nextNode) {
        console.log(
          `Uhhh this was the last one: ${lastNode.key} ${
            lastNode.initialGlyph
          }, but my direction is ${direction}`
        )
        console.log(lastNode)
        for (let i = 10; i > 0; i--) {
          console.log(
            `${cart.moves[cart.moves.length - i].key}: ${
              cart.moves[cart.moves.length - i].initialGlyph
            }`
          )
        }

        process.exit()
      }

      if (nextNode.cart) {
        cartsRemaining = cartsRemaining.filter(c => {
          c.destroyed =
            c.node === null ||
            c.node.key === nextNode.key ||
            c.node.key === lastNode.key
          return !c.destroyed
        })
        console.log(`${cartsRemaining.length} left`)
        nextNode.cart = null
        return
      }
      nextNode.cart = cart
      cart.node = nextNode
      cart.moves.push(nextNode)

      if (cart.node.track === '+') {
        cart.turn()
      } else if (trackShapes[cart.node.track].length === 1) {
        const currentDirection = cartShapes[cart.glyph]
        let nextDirection =
          diagonals[currentDirection][trackShapes[cart.node.track]]
        if (cart.node.key === `38,109`) {
          console.log(`Diagonal at ${cart.node.key}`)
          console.log(
            `Glyph WAS: ${cart.glyph} till we saw ${
              trackShapes[cart.node.track]
            }, then we shifted to ${cartDirection[nextDirection]}`
          )
        }

        cart.glyph = cartDirection[nextDirection]
      }
    }
  }
  return cart
}

const linkTracks = tracks => {
  const startingCarts = []
  iterateAll(tracks, node => {
    const { initialGlyph, x, y } = node
    node.up = getNeighbor(tracks, x, y - 1, '|', '\\', '/', '+', '^', 'v')
    node.down = getNeighbor(tracks, x, y + 1, '|', '\\', '/', '+', '^', 'v')
    node.left = getNeighbor(tracks, x - 1, y, '-', '/', '\\', '+', '<', '>')
    node.right = getNeighbor(tracks, x + 1, y, '-', '\\', '/', '+', '<', '>')

    if (cartShapes[initialGlyph]) {
      node.cart = createCart(node)
      node.track = getTrackForCartNode(node)
      startingCarts.push(node.cart)
    } else if (trackShapes[initialGlyph]) {
      node.track = initialGlyph
    } else {
      throw `Unrecognized shape: ${initialGlyph}`
    }
  })
  return startingCarts
}

const getTrackForCartNode = node => {
  const { up, down, left, right } = node
  if (up && down && left && right) {
    return '+'
  }
  if (up && down) {
    return '|'
  }
  if (left && right) {
    return '-'
  }
  if ((down && right) || (up && left)) {
    return '/'
  }
  if ((down && left) || (up && right)) {
    return '\\'
  }
  console.log(node)
  throw 'Unknown cart node'
}

const drawTracks = tracks => {
  for (let y = 0; y < tracks.length; y++) {
    for (let x = 0; x < tracks[y].length; x++) {
      if (tracks[y][x]) {
        const glyph = tracks[y][x].cart
          ? tracks[y][x].cart.glyph
          : tracks[y][x].track
        process.stdout.write(glyph)
      } else {
        process.stdout.write(' ')
      }
    }
    process.stdout.write(require('os').EOL)
  }
}

const moveCarts = (tracks, tick) => {
  iterateAll(tracks, n => {
    if (n.cart && !n.cart.destroyed) {
      n.cart.move(tick)
    }
  })
}

const cartShapes = {
  v: 'down',
  '>': 'right',
  '<': 'left',
  '^': 'up'
}

const cartDirection = {
  down: 'v',
  right: '>',
  left: '<',
  up: '^'
}

const trackShapes = {
  '|': 'vertical',
  '-': 'horizontal',
  '\\': '\\',
  '/': '/',
  '+': 'intersection'
}

const tracks = getTracks()
let cartsRemaining = linkTracks(tracks)
let tick = 0
while (true) {
  moveCarts(tracks, tick++)
  if (cartsRemaining.length === 1) {
    console.log(cartsRemaining[0].node.key)
    process.exit()
  }
}
