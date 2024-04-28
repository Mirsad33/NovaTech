const router = require('express').Router();
const homeRoutes = require('../controllers/homeRoutes');

// Define HTML routes
router.use('/', homeRoutes);

module.exports = router;
