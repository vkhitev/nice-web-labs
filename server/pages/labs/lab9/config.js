module.exports = {
  url: 'mysql://vlad:qewret@localhost:3306/school',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    underscored: false,
    timestamps: false,
    charset: 'utf8'
  }
}
