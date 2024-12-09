const fs = require('fs')
import { deepCopy } from '../helpers'

let [rules, updates] = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n\n')
rules = rules.split('\n').map((row) => row.split('|').map(Number)) as number[][]
updates = updates.split('\n').map((row) => row.split(',').map(Number)) as number[][]

const beforeToAfterMap = new Map()
const afterToBeforeMap = new Map()
for (const [before, after] of rules) {
  if (!beforeToAfterMap.has(before)) beforeToAfterMap.set(before, [])
  if (!afterToBeforeMap.has(after)) afterToBeforeMap.set(after, [])
  beforeToAfterMap.get(before).push(after)
  afterToBeforeMap.get(after).push(before)
}

const correctUpdates = []
const incorrectUpdates = []
for (const update of updates) {
  let correctOrder = true

  for (let i = 0; i < update.length; i++) {
    const page = update[i]
    const afterList = beforeToAfterMap.get(page)
    const beforeList = afterToBeforeMap.get(page)
    const before = update.slice(0, i)
    const after = update.slice(i + 1)

    if (afterList && before.some((beforePage) => afterList.includes(beforePage))) {
      correctOrder = false
    }
    if (beforeList && after.some((afterPage) => beforeList.includes(afterPage))) {
      correctOrder = false
    }
  }

  if (correctOrder) correctUpdates.push(update)
  if (!correctOrder) incorrectUpdates.push(update)
}

function a() {
  const middlePages = correctUpdates.map((update) => update[Math.floor(update.length / 2)])
  const total = middlePages.reduce((acc, cur) => acc + cur, 0)
  console.log(total)
}
a()

const fixedUpdates = deepCopy(incorrectUpdates)
for (const update of fixedUpdates) {
  let hasChanges = true

  while (hasChanges) {
    hasChanges = false

    for (let i = 0; i < update.length; i++) {
      const page = update[i]
      const afterList = beforeToAfterMap.get(page)
      const beforeList = afterToBeforeMap.get(page)
      const before = update.slice(0, i)
      const after = update.slice(i + 1)

      if (afterList) {
        const moveBackward = before.filter((beforePage) => afterList.includes(beforePage))
        if (moveBackward.length > 0) {
          hasChanges = true

          for (const movePage of moveBackward) {
            const index = update.indexOf(movePage)
            if (index === -1) continue
            update.splice(index, 1)
            update.splice(i + 1, 0, movePage)
          }
        }
      }

      if (beforeList) {
        const moveForward = after.filter((afterPage) => beforeList.includes(afterPage))
        if (moveForward.length > 0) {
          hasChanges = true

          for (const movePage of moveForward) {
            const index = update.indexOf(movePage)
            if (index === -1) continue
            update.splice(index, 1)
            update.splice(i, 0, movePage)
          }
        }
      }
    }
  }
}

function b() {
  const middlePages = fixedUpdates.map((update) => update[Math.floor(update.length / 2)])
  const total = middlePages.reduce((acc, cur) => acc + cur, 0)
  console.log(total)
}
b()
