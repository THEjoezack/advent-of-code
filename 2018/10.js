const eol = require('os').EOL
let stars = require('fs')
  .readFileSync('inputData/10-velocities.txt', 'utf-8')
  .split(eol)
  .map(l => {
    const matches = l.match(/<\s*(-?\d+),\s+(-?\d+)>.*<\s*(-?\d+),\s+(-?\d+)>/)
    return {
      current: { x: parseInt(matches[1]), y: parseInt(matches[2]) },
      velocity: { x: parseInt(matches[3]), y: parseInt(matches[4]) }
    }
  })

const getMetaData = stars => {
  // get the least numbers and shift everything to 0 based
  let minX = Infinity
  let minY = Infinity
  let maxX = 0
  let maxY = 0

  stars.forEach(s => {
    if (s.current.x < minX) {
      minX = s.current.x
    }
    if (s.current.y < minY) {
      minY = s.current.y
    }
    if (s.current.x > maxX) {
      maxX = s.current.x
    }
    if (s.current.y > maxY) {
      maxY = s.current.y
    }
  })

  return { minX, minY, maxX, maxY }
}

const draw = (sky, metaData) => {
  const { minX, minY, maxX, maxY } = metaData
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (sky[getKey(x, y)]) {
        process.stdout.write('#')
      } else {
        process.stdout.write(' ')
      }
    }
    process.stdout.write(eol)
  }
}

const advance = stars => {
  const nextStars = []
  stars.forEach(s => {
    nextStars.push({
      current: { x: s.current.x + s.velocity.x, y: s.current.y + s.velocity.y },
      velocity: s.velocity
    })
  })
  return nextStars
}

const plot = stars => {
  const sky = {}
  stars.forEach(s => {
    sky[getKey(s.current.x, s.current.y)] = true
  })
  return sky
}

const getKey = (x, y) => {
  return `${x}x${y}`
}

let minSize = Infinity
let previousStars = {}
// let endTime = 10418
let i = 0
while (true) {
  const metaData = getMetaData(stars)

  const nextSize =
    (metaData.maxX - metaData.minX) * metaData.maxY - metaData.minY

  if (nextSize > minSize || i === 10418) {
    console.log(`Round ${i}`)
    const sky = plot(stars)
    draw(sky, metaData)
    return
  }
  minSize = nextSize
  i++
  stars = advance(stars)
}
