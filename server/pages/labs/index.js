const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)

const labsData = []

const labFolders = fs
  .readdirSync(__dirname)
  .filter(file => file.startsWith('lab') && (file !== basename))

labFolders
  .filter(file => fs.readdirSync(path.join(__dirname, file)).includes('index.js'))
  .forEach((file, i) => {
    const labId = file.replace('lab', '')
    labsData[labId] = require(path.join(__dirname, file))
  })

module.exports = function (req, res) {
  const id = req.params.labid
  let data = {
    title: 'web-labs',
    amountOfLabs: labFolders.length,
    activeLab: id
  }
  if (labsData[id]) {
    Object.assign(data, labsData[id]())
  }
  res.render(
    '../pages/labs/lab' + req.params.labid + '/view',
    data
  )
}
