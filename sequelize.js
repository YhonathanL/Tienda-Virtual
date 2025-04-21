const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Tienda', 'root', 'ROOT', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
