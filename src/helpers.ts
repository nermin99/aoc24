export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export class Matrix {
  m = [[]]
  coordinates = new Map()

  constructor(matrix: any[][] = [[]]) {
    this.m = matrix

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        this.coordinates.set(`${i},${j}`, matrix[i][j])
      }
    }

    // @ts-ignore
    this.m.__proto__.toString = function () {
      return this.map((row) => row.join(' ') + '\n').join('')
    }
  }

  static build(rows: any, cols: any, fill: any = '.') {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (typeof fill === 'object' ? deepCopy(fill) : fill))
    )
    return new Matrix(newMatrix)
  }

  rotateCW() {
    this.m = this.m[0].map((_, colIndex) => this.m.map((row) => row[colIndex]).reverse())

    const newCoordinates = new Map()
    for (const [key, value] of this.coordinates) {
      const [i, j] = key.split(',')
      const new_i = j
      const new_j = this.m[0].length - 1 - i
      newCoordinates.set(`${new_i},${new_j}`, value)
    }
    this.coordinates = newCoordinates

    return this
  }

  rotateCCW() {
    this.m = this.m[0].map((_, colIndex) => this.m.map((row) => row[row.length - 1 - colIndex]))

    const newCoordinates = new Map()
    for (const [key, value] of this.coordinates) {
      const [i, j] = key.split(',')
      const new_i = this.m.length - 1 - j
      const new_j = i
      newCoordinates.set(`${new_i},${new_j}`, value)
    }
    this.coordinates = newCoordinates

    return this
  }

  flipHorizontal() {
    this.m.reverse()
    return this
  }

  flipVertical() {
    this.m = this.m.map((row) => row.reverse())
    return this
  }

  transpose() {
    this.m = this.m[0].map((_, colIndex) => this.m.map((row) => row[colIndex]))
    return this
  }

  traverseRows(word: string, reversed = false) {
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word

    for (let i = 0; i < this.m.length; i++) {
      let rowString = this.m[i].join('')
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

    const rows = this.m.length
    const cols = this.m[0].length

    for (let col = 0; col < cols; col++) {
      let columnString = ''

      for (let row = 0; row < rows; row++) {
        columnString += this.m[row][col]
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
    const rows = this.m.length
    const cols = this.m[0].length

    for (let k = 0; k <= rows + cols - 2; k++) {
      let yMin = Math.max(0, k - (cols - 1))
      let yMax = Math.min(rows - 1, k)
      let diagonalString = ''
      for (let y = yMax; y >= yMin; y--) {
        let x = k - y
        diagonalString += this.m[y][x]
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
    const rows = this.m.length
    const cols = this.m[0].length

    for (let k = -(cols - 1); k <= rows - 1; k++) {
      let yMin = Math.max(0, k)
      let yMax = Math.min(rows - 1, k + (cols - 1))
      let diagonalString = ''
      for (let y = yMin; y <= yMax; y++) {
        let x = y - k
        diagonalString += this.m[y][x]
      }

      count += diagonalString.match(regexp)?.length ?? 0
    }
    return count
  }

  toArray() {
    return this.m.reduce((acc, cur) => [...acc, ...cur], [])
  }

  toString() {
    return this.m.map((row) => row.join(' ') + '\n').join('')
  }
}
