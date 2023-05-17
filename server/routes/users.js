const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userControllers.js');
require('../auth/local');

/* GET users listing. */

router.post('/register', userController.registerUser);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}));

module.exports = router;
