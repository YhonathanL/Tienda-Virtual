// archivo llamado "sync.js"
const sequelize = require('./sequelize');
const Usuario = require('./models/Usuario');
const Producto = require('./models/products');

(async () => {
  try {
    await sequelize.sync({ force: false }); // o false si no quieres borrar datos
    console.log('Tablas creadas exitosamente');
    process.exit();
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
})();
