'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Student', 'test1', {
      type: Sequelize.FLOAT
    }).then(() => {
      return queryInterface.addColumn('Student', 'test2', {
        type: Sequelize.FLOAT
      })
    }).then(() => {
      return queryInterface.addColumn('Student', 'test3', {
        type: Sequelize.FLOAT
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Student', 'test1').then(() => {
      return queryInterface.removeColumn('Student', 'test2').then(() => {
        return queryInterface.removeColumn('Student', 'test3')
      })
    })
  }
}
