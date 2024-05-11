const path = require('path');
const express = require('express');
const client = require('./config/connections');
const session = require('express-session');
const { engine } = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sessions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: client
  }),
  cookie: { maxAge: 300000 } 
};

app.use(session(sessions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Pass the 'engine' object directly to app.engine(), without invoking it
app.engine('handlebars', engine);
app.set('view engine', 'handlebars');

app.use('/',routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port:', PORT));
});
