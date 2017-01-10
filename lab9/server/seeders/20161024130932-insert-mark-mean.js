'use strict'

// Contains NULL check
const updateMeanQuery = `
UPDATE STUDENT
  SET MARK_MEAN = (Coalesce(MARK1, 0) + Coalesce(MARK2, 0) + Coalesce(MARK3, 0)) /
         (Case When MARK1 Is Null Then 0 Else 1 End +
          Case When MARK2 Is Null Then 0 Else 1 End +
          Case When MARK3 Is Null Then 0 Else 1 End)
`

const deleteMeanQuery = `
UPDATE STUDENT
  SET MARK_MEAN = NULL
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(updateMeanQuery)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(deleteMeanQuery)
  }
}
