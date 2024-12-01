export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export const matrixBuild = (rows: number, cols: number, fill: any = '.') => {
  const matrix = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (typeof fill === 'object' ? deepCopy(fill) : fill))
  )
  // @ts-ignore
  matrix.__proto__.toString = function () {
    return this.map((row) => row.join('') + '\n').join('')
  }
  return matrix
}

export const matrixTranspose = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))

export const matrixRotateCW = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse())

export const matrixRotateCCW = (matrix: any[][]) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[row.length - 1 - colIndex]))

export const matrixFlipHorizontal = (matrix: any[][]) => matrix.reverse()

export const matrixFlipVertical = (matrix: any[][]) => matrix.map((row) => row.reverse())

export const matrixToString = (matrix: any[][]) =>
  matrix.map((row) => row.join(' ') + '\n').join('')
