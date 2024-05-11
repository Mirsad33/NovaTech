const { User, Post, Comment } = require('../models')

module.exports = {
  
  async landingView(req, res) {
    try {
      const allPosts = await Post.findAll({ 
        include: [
          {model: User}, 
          {
            model: Comment,
            include: User
          }
        ]})
      const allPostsObj = allPosts.map(obj => obj.get({ plain: true })) 
      

      const user = req.session.user_id 

      if (!user) {
        return res.render('landing', { 
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

      return res.render('landing', { 
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

  
  async dashboardView(req, res) {
    try {
      const user_id = req.session.user_id 
      const user = await User.findOne({ where: { id: user_id } })
      const username = user.username

      const postsData = await Post.findAll({ 
        where: {
          user_id: user_id
        },
        include: User
      })

      const postsObj = postsData.map(obj => obj.get({ plain: true })) 

      res.render('dashboard', { 
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
  loginView(req, res) { 
    res.render('login', {
      title: 'Login',
      href1: '/',
      link2: 'Register',
      href2: '/register',
      link3: 'Logout',
      href3: '/logout'
    })
  },
  registerView(req, res) { 
    res.render('register', {
      title: 'Register',
      href1: '/',
      link2: 'Login',
      href2: '/login'
    })
  },

  logout(req, res) { 
    req.session.destroy()
    res.redirect('/')
  }
}