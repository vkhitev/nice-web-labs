'use strict'

module.exports = function (sequelize, DataTypes) {
  var Deviation = sequelize.define('Deviation', {
    form: {
      type: DataTypes.INTEGER,
      validate: { min: 2, max: 12 }
    },
    small_mark_dev: {
      type: DataTypes.INTEGER,
      validate: { min: 0 }
    },
    big_mark_dev: {
      type: DataTypes.INTEGER,
      validate: { min: 0 }
    },
    small_test_dev: {
      type: DataTypes.INTEGER,
      validate: { min: 0 }
    },
    big_test_dev: {
      type: DataTypes.INTEGER,
      validate: { min: 0 }
    }
  })
  return Deviation
}
