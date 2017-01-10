module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Student', 'test_mean', {
      type: Sequelize.FLOAT
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Student', 'test_mean')
  }
}
