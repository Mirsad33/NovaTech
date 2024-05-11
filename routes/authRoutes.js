const auth_router = require('express').Router()
const authController = require('../controllers/authController')


auth_router.post('/auth/register', authController.registerUser)

auth_router.post('/auth/login', authController.loginUser)

module.exports = auth_router
