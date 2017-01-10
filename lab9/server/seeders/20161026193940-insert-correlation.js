'use strict'

const c1 = `
  (ABS(s.mark1 - s.mark_mean) > 2.5 OR
  ABS(s.mark2 - s.mark_mean) > 2.5 OR
  ABS(s.mark3 - s.mark_mean) > 2.5)
`

const c2 = `
  (ABS(s.mark1 - s.mark_mean) > 5 OR
  ABS(s.mark2 - s.mark_mean) > 5 OR
  ABS(s.mark3 - s.mark_mean) > 5)
`

const c3 = `
  (ABS(s.test1 - s.test_mean) > 25 OR
  ABS(s.test2 - s.test_mean) > 25 OR
  ABS(s.test3 - s.test_mean) > 25)
`

const c4 = `
  (ABS(s.test1 - s.test_mean) > 50 OR
  ABS(s.test2 - s.test_mean) > 50 OR
  ABS(s.test3 - s.test_mean) > 50)
`

const cond1 = `s.form = 12`
const cond2 = `s.form = 12 AND ${c1}`
const cond3 = `s.form = 12 AND ${c3}`
const cond4 = `s.form = 12 AND ${c1} AND ${c3}`
const cond5 = `s.form = 12 AND ${c2}`
const cond6 = `s.form = 12 AND ${c4}`
const cond7 = `s.form = 12 AND ${c2} AND ${c4}`

const num = `( SUM( s.mark_mean * s.test_mean ) - SUM( s.mark_mean ) *
 SUM( s.test_mean ) / COUNT( s.mark_mean ) ) /( COUNT( s.mark_mean ) - 1 )`
const den = `( STDDEV_POP(s.mark_mean) * STDDEV_POP(s.test_mean) )`
const cov = `${num} / ${den}`

const insertCorQuery = `
INSERT INTO correlation (cor1, cor2, cor3, cor4, cor5, cor6, cor7)
  VALUES (
    (SELECT ${cov} FROM student s WHERE (${cond1})),
    (SELECT ${cov} FROM student s WHERE (${cond2})),
    (SELECT ${cov} FROM student s WHERE (${cond3})),
    (SELECT ${cov} FROM student s WHERE (${cond4})),
    (SELECT ${cov} FROM student s WHERE (${cond5})),
    (SELECT ${cov} FROM student s WHERE (${cond6})),
    (SELECT ${cov} FROM student s WHERE (${cond7}))
  )
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(insertCorQuery)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Correlation', null, {})
  }
}
