const Sequelize = require('sequelize');
require('dotenv').config();

const client = new Sequelize(
    process.env.DATABASE_URL || process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DATABASE_URL ? {
                require: true,
                rejectUnauthorized: false
            } : false,
        },
    }
);

module.exports = client;
