const recipes = '37'.split('')
let elf = [0, 1]

const drawRecipes = () => {
  for (let i = 0; i < recipes.length; i++) {
    if (elf[0] === i) {
      process.stdout.write(`(${recipes[i]})`)
    } else if (elf[1] === i) {
      process.stdout.write(`[${recipes[i]}]`)
    } else {
      process.stdout.write(recipes[i])
    }
    process.stdout.write(' ')
  }
  console.log('')
}

const addRecipes = () => {
  let nextRecipes = (
    parseInt(recipes[elf[0]]) + parseInt(recipes[elf[1]])
  ).toString()
  for (let i = 0; i < nextRecipes.length; i++) {
    recipes.push(nextRecipes[i])
  }
}
const moveElves = () => {
  for (let i = 0; i < elf.length; i++) {
    const spacesToMove = 1 + parseInt(recipes[elf[i]])
    const next = (elf[i] + spacesToMove) % recipes.length
    elf[i] = next
  }
}

const find = search => {
  if (search.length > recipes.length) {
    return false
  }

  for (let offset = 0; offset < 4; offset++) {
    let found = false
    found = true
    for (let i = 0; i < search.length; i++) {
      const rIndex = recipes.length - 1 - offset - i
      const sIndex = search.length - 1 - i

      if (recipes[rIndex] === search[sIndex]) {
        continue
      } else {
        found = false
        break
      }
    }
    if (found) {
      console.log(`Found it at ${recipes.length - offset - search.length}`)
      return true
    }
  }

  return false
}

drawRecipes()
addRecipes()
drawRecipes()
addRecipes()

const recipeLimit = 9
const search = '765071'
let found = false
while (!found) {
  moveElves()
  addRecipes()
  // drawRecipes()

  found = find(search)
}

// console.log(recipes.slice(recipeLimit, recipeLimit + scoreCount).join(''))
