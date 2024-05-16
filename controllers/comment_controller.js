// const { Comment } = require('../models')

// module.exports = {
//   // Controller function for saving a new comment to the database
//   async saveCommentToDb(req, res) {
//     try {
//       // Extract comment content and associated post ID from request body
//       const { comment, postId } = req.body 
//       // Retrieve user ID from session
//       const user = req.session.user_id 
  
//       // Create a new comment in the database
//       await Comment.create({ 
//         comment: comment, 
//         user_id: user,
//         postId: postId
//       })
  
//       // Redirect user to the homepage after comment creation
//       res.redirect('/') 
//     } catch (err) {
//       // Handle any errors that occur during comment creation
//       console.log(err)
//     }
//   }
// }
