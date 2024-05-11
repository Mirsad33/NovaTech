const view_router = require('express').Router()
const viewController = require('../controllers/viewController')


function isAuth(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }

    next()
}

// Landing page
view_router.get('/', viewController.landingView)
// Dashboard page only if logged in
view_router.get('/dashboard', isAuth, viewController.dashboardView)
// Login page
view_router.get('/login', viewController.loginView)
// Register page
view_router.get('/register', viewController.registerView)
// Logout page
view_router.get('/logout', isAuth, viewController.logout)

module.exports = view_router