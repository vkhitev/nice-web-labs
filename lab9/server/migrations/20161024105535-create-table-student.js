'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Student', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      region: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      form: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mark1: Sequelize.INTEGER,
      mark2: Sequelize.INTEGER,
      mark3: Sequelize.INTEGER
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Student')
  }
}
