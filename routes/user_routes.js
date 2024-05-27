const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const users = await User.scope('withoutPassword').findAll({
            include: { model: Post },
        });
        return res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.scope('withoutPassword').findByPk(id, {
            include: { model: Post },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await User.create(newUser);
        req.session.user_id = user.id;
        req.session.username = user.username;
        console.log('User registered and logged in:', user.username);
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect('/logout');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
