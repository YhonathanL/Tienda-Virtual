const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Productos = sequelize.define('productos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  talla: {
    type: DataTypes.STRING,
    allowNull:false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull:false
  },
  disponibilidad: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
},{
  timestamps: false,
}
);


module.exports = Productos;