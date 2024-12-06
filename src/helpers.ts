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
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    // Check diagonals starting from each row in the first column
    for (let startRow = 0; startRow < rows; startRow++) {
      let diagonalString = ''
      let row = startRow,
        col = 0

      while (row < rows && col < cols) {
        diagonalString += this.matrix[row][col]
        row++
        col++
      }

      let index = diagonalString.indexOf(searchWord)
      while (index !== -1) {
        count++
        index = diagonalString.indexOf(searchWord, index + 1)
      }
    }

    // Check diagonals starting from each column in the first row
    for (let startCol = 1; startCol < cols; startCol++) {
      let diagonalString = ''
      let row = 0,
        col = startCol

      while (row < rows && col < cols) {
        diagonalString += this.matrix[row][col]
        row++
        col++
      }

      let index = diagonalString.indexOf(searchWord)
      while (index !== -1) {
        count++
        index = diagonalString.indexOf(searchWord, index + 1)
      }
    }

    return count
  }

  traverseBackwardDiagonals(word: string, reversed = false) {
    let count = 0
    const searchWord = reversed ? word.split('').reverse().join('') : word
    const rows = this.matrix.length
    const cols = this.matrix[0].length

    // Check diagonals starting from each row in the last column
    for (let startRow = 0; startRow < rows; startRow++) {
      let diagonalString = ''
      let row = startRow,
        col = cols - 1

      while (row < rows && col >= 0) {
        diagonalString += this.matrix[row][col]
        row++
        col--
      }

      let index = diagonalString.indexOf(searchWord)
      while (index !== -1) {
        count++
        index = diagonalString.indexOf(searchWord, index + 1)
      }
    }

    // Check diagonals starting from each column in the first row
    for (let startCol = cols - 2; startCol >= 0; startCol--) {
      let diagonalString = ''
      let row = 0,
        col = startCol

      while (row < rows && col >= 0) {
        diagonalString += this.matrix[row][col]
        row++
        col--
      }

      let index = diagonalString.indexOf(searchWord)
      while (index !== -1) {
        count++
        index = diagonalString.indexOf(searchWord, index + 1)
      }
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
