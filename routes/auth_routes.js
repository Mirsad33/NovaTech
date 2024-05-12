const auth_router = require('express').Router()
const auth_controller = require('../../controllers/auth_controller')

// Save a user to the database and loh theminto a session
auth_router.post('/auth/register', auth_controller.registerUser)
// Log a user into a session
auth_router.post('/auth/login', auth_controller.loginUser)

module.exports = auth_router

