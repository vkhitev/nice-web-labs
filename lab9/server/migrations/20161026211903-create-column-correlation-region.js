module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Correlation', 'cor8', {
      type: Sequelize.FLOAT,
      comment: 'Correlation for all students of 12 form for random region'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Correlation', 'cor8')
  }
}
