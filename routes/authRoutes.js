const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        // If user exists, validate password
        if (user) {
            const isValid = await user.validatePass(password);
            if (isValid) {
                // Establish session for the user
                req.session.user_id = user.id;
                console.log('User logged in:', user.username);
                return res.redirect('/dashboard');
            }
        }

        // If user does not exist or password is invalid
        console.log('Invalid username or password');
        res.status(401).json({ error: 'Invalid username or password' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// User logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
