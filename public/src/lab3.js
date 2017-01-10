import generateTable from './table-generator'
import range from './range'

const tables = [
  generateTable(1, 6),
  generateTable(2, 7),
  generateTable(3, 6),
  generateTable(4, 8, 7, 3, [3, 1, 2])
]

const contentTables = document.getElementsByClassName('tables')[0]
for (const table of tables) {
  contentTables.appendChild(table)
}

const ranges = [
  [200, 0, 3],
  [0, 99, 1],
  [1, -99, 1],
  [-100, -2, 2]
]

const contentLoops = document.getElementsByClassName('loops')[0]
for (const r of ranges) {
  const paragraph = document.createElement('p')
  paragraph.innerHTML = `Цикл от ${r[0]} до ${r[1]} с шагом ${r[2]}`
  contentLoops.appendChild(paragraph)

  const output = document.createElement('pre')
  output.innerHTML = range(...r).join(' ')
  paragraph.appendChild(output)
}
