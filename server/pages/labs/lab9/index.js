const benchmark = require('./benchmark.json')

let deviation
let correlation

const db = require('./models/')
db.sequelize
  .authenticate()
  .then(() => {
    return db.sequelize.query('select * from deviation', {
      type: db.sequelize.QueryTypes.SELECT
    })
  })
  .then(res => {
    deviation = res
    return db.sequelize.query('select * from correlation', {
      type: db.sequelize.QueryTypes.SELECT
    })
  })
  .then(res => {
    correlation = res[0]
  })
  .catch(function (error) {
    return console.log('Error creating connection:', error)
  })

module.exports = () => ({
  benchmark: benchmark,
  deviation: deviation,
  correlation: correlation
})
