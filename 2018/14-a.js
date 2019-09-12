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

drawRecipes()
addRecipes()
drawRecipes()
addRecipes()

const recipeLimit = 765071
const scoreCount = 10

while (recipes.length <= recipeLimit + scoreCount) {
  moveElves()
  // drawRecipes()
  addRecipes()
}

console.log(recipes.slice(recipeLimit, recipeLimit + scoreCount).join(''))
