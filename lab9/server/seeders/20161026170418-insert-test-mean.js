'use strict'

// Contains NULL check
const updateMeanQuery = `
UPDATE STUDENT
  SET TEST_MEAN = (Coalesce(TEST1, 0) + Coalesce(TEST2, 0) + Coalesce(TEST3, 0)) /
         (Case When TEST1 Is Null Then 0 Else 1 End +
          Case When TEST2 Is Null Then 0 Else 1 End +
          Case When TEST3 Is Null Then 0 Else 1 End)
`

const deleteMeanQuery = `
UPDATE STUDENT
  SET TEST_MEAN = NULL
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(updateMeanQuery)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(deleteMeanQuery)
  }
}
