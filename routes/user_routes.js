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

router.post('/register', async (req, res) => {
    try {
        const newUser = req.body;
        const user = await User.create(newUser);
        req.session.user_id = user.id;
        console.log('User registered and logged in:', user.username);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request for username:', username);
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const is_valid = await user.validatePass(password);
        if (!is_valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.user_id = user.id;
        console.log('User logged in:', user.username);
        return res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
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
