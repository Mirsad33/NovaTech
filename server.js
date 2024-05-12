const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

require('dotenv').config()
const client = require('./config/connections')

const app = express()
const PORT = process.env.PORT || 3000

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./routes') 

//setup Handlebars
app.engine('hbs', engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: client,
    }),
    cookie: { 
        maxAge: 300000,
        // secure: true
    }
}))

app.use('/', routes)

client.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log('Listening on port:', PORT))
    }
)

