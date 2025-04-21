const express = require('express');
const sequelize = require('./sequelize');
const userRoutes = require('./routes/userRoutes');
const userlogin = require('./routes/userlogin');
const productRoutes = require('./routes/productRoutes');
const authenticateToken = require('./middlewares/authenticateToken');
const app = express();

app.use(express.json());
 // Middleware de autenticación
 


app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente con la base de datos');

    req.dbConnection = sequelize;

    next();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.use('/users', userRoutes);
app.use('/users', userlogin,authenticateToken);
app.use('/products',productRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
