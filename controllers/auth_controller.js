// const { User } = require("../models");
// const bcrypt = require("bcrypt");

// module.exports = {
//   // Controller function for registering a new user
//   async registerUser(req, res) {
//     try {
//       // Extract user data from request body
//       const { username, email, password } = req.body;

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create a new user in the database
//       const user = await User.create({ username, email, password: hashedPassword });

//       // Store the user ID in the session
//       req.session.user_id = user.id;
      
//       res.status(200).send("New user created");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal server error");
//     }
//   },
  
//   // Controller function for authenticating a user login
//   async loginUser(req, res) {
//     // Extract username and password from request body
//     const { username, password } = req.body;

//     try {
//       // Find the user in the database based on the provided username
//       const user = await User.findOne({ where: { username } });

//       if (!user) {
//         return res.status(400).send('Failed to login user');
//       }

//       // Validate the provided password against the stored hash
//       const isValidPassword = await bcrypt.compare(password, user.password);

//       if (!isValidPassword) {
//         return res.status(400).send('Failed to validate password');
//       }

//       // Store the user ID in the session
//       req.session.user_id = user.id;

//       // Redirect user to the homepage after successful login
//       res.redirect("/");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal server error");
//     }
//   },
// };

