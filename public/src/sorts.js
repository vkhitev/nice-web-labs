function selectionSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0

  for (let i = 0; i < array.length; i++) {
    countOuter++
    let min = i
    for (let j = i + 1; j < array.length; j++) {
      countInner++
      if (array[j] < array[min]) {
        min = j
      }
    }
    if (i !== min) {
      countSwap++;
      [array[i], array[min]] = [array[min], array[i]]
    }
  }

  return { array, countOuter, countInner, countSwap }
}

function insertionSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0

  for (let i = 0; i < array.length; i++) {
    countOuter++
    let temp = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > temp) {
      countInner++
      countSwap++
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = temp
  }

  return { array, countOuter, countInner, countSwap }
}

function bubbleSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0

  for (let i = 0; i < array.length; i++) {
    countOuter++
    for (let j = 1; j < array.length; j++) {
      countInner++
      if (array[j - 1] > array[j]) {
        countSwap++;
        [array[j - 1], array[j]] = [array[j], array[j - 1]]
      }
    }
  }

  return { array, countOuter, countInner, countSwap }
}

function quickSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0

  function _quicksort (array, left, right) {
    countOuter++
    if (array.length < 2) {
      return array
    }

    const pivot = array[0]
    const lesser = []
    const greater = []

    for (let i = 1; i < array.length; i++) {
      countInner++
      if (array[i] < pivot) {
        lesser.push(array[i])
      } else {
        greater.push(array[i])
      }
    }

    return _quicksort(lesser).concat(pivot, _quicksort(greater))
  }
  const retval = _quicksort(array)
  return { array: retval, countOuter, countInner, countSwap }
}

const gaps = [701, 301, 132, 57, 23, 10, 4, 1]

function shellSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0

  for (let g = 0; g < gaps.length; g++) {
    const gap = gaps[g]
    for (let i = gap; i < array.length; i++) {
      countOuter++
      const temp = array[i]
      let last = i
      for (let j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        countInner++
        countSwap++
        array[j] = array[j - gap]
        last -= gap
      }
      array[last] = temp
    }
  }
  return { array, countOuter, countInner, countSwap }
}

function mergeSort (array) {
  let countOuter = 0
  let countInner = 0
  let countSwap = 0
  function mergeSortTopDown (array) {
    countOuter++
    if (array.length < 2) {
      return array
    }

    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)

    return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right))
  }

  function mergeTopDown (left, right) {
    const array = []

    while (left.length && right.length) {
      countInner++
      if (left[0] < right[0]) {
        array.push(left.shift())
      } else {
        array.push(right.shift())
      }
    }
    return array.concat(left.slice()).concat(right.slice())
  }
  const retval = mergeSortTopDown(array)
  return { array: retval, countOuter, countInner, countSwap }
}

export default {
  selectionSort,
  insertionSort,
  bubbleSort,
  quickSort,
  shellSort,
  mergeSort
}
