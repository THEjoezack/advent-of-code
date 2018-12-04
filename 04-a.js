const stack = []
const sleepSums = {}
let maxSleeper = {
  guard: null,
  totalMinutes: 0,
  distribution: {}
}

require('fs')
  .readFileSync('inputData/04-sleep.txt', 'utf-8')
  .split(require('os').EOL)
  .map(line => {
    const match = line.match(
      /^\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}).*\] (Guard #\d+|falls|wakes)/
    )
    return {
      date: new Date(match[1], match[2] - 1, match[3], match[4], match[5]),
      note: match[6]
    }
  })
  .sort((a, b) => {
    return a.date - b.date
  })
  .forEach(line => {
    const { date, note } = line
    console.log(`${date}, ${note}`)

    switch (note) {
      case 'wakes':
        const sleepStart = stack.pop()
        const guard = stack[stack.length - 1] // peek
        sleepSums[guard] = sleepSums[guard] || {
          guard: guard,
          totalMinutes: 0,
          distribution: {}
        }
        sleepSums[guard].totalMinutes =
          sleepSums[guard].totalMinutes + (date - sleepStart) / 1000 / 60

        // we know the minutes are always during midnigt
        const startMinute = sleepStart.getMinutes()
        const lastMinute = date.getMinutes()

        for (let minute = startMinute; minute < lastMinute; minute++) {
          sleepSums[guard].distribution[minute] =
            (sleepSums[guard].distribution[minute] || 0) + 1
        }

        console.log(`  ${guard} slept for ${sleepSums[guard].totalMinutes}`)
        if (sleepSums[guard].totalMinutes > maxSleeper.totalMinutes) {
          maxSleeper = sleepSums[guard]
        }
        break
      case 'falls':
        stack.push(date)
        break
      default:
        // clear the old guard if necessary
        if (stack.length) {
          stack.length = 0
        }
        console.log(`  Pushing ${note}`)
        stack.push(note) // guard
    }
  })

console.log(maxSleeper)
const maxMinute = Object.keys(maxSleeper.distribution).sort((a, b) => {
  return maxSleeper.distribution[b] - maxSleeper.distribution[a]
})[0]
console.log(`Result: ${parseInt(maxSleeper.guard.split('#')[1]) * maxMinute}`)
