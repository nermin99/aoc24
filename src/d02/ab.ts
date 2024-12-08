const fs = require('fs')

const input: number[][] = fs
  .readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((report: string) => report.split(' ').map(Number))

const isSafe = (report: number[]) => {
  let isIncreasing = true
  let isDecreasing = true

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1]
    const diffAbs = Math.abs(diff)

    if (diffAbs < 1 || diffAbs > 3) return false
    if (diff < 0) isIncreasing = false
    if (diff > 0) isDecreasing = false

    if (!isIncreasing && !isDecreasing) return false
  }
  return true
}

function a() {
  let total = 0
  for (const report of input) {
    if (isSafe(report)) total++
  }
  console.log(total)
}
a()

function b() {
  let total = 0
  for (const report of input) {
    let safe = false
    for (let i = 0; i < report.length; i++) {
      const candidateReport = report.slice(0, i).concat(report.slice(i + 1))
      if (isSafe(candidateReport)) {
        safe = true
        break
      }
    }
    if (safe) total++
  }
  console.log(total)
}
b()
