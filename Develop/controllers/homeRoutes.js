const router = require('express').Router();

// Define homepage route
router.get('/', (req, res) => {
  // Your logic to fetch and render blog posts
  res.render('home');
});

module.exports = router;
