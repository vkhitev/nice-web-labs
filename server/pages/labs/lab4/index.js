const options = require('./data.json')

module.exports = () => ({
  options: JSON.stringify(options),
  initial: options[0],
  size: options.length
})
