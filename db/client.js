const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
console.log(process.env.DB_PASSWORD)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;
