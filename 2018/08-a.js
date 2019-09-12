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

const sumTree = node => {
  let sum = node.metaData.reduce((sum, n) => sum + n, 0)
  for (let i = 0; i < node.children.length; i++) {
    sum += sumTree(node.children[i])
  }
  return sum
}

const license = getLicense()
const stack = license.reverse()
const root = parseTree()
const sum = sumTree(root)
console.log(sum)
