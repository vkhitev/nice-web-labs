'use strict'

const c1 = `
COUNT (CASE WHEN
  ABS(student.test1 - student.test_mean) > 25 OR
  ABS(student.test2 - student.test_mean) > 25 OR
  ABS(student.test3 - student.test_mean) > 25
  THEN 1 END)
`

const c2 = `
COUNT (CASE WHEN
  ABS(student.test1 - student.test_mean) > 50 OR
  ABS(student.test2 - student.test_mean) > 50 OR
  ABS(student.test3 - student.test_mean) > 50
  THEN 1 END)
`

const insertDevQuery = `
UPDATE
  deviation
INNER JOIN
  student
SET
  small_test_dev = (SELECT ${c1} FROM student WHERE student.form = 12),
  big_test_dev = (SELECT ${c2} FROM student WHERE student.form = 12)
WHERE
  deviation.form = 12
`

const deleteDevQuery = `
UPDATE deviation
  SET
    small_test_dev = NULL,
    big_test_dev = NULL
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(insertDevQuery)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(deleteDevQuery)
  }
}
