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

  toArray() {
    return this.matrix.reduce((acc, cur) => [...acc, ...cur], [])
  }

  toString() {
    return this.matrix.map((row) => row.join(' ') + '\n').join('')
  }
}
