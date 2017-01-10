'use strict'

function avg (...args) {
  return args.reduce((x, y) => x + y || 0, 0) / args.length
}

module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    region: {
      type: DataTypes.INTEGER,
      validate: { min: 0 }
    },
    form: {
      type: DataTypes.INTEGER,
      validate: { min: 2, max: 12 }
    },
    mark1: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 12 }
    },
    mark2: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 12 }
    },
    mark3: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 12 }
    },
    mark_mean: {
      type: DataTypes.FLOAT,
      validate: { min: 1, max: 12 }
    },
    test1: {
      type: DataTypes.FLOAT,
      validate: { min: 100, max: 200 }
    },
    test2: {
      type: DataTypes.FLOAT,
      validate: { min: 100, max: 200 }
    },
    test3: {
      type: DataTypes.FLOAT,
      validate: { min: 100, max: 200 }
    },
    test_mean: {
      type: DataTypes.FLOAT,
      validate: { min: 100, max: 200 }
    }
  }, {
    validate: {
      validateMarkMean () {
        if (this.mark_mean !== avg(this.mark1, this.mark2, this.mark3)) {
          throw new Error('Mark mean must be equal to average value of marks')
        }
      },

      validateTestMean () {
        if (this.test_mean !== avg(this.test1, this.test2, this.test3)) {
          throw new Error('Test mean must be equal to average value of tests')
        }
      }
    }
  })
  return Student
}
