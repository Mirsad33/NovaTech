const router = require('express').Router()
const comment_controller = require('../controllers/comment_controller')

// Save comment to database
router.post('/comment', comment_controller.saveCommentToDb)

module.exports = router

