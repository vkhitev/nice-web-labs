'use strict'

const fsp = require('fs-promise')

const rand = require('../util/random-data')

const { tmpFile, numberOfEntities } = require('./config.json')

const updateQuery = `
DROP TABLE IF EXISTS tmp_import;
CREATE TABLE tmp_import (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  test1 INTEGER,
  test2 INTEGER,
  test3 INTEGER
);

LOAD DATA LOCAL INFILE :file INTO TABLE tmp_import
FIELDS TERMINATED BY ' '
  LINES TERMINATED BY '\n'
  (@col1, @col2, @col3)
  SET test1=@col1,
      test2=@col2,
      test3=@col3;

UPDATE student
  INNER JOIN tmp_import ON (student.id = tmp_import.id)
  SET
    student.test1 = tmp_import.test1,
    student.test2 = tmp_import.test2,
    student.test3 = tmp_import.test3;

DROP TABLE tmp_import;
`

const deleteTestsQuery = `
UPDATE student
  SET test1 = NULL,
      test2 = NULL,
      test3 = NULL
`

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve().then(() => {
      const data = rand.getRandomTests(numberOfEntities).map((test) => {
        const { test1, test2, test3 } = test
        return `${test1} ${test2} ${test3}`
      }).join('\n')
      return fsp.writeFile(tmpFile, data)
    }).then(() => {
      return queryInterface.sequelize.query(updateQuery, { replacements: { file: tmpFile } })
    }).then(() => {
      return fsp.unlink(tmpFile)
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(deleteTestsQuery)
  }
}
