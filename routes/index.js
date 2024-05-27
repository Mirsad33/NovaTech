const router = require('express').Router()
const User = require('../models/User.js')
const Post = require('../models/Post.js')

async function attachUser(req, res, next) {
    const user_id = req.session.user_id
    if (user_id) {
        const user = await User.findByPk(user_id, {
            attributes: ['id', 'username', 'email', 'posts'],
            include: [{
                model: Post,
            }],
        })
        req.user = user.get({plain:true})
        return next()
    }
    next()
}

const user_routes = require('./user_routes')

router.use('/api', user_routes)

const blog_routes = require('./blog_routes.js')

router.use('/api/posts', blog_routes)

const views = require('./view_routes.js')

router.use('/', views)

module.exports = router