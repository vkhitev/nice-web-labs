'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Deviation', {
      form: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      small_mark_dev: {
        type: Sequelize.INTEGER,
        comment: 'Number of studets with more than 2.5 mark deviation on any subject'
      },
      big_mark_dev: {
        type: Sequelize.INTEGER,
        comment: 'Number of studets with more than 5 mark deviation on any subject'
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Deviation')
  }
}
