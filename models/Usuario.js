const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Usuario = sequelize.define('Usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('administrador', 'cliente'),
    allowNull: false,
    defaultValue: 'cliente',
  },
}, {
  timestamps: false,
});

module.exports = Usuario;