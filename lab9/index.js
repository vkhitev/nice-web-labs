var models = require('./server/models/')
models.sequelize
  .authenticate().then(() => {
    return models.sequelize.query('select * from student limit 1; select * from student limit 1')
  }).then((result) => {
    console.log(result)
    return models.sequelize.close()
  }).then(() => {

  })
  .catch(function (error) {
    return console.log('Error creating connection:', error)
  })
