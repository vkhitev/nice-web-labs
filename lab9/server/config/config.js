module.exports = {
  development: {
    url: 'mysql://vlad:qewret@localhost:3306/school',
    dialect: 'mysql',
    seederStorage: 'sequelize',

    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: false,
      charset: 'utf8'
    },

    dialectOptions: {
      multipleStatements: true
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql'
  },
  test: {
    url: process.env.DATABASE_URL || 'mysql://vlad:qewret@localhost:3306/school-test',
    dialect: 'mysql'
  }
}
