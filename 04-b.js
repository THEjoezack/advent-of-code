const stack = []
const sleepSums = {}

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

const mostConsistentSleeper = {
  guard: null,
  mostSleptMinute: null,
  mostSleptMinuteCount: 0
}
Object.keys(sleepSums).forEach(guardID => {
  const guard = sleepSums[guardID]
  const mostSleptMinute = Object.keys(guard.distribution).sort((a, b) => {
    return guard.distribution[b] - guard.distribution[a]
  })[0]
  const mostSleptMinuteCount = guard.distribution[mostSleptMinute]
  if (mostSleptMinuteCount > mostConsistentSleeper.mostSleptMinuteCount) {
    mostConsistentSleeper.guard = guard.guard
    mostConsistentSleeper.mostSleptMinute = mostSleptMinute
    mostConsistentSleeper.mostSleptMinuteCount = mostSleptMinuteCount
  }
})

console.log(
  `Result: ${parseInt(mostConsistentSleeper.guard.split('#')[1]) *
    mostConsistentSleeper.mostSleptMinute}`
)
