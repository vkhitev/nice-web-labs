'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Correlation', {
      cor1: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for all students of 12 form'
      },
      cor2: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 2.5 mark deviation'
      },
      cor3: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 25 test deviation'
      },
      cor4: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 2.5 mark deviation and more than 25 test deviation'
      },
      cor5: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 5 mark deviation'
      },
      cor6: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 50 test deviation'
      },
      cor7: {
        type: Sequelize.FLOAT,
        comment: 'Correlation for students with more than 5 mark deviation and more than 50 test deviation'
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Correlation')
  }
}
