const express = require('express');
const router = express.Router();

// Dashboard route
router.get('/dashboard', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/auth/login');
    }
console.log(req.session.username);
    // Render the dashboard view
    res.render('dashboard', { username: req.session.username });
});

module.exports = router;
