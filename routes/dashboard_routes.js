const router = require('express').Router()
const dashboard_controller = require('../controllers/dashboard_controller')

// Save new post to database
router.post('/dashboard', dashboard_controller.savePostToDb)
// Update user's post
router.post('/dashboard/update', dashboard_controller.updatePost)
// Delete user's post
router.post('/dashboard/delete', dashboard_controller.deleteRoute)

module.exports = router

