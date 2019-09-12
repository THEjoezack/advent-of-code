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
          glyph: lines[y][x],
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

getNeighbor = (tracks, x, y) => {
  if (x < 0 || y < 0 || y >= tracks.length || x >= tracks[y.length]) {
    return null
  }
  return tracks[y][x]
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
    glyph: node.glyph,
    node: node,
    lastMove: null,
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

      if (nextNode.cart) {
        console.log(`First collision at ${nextNode.key}!!`)
        process.exit(0)
      }
      nextNode.cart = cart
      cart.node = nextNode

      if (cart.node.track === '+') {
        cart.turn()
      } else if (trackShapes[cart.node.track].length === 1) {
        const currentDirection = cartShapes[cart.glyph]
        let nextDirection =
          diagonals[currentDirection][trackShapes[cart.node.track]]
        cart.glyph = cartDirection[nextDirection]
      }
    }
  }
  return cart
}

const linkTracks = tracks => {
  iterateAll(tracks, node => {
    const { glyph, x, y } = node
    node.up = getNeighbor(tracks, x, y - 1)
    node.down = getNeighbor(tracks, x, y + 1)
    node.left = getNeighbor(tracks, x - 1, y)
    node.right = getNeighbor(tracks, x + 1, y)

    if (cartShapes[glyph]) {
      node.track = getTrackForCartNode(node)
      node.cart = createCart(node)
    } else if (trackShapes[glyph]) {
      node.track = glyph
    } else {
      throw `Unrecognized shape: ${glyph}`
    }
  })
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
    if (n.cart) {
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
linkTracks(tracks)
let tick = 0
while (true) {
  moveCarts(tracks, tick++)
}
