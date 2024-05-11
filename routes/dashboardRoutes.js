const router = require('express').Router()
const dashController = require('../controllers/dashController')


router.post('/dashboard', dashController.savePostToDb)

router.post('/dashboard/update', dashController.updatePost)

router.post('/dashboard/delete', dashController.deleteRoute)

module.exports = router
