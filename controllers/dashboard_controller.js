// const { Post } = require('../models')

// module.exports = {
  
//   // Controller function for saving a new post to the database
//   async savePostToDb(req, res) {
//     // Extract title and content from request body
//     const { title, content } = req.body 
//     // Retrieve user ID from session
//     const user_id = req.session.user_id 

//     // Check if title and content are provided
//     if (!title || !content) { 
//       return res.send({ message: 'Title and content are required.' })
//     }

//     try {
//       // Create a new post in the database
//       await Post.create({ title, content, user_id }) 

//       // Redirect user to the dashboard after post creation
//       res.redirect('/dashboard') 

//     } catch (err) {
//       // Handle any errors that occur during post creation
//       console.error('Error creating post', err)
//     }
//   },
  
//   // Controller function for updating an existing post
//   async updatePost(req, res) {
//     // Extract title, content, and post ID from request body
//     const { title, content, postId } = req.body 

//     try {
//       // Update the post in the database based on post ID
//       await Post.update( 
//         { title, content },
//         { where: { id: postId } }
//       )

//       // Redirect user to the dashboard after post update
//       res.redirect('/dashboard') 

//     } catch (err) {
//       // Handle any errors that occur during post update
//       console.log(err)
//     }
//   },
  
//   // Controller function for deleting a post
//   async deleteRoute(req, res) {
//     // Extract post ID from request body
//     const { postId } = req.body
//     // Delete the post from the database based on post ID
//     await Post.destroy({ where: { id: postId } })

//     // Redirect user to the dashboard after post deletion
//     res.redirect('/dashboard')
//   }

// }



