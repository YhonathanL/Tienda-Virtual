const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Tienda', 'admin', 'Ghoul.tokyo3', {
  host: 'tienda.c5uociuse58g.us-west-1.rds.amazonaws.com',
  dialect: 'mysql',
});

module.exports = sequelize;
