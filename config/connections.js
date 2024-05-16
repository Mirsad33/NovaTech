// const Sequelize = require('sequelize');
// require('dotenv').config();

// // Check if DATABASE_URL environment variable is set (used for Heroku deployment)
// const sequelize = process.env.DATABASE_URL
//   ? new Sequelize(process.env.DATABASE_URL, {
//       // Configuration for PostgreSQL dialect
//       dialect: 'postgres',
//       dialectOptions: {
//         // Options for PostgreSQL dialect
//         ssl: {
//           // Enable SSL connection
//           require: true,
//           rejectUnauthorized: false // Allow self-signed certificates (for development)
//         }
//       }
//     })
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       // Configuration for local development database connection
//       host: 'localhost', // Hostname of the database server
//       dialect: 'postgres', // Dialect of the database management system
//       dialectOptions: {
//         decimalNumbers: true, // Enable parsing of decimal numbers
//       },
//     })

// module.exports = sequelize;
