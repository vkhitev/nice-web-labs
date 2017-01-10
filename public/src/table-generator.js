const tableGenerators = {}

tableGenerators[1] = function createFirstTable (nRows) {
  const table = document.createElement('table')
  table.className = 'table-1'
  table.insertRow(0).insertCell(0).colSpan = nRows
  for (let i = 1; i < nRows; i++) {
    const row = table.insertRow(i)
    row.insertCell(0).rowSpan = nRows - i
    row.insertCell(1).colSpan = nRows - i
  }
  return table
}

tableGenerators[2] = function createSecondTable (nRows) {
  const table = document.createElement('table')
  table.className = 'table-2'
  for (let i = 0; i < nRows - 1; i++) {
    const row = table.insertRow(i)
    row.insertCell(0).rowSpan = nRows - i
    row.insertCell(1).colSpan = nRows - i
  }
  table.insertRow(nRows - 1).insertCell(0)
  return table
}

tableGenerators[3] = function createThirdTable (nRows) {
  const table = document.createElement('table')
  table.className = 'table-3'
  for (let i = 0; i < nRows; i++) {
    const row = table.insertRow(i)
    if (i % 2 === 0) {
      row.insertCell(0).colSpan = 2
      row.insertCell(1).colSpan = 2
      row.insertCell(2).colSpan = 2
      row.insertCell(3)
    } else {
      row.insertCell(0)
      row.insertCell(1).colSpan = 2
      row.insertCell(2).colSpan = 2
      row.insertCell(3).colSpan = 2
    }
  }
  return table
}

function uniq (a) {
  return Array.from(new Set(a))
}

function getAllIndexes (arr, val) {
  return arr.reduce((a, e, i) =>
    (e === val) ? a.concat(i) : a, []
  )
}

function fillArray (template, len) {
  const arr = []
  const tlen = template.length
  for (let i = 0; i < len; i++) {
    arr.push(template[i % tlen])
  }
  return arr
}

function rowSpanCells (row, rowSpans) {
  for (let i = 0; i < rowSpans.length; i++) {
    row.insertCell(i).rowSpan = rowSpans[i]
  }
}

function fillsOnRow (template, len) {
  const dim = Math.floor(len / template.length)
  const rem = len % template.length
  const times = new Array(template.length).fill(dim)
  for (let i = 0; i < rem; i++) {
    times[i] += 1
  }
  const occurences = uniq(template).sort()
  const retval = new Array(occurences.length).fill(0)
  for (let i = 0; i < occurences.length; i++) {
    const element = occurences[i]
    const idxs = getAllIndexes(template, element)
    for (const idx of idxs) {
      retval[i] += times[idx]
    }
  }
  return retval
}

function getFillTimes (template, nRows, blockHeight) {
  let times = 0
  const occurences = uniq(template)
  for (const element of occurences) {
    times += Math.ceil((nRows - element) / blockHeight)
  }
  return times
}

function getHeigths (template, blockHeight, nRows) {
  let times = 0
  const pieces = []
  const occurences = uniq(template)
  for (const element of occurences) {
    times += Math.ceil((nRows - element) / blockHeight)
    const rest = (nRows - element) % blockHeight
    if (rest !== 0) {
      pieces.push(rest)
    }
  }

  const startCount = Math.min(...pieces)
  const retval = new Array(times).fill(blockHeight)
  for (let i = 0; i < pieces.length; i++) {
    retval[retval.length - i - 1] = i + startCount
  }
  return retval
}

function addZeroes (template, blockHeight, fills, heights) {
  const missing = []
  const occurences = new Set(template)
  for (let i = 0; i < blockHeight; i++) {
    if (!occurences.has(i + 1)) {
      missing.push(i)
    }
  }

  const flen = Math.floor(fills.length / template.length)
  let shift = 0
  for (let i = 0; i < flen; i++) {
    for (let j = 0; j < missing.length; j++) {
      fills.splice(i + missing[j] + shift, 0, 0)
      heights.splice(i + missing[j] + shift, 0, 0)
    }
    shift += blockHeight - 1
  }
}

tableGenerators[4] = function createFourthTable (nRows, nCols, blockHeight = 3, template = [3, 1, 2]) {
  if (blockHeight < Math.max(...template)) {
    throw Error('Block height must be less than max template value')
  }

  const table = document.createElement('table')
  table.className = 'table-4'
  rowSpanCells(table.insertRow(0), fillArray(template, nCols))

  const fills = fillArray(
    fillsOnRow(template, nCols),
    getFillTimes(template, nRows, blockHeight)
  )
  const heights = getHeigths(template, blockHeight, nRows)

  addZeroes(template, blockHeight, fills, heights)

  for (let i = 0; i < heights.length; i++) {
    rowSpanCells(
      table.insertRow(i + 1),
      new Array(fills[i]).fill(heights[i])
    )
  }

  return table
}

export default function generateTable (tableNum, rows = 5, cols = 5, blockHeight = 3, template = [3, 1, 2]) {
  if (typeof rows === Object) {
    return tableGenerators[tableNum](rows.rows, rows.cols, rows.blockHeight, rows.template)
  } else {
    return tableGenerators[tableNum](rows, cols, blockHeight, template)
  }
}
