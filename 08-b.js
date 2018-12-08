const getLicense = () => {
  return require('fs')
    .readFileSync('inputData/08-license.txt', 'utf-8')
    .split(' ')
    .map(n => parseInt(n))
}

let nodeCount = 0
const parseTree = () => {
  const node = { name: `N${nodeCount++}`, metaData: [], children: [] }
  const childCount = stack.pop()
  const metaDataCount = stack.pop()
  for (let i = 0; i < childCount; i++) {
    node.children.push(parseTree())
  }
  for (let i = 0; i < metaDataCount; i++) {
    node.metaData.push(stack.pop())
  }
  return node
}

const score = node => {
  if (node.children.length === 0) {
    // value is the sum of its metadata entries
    const value = node.metaData.reduce((sum, n) => sum + n, 0)
    return value
  }

  const sum = node.metaData.reduce((sum, index) => {
    // the metadata entries become indexes which refer to those child nodes
    if (index === 0) {
      // skip 0
      return sum
    } else if (index > node.children.length) {
      // skip: A referenced child node does not exist
      return sum
    } else {
      // index is 1 based
      const value = score(node.children[index - 1])
      return sum + value
    }
  }, 0)
  return sum
}

const license = getLicense()
const stack = license.reverse()
const root = parseTree()
const sum = score(root)
console.log(sum)
