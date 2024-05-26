const express = require('express');
const router = express.Router();

// Dashboard route
router.get('/dashboard', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/auth/login');
    }

    // Render the dashboard view
    res.render('dashboard', { user: req.session.user_id });
});

module.exports = router;
