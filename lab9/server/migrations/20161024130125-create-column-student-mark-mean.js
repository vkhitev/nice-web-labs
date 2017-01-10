'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Student', 'mark_mean', {
      type: Sequelize.FLOAT
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Student', 'mark_mean')
  }
}
