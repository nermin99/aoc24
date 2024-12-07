export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export class Matrix {
  matrix = [[]]

  constructor(matrix: any[][] = [[]]) {
    this.matrix = matrix
  }

  static build(rows: any, cols: any, fill: any = '.') {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (typeof fill === 'object' ? deepCopy(fill) : fill))
    )
    // @ts-ignore
    newMatrix.__proto__.toString = function () {
      return this.map((row) => row.join(' ') + '\n').join('')
    }
    return newMatrix
  }

  rotateCW() {
    this.matrix = this.matrix[0].map((_, colIndex) =>
      this.matrix.map((row) => row[colIndex]).reverse()
    )
    return this
  }

  rotateCCW() {
    this.matrix = this.matrix[0].map((_, colIndex) =>
      this.matrix.map((row) => row[row.length - 1 - colIndex])
    )
    return this
  }

  flipHorizontal() {
    this.matrix.reverse()
    return this
  }

  flipVertical() {
    this.matrix = this.matrix.map((row) => row.reverse())
    return this
  }

  transpose() {
    this.matrix = this.matrix[0].map((_, colIndex) => this.matrix.map((row) => row[colIndex]))
    return this
  }

  traverseRows(word: string, reversed = false) {
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word

    for (let i = 0; i < this.matrix.length; i++) {
      let rowString = this.matrix[i].join('')
      let index = rowString.indexOf(searchWord)

      while (index !== -1) {
        count++
        index = rowString.indexOf(searchWord, index + 1)
      }
    }

    return count
  }

  traverseColumns(word: string, reversed = false) {
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word

    const rows = this.matrix.length
    const cols = this.matrix[0].length

    for (let col = 0; col < cols; col++) {
      let columnString = ''

      for (let row = 0; row < rows; row++) {
        columnString += this.matrix[row][col]
      }

      let index = columnString.indexOf(searchWord)

      while (index !== -1) {
        count++
        index = columnString.indexOf(searchWord, index + 1)
      }
    }

    return count
  }

  traverseForwardDiagonals(word: string, reversed = false) {
    // Inspired from https://stackoverflow.com/a/21346447/7012917
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word
    const regexp = new RegExp(`(?=${searchWord})`, 'gm') // Include overlapping matches
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    for (let k = 0; k <= rows + cols - 2; k++) {
      let yMin = Math.max(0, k - (cols - 1))
      let yMax = Math.min(rows - 1, k)
      let diagonalString = ''
      for (let y = yMax; y >= yMin; y--) {
        let x = k - y
        diagonalString += this.matrix[y][x]
      }

      count += diagonalString.match(regexp)?.length ?? 0
    }
    return count
  }

  traverseBackwardDiagonals(word: string, reversed = false) {
    // Inspired from https://stackoverflow.com/a/21346447/7012917
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word
    const regexp = new RegExp(`(?=${searchWord})`, 'gm') // Include overlapping matches
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    for (let k = -(cols - 1); k <= rows - 1; k++) {
      let yMin = Math.max(0, k)
      let yMax = Math.min(rows - 1, k + (cols - 1))
      let diagonalString = ''
      for (let y = yMin; y <= yMax; y++) {
        let x = y - k
        diagonalString += this.matrix[y][x]
      }

      count += diagonalString.match(regexp)?.length ?? 0
    }
    return count
  }

  toArray() {
    return this.matrix.reduce((acc, cur) => [...acc, ...cur], [])
  }

  toString() {
    return this.matrix.map((row) => row.join(' ') + '\n').join('')
  }
}
