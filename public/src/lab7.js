/* global Headers, fetch */

import range from './range'
import tableGenerator from './table-generator'

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function removeNode (node) {
  node.parentNode.removeChild(node)
}

function addValidationError (inputNode) {
  if (inputNode.nextSibling.nodeName === 'SPAN') {
    return
  }
  inputNode.style.backgroundColor = 'rgb(217, 184, 178)'

  const messageSpan = document.createElement('span')
  messageSpan.innerHTML = 'некорректное значение'
  messageSpan.style['margin-left'] = '5px'
  messageSpan.style['font-size'] = '1em'
  insertAfter(messageSpan, inputNode)
}

function clearValidationError (inputNode) {
  if (inputNode.nextSibling &&
      inputNode.nextSibling.nodeName === 'SPAN') {
    inputNode.style.backgroundColor = 'white'
    removeNode(inputNode.nextSibling)
  }
}

function getLoopInputNodes () {
  return [
    document.getElementById('start-input'),
    document.getElementById('end-input'),
    document.getElementById('step-input')
  ]
}

function getValuesOrFail () {
  const nodes = getLoopInputNodes()
  const failed = nodes.filter(node => !node.value)

  if (Number(nodes[2].value) === 0) {
    failed.push(nodes[2])
  }
  const notFailed = nodes.filter(node => !failed.includes(node))
  failed.forEach(node => addValidationError(node))
  notFailed.forEach(node => clearValidationError(node))

  if (failed.length) {
    return false
  } else {
    return nodes.map(node => Number(node.value))
  }
}

function outputLoop () {
  const values = getValuesOrFail()
  if (values) {
    const pre = document.createElement('pre')
    pre.innerHTML = range(...values).join(' ')
    insertAfter(pre, document.getElementById('auto-loop'))
    saveLoopValues(values)
    document.getElementById('auto-loop').style.display = 'none'
  } else {
    loadLoop(res => {
      const pre = document.createElement('pre')
      pre.innerHTML = range(res.start, res.end, res.step).join(' ')
      insertAfter(pre, document.getElementById('auto-loop'))
      document.getElementById('auto-loop').style.display = 'inline'
    })
  }
}

// Tables

function getTableInputNodes () {
  return [
    document.getElementById('rows'),
    document.getElementById('cols'),
    document.getElementById('template')
  ]
}

function getTableValuesOrFail () {
  const nodes = getTableInputNodes()
  const failed = nodes.filter(node => !node.value)

  const nonZero = [0, 1]
  nonZero.forEach((item) => {
    if (Number(nodes[item].value) <= 0) {
      failed.push(nodes[item])
    }
  })

  const notFailed = nodes.filter(node => !failed.includes(node))
  failed.forEach(node => addValidationError(node))
  notFailed.forEach(node => clearValidationError(node))

  if (failed.length) {
    return false
  } else {
    nodes[2] = nodes[2].options[nodes[2].selectedIndex].value.split(',').map(el => Number(el))
    nonZero.forEach((item) => {
      nodes[item] = Number(nodes[item].value)
    })
    return nodes
  }
}

function getTableValueOrFail () {
  const node = getTableInputNodes()[0]
  if (!node || Number(node.value) <= 0) {
    addValidationError(node)
    return false
  } else {
    clearValidationError(node)
    return Number(node.value)
  }
}

function outputTable () {
  const selected = document.getElementById('table-number').selectedIndex + 1
  if (selected === 4) {
    const values = getTableValuesOrFail()
    if (values) {
      insertAfter(
        tableGenerator(selected, values[0], values[1], 3, values[2]),
        document.getElementById('auto-table'))
      saveTableValues([selected, values[0], values[1], 3, values[2]])
      document.getElementById('auto-table').style.display = 'none'
    } else {
      loadTable(selected, (res) => {
        insertAfter(
          tableGenerator(selected, res.nRows, res.nCols, res.blockHeight, res.template),
          document.getElementById('auto-table'))
        document.getElementById('auto-table').style.display = 'inline'
      })
    }
  } else {
    const value = getTableValueOrFail()
    if (value) {
      insertAfter(
        tableGenerator(selected, value),
        document.getElementById('auto-table'))
      saveTableValues([selected, value])
      document.getElementById('auto-table').style.display = 'none'
    } else {
      loadTable(selected, (res) => {
        insertAfter(
          tableGenerator(selected, res.nRows),
          document.getElementById('auto-table'))
        document.getElementById('auto-table').style.display = 'inline'
      })
    }
  }
}

function tableNumberChanged () {
  const selected = document.getElementById('table-number').selectedIndex + 1
  const forTable4 = document.getElementById('for-table-4')
  if (selected === 4) {
    forTable4.style.display = 'block'
  } else {
    forTable4.style.display = 'none'
  }
}

document
  .getElementById('generate-loop')
  .addEventListener('click', outputLoop)

document
  .getElementById('generate-table')
  .addEventListener('click', outputTable)

document
  .getElementById('table-number')
  .addEventListener('change', tableNumberChanged)

// Табы

function openTab (tabId, contentId) {
  const tabcontent = document.getElementsByClassName('tabcontent')
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }

  const tablinks = document.getElementsByClassName('tablinks')
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }
  document.getElementById(contentId).style.display = 'block'
  document.getElementById(tabId).className += ' active'
}

document
  .getElementById('tab-loop')
  .addEventListener('click', openTab.bind(null, 'tab-loop', 'div-loop'))

document
  .getElementById('tab-table')
  .addEventListener('click', openTab.bind(null, 'tab-table', 'div-table'))

document
  .getElementsByClassName('defaultOpen')[0]
  .click()

// Database manipulations

function json (response) {
  return response.json()
}

function saveTableValues (values) {
  const payload = {
    tableId: values[0],
    nRows: values[1],
    nCols: values[2] || null,
    blockHeight: values[3] || null,
    template: values[4] || null
  }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  fetch('/save-table', {
    method: 'post',
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data)
  })
  .catch(function (error) {
    console.log('Request failed', error)
  })
}

function saveLoopValues (values) {
  const payload = {
    start: values[0],
    end: values[1],
    step: values[2]
  }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  fetch('/save-loop', {
    method: 'post',
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data)
  })
  .catch(function (error) {
    console.log('Request failed', error)
  })
}

function loadTable (selected, callback) {
  fetch('/load-last-table-of-type/' + selected, {
    method: 'get'
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data)
    callback(data.result)
  })
  .catch(function (error) {
    console.log('Request failed', error)
  })
}

function loadLoop (callback) {
  fetch('/load-last-loop', {
    method: 'get'
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data)
    callback(data.result)
  })
  .catch(function (error) {
    console.log('Request failed', error)
  })
}
