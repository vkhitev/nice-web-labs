import sorts from './sorts'

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function randomElements (amount, min, max) {
  const retval = []
  for (var i = 0; i < amount; i++) {
    retval.push(Math.floor(Math.random() * max) + min)
  }
  return retval
}

const translations = {
  selectionSort: 'Сортировка выбором',
  insertionSort: 'Сортировка вставками',
  bubbleSort: 'Сортировка пузырьком',
  quickSort: 'Быстрая сортировка',
  shellSort: 'Сортировка Шелла',
  mergeSort: 'Сортировка слиянием'
}

function createSortedBlock (key, obj) {
  let block = document.getElementById(key.replace('S', '-s'))
  if (!block) {
    block = document.createElement('div')
    block.id = key.replace('S', '-s')

    const p = document.createElement('p')
    p.innerHTML = translations[key] + ':'
    const pre = document.createElement('pre')
    pre.innerHTML = obj.array + '\n' +
      '\nВнешних итераций: ' + obj.countOuter +
      '\nВнутренних итераций: ' + obj.countInner +
      '\nПерестановок: ' + obj.countSwap

    const sorting = document.getElementsByClassName('sorting')[0]
    sorting.appendChild(block)
    block.appendChild(p)
    insertAfter(pre, p)
  } else {
    block.lastElementChild.innerHTML = obj.array + '\n' +
      '\nВнешних итераций: ' + obj.countOuter +
      '\nВнутренних итераций: ' + obj.countInner +
      '\nПерестановок: ' + obj.countSwap
  }
}

function doSort () {
  const sequence = document.getElementById('sequence')
  const array = sequence.innerHTML.split(' ').map(val => Number(val))
  Object.keys(sorts).forEach(key => {
    createSortedBlock(key, sorts[key](array.slice()))
  })
  document.getElementById('sort-sequence').disabled = true
}

function generateSequence () {
  let sequence = document.getElementById('sequence')
  if (!sequence) {
    sequence = document.createElement('pre')
    sequence.id = 'sequence'
    insertAfter(sequence, document.getElementById('generate-sequence'))

    const p = document.createElement('p')
    p.innerHTML = 'Нажмите, чтобы отсортировать:'

    const b = document.createElement('button')
    b.innerHTML = 'Отсортировать'
    b.id = 'sort-sequence'
    b.addEventListener('click', doSort)

    insertAfter(p, sequence)
    insertAfter(b, p)
  }
  const elements = randomElements(35, 1, 101)
  sequence.innerHTML = elements.join(' ')
  document.getElementById('sort-sequence').disabled = false
}

document
  .getElementById('generate-sequence')
  .addEventListener('click', generateSequence)
