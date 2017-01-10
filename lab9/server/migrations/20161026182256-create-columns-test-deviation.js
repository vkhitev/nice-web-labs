'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Deviation', 'small_test_dev', {
      type: Sequelize.INTEGER
    }).then(() => {
      return queryInterface.addColumn('Deviation', 'big_test_dev', {
        type: Sequelize.INTEGER
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Deviation', 'small_test_dev').then(() => {
      return queryInterface.removeColumn('Deviation', 'big_test_dev')
    })
  }
}
