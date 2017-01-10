const express = require('express')
const router = express.Router()

const labController = require('../pages/labs')
const lab7Controller = require('../pages/labs/lab7/controller')

router.get('/labs/:labid', labController)
router.get('/', (req, res) => {
  res.redirect('/labs/1')
})

router.post('/save-table', lab7Controller.saveTable)
router.post('/save-loop', lab7Controller.saveLoop)

router.get('/load-last-table-of-type/:type', lab7Controller.loadLastTableOfType)
router.get('/load-last-loop', lab7Controller.loadLastLoop)

module.exports = router
