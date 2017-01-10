'use strict'

const c1 = `
COUNT (CASE WHEN
  ABS(student.mark1 - student.mark_mean) > 2.5 OR
  ABS(student.mark2 - student.mark_mean) > 2.5 OR
  ABS(student.mark3 - student.mark_mean) > 2.5
  THEN 1 END)
`

const c2 = `
COUNT (CASE WHEN
  ABS(student.mark1 - student.mark_mean) > 5 OR
  ABS(student.mark2 - student.mark_mean) > 5 OR
  ABS(student.mark3 - student.mark_mean) > 5
  THEN 1 END)
`

const insertDevQuery = `
INSERT INTO deviation (form, small_mark_dev, big_mark_dev)
  SELECT student.form, ${c1}, ${c2}
  FROM student
  GROUP BY student.form
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(insertDevQuery)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Deviation', null, {})
  }
}
