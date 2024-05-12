const view_router = require('express').Router()
const view_controller = require('../controllers/view_controller')

// Check if a user session has started
function isAuth(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}

// Landing page
view_router.get('/', view_controller.landingView)
// Dashboard page only able to view if logged in
view_router.get('/dashboard', isAuth, view_controller.dashboardView)
// Login page
view_router.get('/login', view_controller.loginView)
// Register page
view_router.get('/register', view_controller.registerView)
// Logout: only able to logout if already logged in
view_router.get('/logout', isAuth, view_controller.logout)

module.exports = view_router
