// Import necessary modules
const express = require('express');
const client = require('./db/client');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { engine } = require('express-handlebars');
const store = new SequelizeStore({ db: client });
const { User, Post } = require('./models');
const routes = require('./routes');
const registerRoutes = require('./routes/registerRoutes.js'); // Import the router for registration

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Set up the express sessions
app.use(session({
    secret: 'something',
    store,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to false if not using HTTPS
}));

// Serve static files in the public directory
app.use(express.static('public'));

// Set up Handlebars template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Mount the main routes
app.use('/', routes);

// Mount the register route
app.use('/', registerRoutes); // Use the router for handling registration

// Listen for the port
client.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server running on port:', PORT);
        });
    });
