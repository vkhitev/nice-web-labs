'use strict'

module.exports = function (sequelize, DataTypes) {
  var Correlation = sequelize.define('Correlation', {
    cor1: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor2: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor3: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor4: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor5: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor6: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor7: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    },
    cor8: {
      type: DataTypes.FLOAT,
      validate: { min: -1, max: 1 }
    }
  })
  return Correlation
}
