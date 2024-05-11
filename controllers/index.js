// controllers/index.js
const authController = require('./authController');
const commentController = require('./commentController');
const dashController = require('./dashController');
const viewController = require('./viewController');

module.exports = {
  authController,
  commentController,
  dashController,
  viewController
};
