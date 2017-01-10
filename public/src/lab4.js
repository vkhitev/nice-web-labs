import range from './range'

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function getInputNodes () {
  return [
    document.getElementById('start-input'),
    document.getElementById('end-input'),
    document.getElementById('step-input')
  ]
}

function getValues () {
  const nodes = getInputNodes()
  return nodes.map(node => Number(node.value))
}

function outputLoop () {
  const values = getValues()
  if (values) {
    const pre = document.createElement('pre')
    pre.innerHTML = range(...values).join(' ')
    insertAfter(pre, document.getElementById('generate-loop'))
  }
}

function removeOptions (select) {
  var i
  for (i = select.options.length - 1; i >= 0; i--) {
    select.remove(i)
  }
}

function populateOpts (select, data) {
  for (var i = 0; i < data.length; i++) {
    const option = document.createElement('option')
    option.text = data[i]
    select.add(option)
  }
}

function changeOptions () {
  const nodes = getInputNodes()
  const selected = document.getElementById('loop-number').selectedIndex
  const opts = data[selected]
  nodes.forEach((node) => { removeOptions(node) })
  populateOpts(nodes[0], opts.start)
  populateOpts(nodes[1], opts.end)
  populateOpts(nodes[2], opts.step)
}

const data = JSON.parse(document.getElementById('data').innerHTML)

document
  .getElementById('generate-loop')
  .addEventListener('click', outputLoop)

document
  .getElementById('loop-number')
  .addEventListener('change', changeOptions)
