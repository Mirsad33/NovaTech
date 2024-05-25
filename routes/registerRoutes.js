// Import necessary modules
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Define the POST route for user registration
router.post('/register', async (req, res) => {
    try {
        // Extract user registration data from request body
        const { email, username, password } = req.body;

        // Validate input data (e.g., check for required fields, validate email format)

        // Create a new user in the database
        const newUser = await User.create({
            email,
            username,
            password
        });

        // Optionally, you can log the user in automatically after registration

        // Redirect the user to a different page (e.g., dashboard) after successful registration
        res.redirect('/dashboard');
    } catch (error) {
        // Handle errors (e.g., validation errors, database errors)
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});

// Export the router
module.exports = router;
