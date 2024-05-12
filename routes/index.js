const router = require('express').Router()
// Brings all routes to a single file for easy export and import
const views = require('./view_routes')
const auth = require('./auth_routes')
const post = require('./dashboard_routes')
const comment =require('./comment_routes')

router.use('/', views, auth, post, comment)

module.exports = router