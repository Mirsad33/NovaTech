# NovaTech

# Tech Blog
Tech Blog is a CMS-style blog site where developers can publish articles, blog posts, and their thoughts and opinions. The application follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and express-session for authentication.

# Table of Contents
Installation
Usage
Database Tables
JavaScript Code
Handlebars Templates


# Installation

1. Clone the repository:

git clone <repository-url>

2. Install dependencies:

npm install

3. Create `.env` file and add the following envoirnment variables:

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host

5. Set up your database and tables using the provided SQL schema.

6. Run the application:

npm start

# Usage:

Visit the homepage to view existing blog posts or to sign up/sign in.
After signing in, you can create new blog posts, view and comment on existing posts, and manage your own posts.
The application also includes a dashboard for managing user posts.


# Database Tables:

Users Table: Stores user information including username, email, and password.
Posts Table: Stores blog posts created by users, including title and content.
Comments Table: Stores comments made by users on blog posts.


# JavaScript Code:

models/User.js: Defines the User model for interacting with the users table in the database.
models/Post.js: Defines the Post model for interacting with the posts table in the database.
models/Comment.js: Defines the Comment model for interacting with the comments table in the database.
server.js: Entry point of the application, sets up the server and 
listens for requests.


# Handlebars Templates:

views/layouts/main.handlebars: Main layout template used for rendering other templates.
Various Handlebars templates for rendering different pages including the homepage, dashboard, login page, signup page, single post page, and partial templates for post cards and comment cards.