const fs = require('fs')
const { Matrix } = require('../helpers')

const input: string = fs
  .readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split(''))

const matrix = new Matrix(input)

function a() {
  const word = 'XMAS'
  const counts = [
    matrix.traverseRows(word),
    matrix.traverseRows(word, true),
    matrix.traverseColumns(word),
    matrix.traverseColumns(word, true),
    matrix.traverseForwardDiagonals(word),
    matrix.traverseForwardDiagonals(word, true),
    matrix.traverseBackwardDiagonals(word),
    matrix.traverseBackwardDiagonals(word, true),
  ]

  const total = counts.reduce((acc, cur) => acc + cur, 0)
  console.log(total)
}
a()

function b() {
  let total = 0
  const regexp = /M|S/

  for (let i = 0; i < matrix.matrix.length; i++) {
    for (let j = 0; j < matrix.matrix[0].length; j++) {
      if (matrix.matrix[i]?.[j] !== 'A') continue

      const topLeft = (matrix.matrix[i - 1]?.[j - 1] ?? '').match(regexp)
      const topRight = (matrix.matrix[i - 1]?.[j + 1] ?? '').match(regexp)
      const bottomLeft = (matrix.matrix[i + 1]?.[j - 1] ?? '').match(regexp)
      const bottomRight = (matrix.matrix[i + 1]?.[j + 1] ?? '').match(regexp)
      const matches = [topLeft, topRight, bottomLeft, bottomRight]

      const conditions =
        matches.every((val) => Boolean(val)) &&
        topLeft?.[0] !== bottomRight?.[0] &&
        topRight?.[0] !== bottomLeft?.[0]
      if (conditions) total++
    }
  }
  console.log(total)
}
b()
