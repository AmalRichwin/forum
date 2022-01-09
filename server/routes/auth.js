const router = require('express').Router();
const passport = require('passport');
const { login, signup, logout, loggedInUser } = require('../controllers/auth');

router.post('/login', passport.authenticate('local'), login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/user', loggedInUser);

module.exports = router;
