class List {
  constructor (string) {
    this.list = {
      value: 'head',
      next: null
    }
    let node = this.list
    for (let i = 0; i < string.length; i++) {
      node.next = { value: string[i], next: null, previous: node }
      node = node.next
    }
  }
  react () {
    let node = this.list.next
    while (true) {
      if (!node.next) {
        break
      }
      if (node.value.toUpperCase() === node.next.value.toUpperCase()) {
        if (node.value !== node.next.value) {
          node = node.previous
          this.remove(node.next)
          this.remove(node.next)
          continue
        }
      }
      node = node.next
    }
  }
  remove (node) {
    node.previous.next = node.next
    if (node.next) {
      node.next.previous = node.previous
    }
  }
  toString () {
    const result = []
    let node = this.list.next
    while (node) {
      result.push(node.value)
      node = node.next
    }
    return result.join('')
  }
}

const units = require('fs').readFileSync(`inputData/05-polymer.txt`, `utf-8`)
let min = units.length // initialize to the worst case scenario

for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
  const letter = String.fromCharCode(i)
  const input = units.replace(new RegExp(letter, 'ig'), '')
  const list = new List(input)
  list.react()
  const result = list.toString()
  if (result.length < min) {
    min = result.length
  }
}
console.log(`min: ${min}`)
