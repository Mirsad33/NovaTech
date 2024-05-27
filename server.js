// Import necessary modules
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');
const { User, Post } = require('./models');
const routes = require('./routes');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const sequelize = require('./db/client');

const app = express();
const PORT = process.env.PORT || 3333;

// Database connection
// console.log('DATABASE_URL:', process.env.DATABASE_URL);
// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/database';


// Session store
const store = new SequelizeStore({ db: sequelize });
app.use(
  session({
    secret: 'something',
    store,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Change to true if using HTTPS
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Serve static files in the public directory
app.use(express.static('public'));

// Set up Handlebars template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
// Mount the main routes
app.use('/', routes);

// Mount the register route
app.use('/register', registerRoutes); // Use the router for handling registration
app.use('/auth', authRoutes); // Use the router for handling authentication
app.use('/dashboard', dashboardRoutes); // Use the router for handling dashboard routes

// Sync database and start server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  } 
);
