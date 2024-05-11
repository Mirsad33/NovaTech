const router = require('express').Router()

const views = require('./viewRoutes')
const auth = require('./authRoutes')
const dash = require('./dashboardRoutes')
const comment =require('./commentRoutes')

router.use('/', views, auth, dash, comment)

module.exports = router