const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/web_lab7'
const tableCollection = 'tables'
const loopCollection = 'loop'

function connect (callback) {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      return console.error(err)
    }
    return callback(db)
  })
}

function insertIntoCollection (collectionName, value, res) {
  connect(db => {
    const collection = db.collection(collectionName)
    collection
      .insert(value)
      .then(result => {
        return db.close()
      })
      .then(result => {
        res.json({ ok: 200 })
      })
      .catch(err => {
        console.log(err)
        res.json({ bad: 400 })
      })
  })
}

exports.saveTable = function (req, res) {
  insertIntoCollection(tableCollection, req.body, res)
}

exports.saveLoop = function (req, res) {
  insertIntoCollection(loopCollection, req.body, res)
}

exports.loadLastTableOfType = function (req, res) {
  const type = req.params.type
  connect(db => {
    const collection = db.collection(tableCollection)
    collection
      .find({
        tableId: Number(type)
      }, {
        _id: false
      })
      .toArray()
      .then(result => {
        res.json({ result: result[result.length - 1] })
      })
      .then(result => {
        return db.close()
      })
      .catch(err => {
        console.log(err)
        res.json({ bad: 400 })
      })
  })
}

exports.loadLastLoop = function (req, res) {
  connect(db => {
    const collection = db.collection(loopCollection)
    collection
      .find({}, {
        _id: false
      })
      .toArray()
      .then(result => {
        res.json({ result: result[result.length - 1] })
      })
      .then(result => {
        return db.close()
      })
      .catch(err => {
        console.log(err)
        res.json({ bad: 400 })
      })
  })
}
