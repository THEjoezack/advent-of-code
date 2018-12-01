const readline = require(`readline`)
const fs = require(`fs`)

new Promise(resolve => {
  const rl = readline.createInterface({
    input: fs.createReadStream(`inputData/frequencies.txt`),
    crlfDelay: Infinity
  })

  let sum = 0
  rl.on(`line`, line => {
    sum += parseInt(line)
  })

  rl.on(`close`, () => {
    resolve(sum)
  })
}).then(sum => console.log(`Sum of frequencies: ${sum}`))
