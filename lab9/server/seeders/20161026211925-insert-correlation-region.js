'use strict'

const rand = require('../util/random-data')

const num = `( SUM( s.mark_mean * s.test_mean ) - SUM( s.mark_mean ) *
 SUM( s.test_mean ) / COUNT( s.mark_mean ) ) /( COUNT( s.mark_mean ) - 1 )`
const den = `( STDDEV_POP(s.mark_mean) * STDDEV_POP(s.test_mean) )`
const cov = `${num} / ${den}`

const insertCorQuery = `
UPDATE
  correlation
SET
  cor8 = (SELECT ${cov} FROM student s WHERE s.form = 12 AND s.region = :region)
`

const deleteCorQuery = `
UPDATE correlation
  SET cor8 = NULL
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    const randomRegion = rand.randomIntInc(1, 24)
    return queryInterface.sequelize.query(insertCorQuery, { replacements: { region: randomRegion } })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(deleteCorQuery)
  }
}
