const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Middleware to check if user is authenticated
function isAuth(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login'); // Ensure return to stop further execution
    }
    next(); // Proceed to the next middleware or route handler
}

// Home route
router.get('/', async (req, res) => {
    // Check if user is logged in based on session
    const isLoggedIn = !!req.session.user_id;

    // Prepare user object for rendering the view
    const userObj = {
        isLoggedIn: isLoggedIn,
        user: req.user  // Assuming req.user is correctly set elsewhere
    };
    const postsData = await Post.findAll({
        include: { model: User },
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Render the 'home' view with userObj
    res.render('home', {posts});
});

// Route to fetch and render all posts
router.get('/posts', async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.findAll();
        
        // Render the 'posts' view with the fetched posts
        res.render('posts', {
            posts: posts.map(p => p.get({ plain: true }))
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
    // Prepare user object for rendering the view
    const userObj = {
        isLoggedIn: !!req.session.user_id,
        user: req.user  // Assuming req.user is correctly set elsewhere
    };
    
    // Render the 'dashboard' view with userObj
    res.render('dashboard',{username: req.session.username})
});

// Register route
router.get('/register', async (req, res) => {
    // Prepare user object for rendering the view
    const userObj = {
        isLoggedIn: !!req.session.user_id,
        user: req.user  // Assuming req.user is correctly set elsewhere
    };
    
    // Render the 'register' view with userObj
    res.render('register', userObj);
});

// Login route
router.get('/login', async (req, res) => {
    // Prepare user object for rendering the view
    const userObj = {
        isLoggedIn: !!req.session.user_id,
        user: req.user  // Assuming req.user is correctly set elsewhere
    };
    
    // Render the 'login' view with userObj
    res.render('login', userObj);
});

// Logout route
router.get('/logout', async (req, res) => {
    // Prepare user object for rendering the view
    const userObj = {
        isLoggedIn: !!req.session.user_id,
        user: req.user  // Assuming req.user is correctly set elsewhere
    };
    
    // Render the 'logout' view with userObj
    res.render('logout', userObj);
});

// User route (requires authentication)
router.get('/user', isAuth, async (req, res) => {
    try {
        // If user is not set, return 404
        if (!req.user) {
            return res.status(404).send("User not found");
        }
        // Fetch user from the database (assuming req.user.id is set)
        const user = await User.findByPk(req.user.id);
        
        // Prepare user object for rendering the view
        const userObj = {
            isLoggedIn: true,
            user: req.user  // Assuming req.user is correctly set elsewhere
        };
        
        // Render the 'dashboard' view with userObj
        res.render('dashboard', userObj);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});

module.exports = router;
