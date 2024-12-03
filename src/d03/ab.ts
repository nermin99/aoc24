const fs = require('fs')

const data: string = fs.readFileSync(__dirname + '/data.txt', 'utf8')

const sumMultiplyMatches = (matches: string[]) => {
  const numbers = matches.map((str) =>
    str
      .match(/\d+,\d+/)[0]
      .split(',')
      .map(Number)
  )
  return numbers.reduce((acc, cur) => acc + cur[0] * cur[1], 0)
}

function a() {
  const matches = data.match(/mul\(\d+,\d+\)/gm)
  const total = sumMultiplyMatches(matches)
  console.log(total)
}
a()

function b() {
  const matches = data.match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/gm)
  const enabledMatches = []
  let enabled = true
  for (const match of matches) {
    if (match === "don't()") {
      enabled = false
    } else if (match === 'do()') {
      enabled = true
    } else if (enabled) {
      enabledMatches.push(match)
    }
  }
  const total = sumMultiplyMatches(enabledMatches)
  console.log(total)
}
b()
