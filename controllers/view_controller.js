const { User, Post, Comment } = require('../models')
//Methods for the view routes
module.exports = {
  // Method adds all posts and their comments to the DOM
  async landingView(req, res) {
    try {
      const allPosts = await Post.findAll({ //Get all posts and add user and commentt associated data
        include: [
          {model: User}, 
          {
            model: Comment,
            include: User
          }
        ]})
      const allPostsObj = allPosts.map(obj => obj.get({ plain: true })) //Clean up post object to diplay plain objects 
      // console.log(allCommentsObj)

      const user = req.session.user_id //Session id for validation ov rendered front end

      if (!user) {
        return res.render('landing', { //What logged out users see
          title: 'Home',
          posts: allPostsObj,
          href1: '/',
          link2: 'Login',
          href2: '/login',
          link3: 'Register',
          href3: '/register',
          link4: 'Dashboard',
          href4: '/dashboard'
        })
      }

      return res.render('landing', { //What logged in users see
        title: 'Home',
        user: user,
        posts: allPostsObj,
        href1: '/',
        link2: 'Logout',
        href2: '/logout',
        link3: 'Dashboard',
        href3: '/dashboard'
      })
      
    } catch (err) {
      console.log(err)
    }
  },

  //Hndles dashboard view route
  async dashboardView(req, res) {
    try {
      const user_id = req.session.user_id //User session id for rendering to front end
      const user = await User.findOne({ where: { id: user_id } })
      const username = user.username

      const postsData = await Post.findAll({ //Get all posts for logged in user
        where: {
          user_id: user_id
        },
        include: User
      })

      const postsObj = postsData.map(obj => obj.get({ plain: true })) //Plain object values
      // console.log(postsObj)

      res.render('dashboard', { //What user sees on dashboard
        title: 'Dashboard',
        username: username,
        post: postsObj,
        href1: '/',
        link2: 'Logout',
        href2: '/logout',
      })
    } catch (err) {
      console.log(err)
    }
  },
  loginView(req, res) { //What user sees on login page
    res.render('login', {
      title: 'Login',
      href1: '/',
      link2: 'Register',
      href2: '/register',
      link3: 'Logout',
      href3: '/logout'
    })
  },
  registerView(req, res) { //What user sees on register page
    res.render('register', {
      title: 'Register',
      href1: '/',
      link2: 'Login',
      href2: '/login'
    })
  },

  logout(req, res) { // Loggs the current user out
    req.session.destroy()
    res.redirect('/')
  }
}
