class List {
  constructor (string) {
    this.list = {
      value: 'head',
      next: null
    }
    let node = this.list
    for (let i = 0; i < string.length; i++) {
      node.next = { value: units[i], next: null, previous: node }
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

let units = require('fs').readFileSync(`inputData/05-polymer.txt`, `utf-8`)
const list = new List(units)

console.log(`Starting length: ${list.toString().length}`)
list.react()
console.log(list.toString())
console.log(`Ending length: ${list.toString().length}`)
