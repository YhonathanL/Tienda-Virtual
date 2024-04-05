import { Sequelize } from 'sequelize';

const db = new Sequelize('Tienda', 'admin', 'Ghoul.tokyo3', {
    host:'tienda.c5uociuse58g.us-west-1.rds.amazonaws.com',
    dialect:'mysql'
});
export default db;
