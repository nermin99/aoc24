const fs = require('fs')

const input: number[][] = fs
  .readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((pair: string) => pair.split('   ').map(Number))

const left = input.map((row) => row[0]).sort((a, b) => a - b)
const right = input.map((row) => row[1]).sort((a, b) => a - b)

function a() {
  const diff = left.map((l, idx) => Math.abs(l - right[idx]))

  const total = diff.reduce((acc, cur) => acc + cur, 0)
  console.log(total)
}
a()

function b() {
  const similarity = left.map((l) => l * right.filter((r) => l === r).length)

  const total = similarity.reduce((acc, cur) => acc + cur, 0)
  console.log(total)
}
b()
