const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userControllers.js');
const sessionHandler = require('../auth/session.js');
require('../auth/local');

//no need login/signup if user is already within login session
//just redirect to home page
/* GET users listing. */

router.post('/register', sessionHandler.alreadyAuthenticated, userController.registerUser);
router.post('/login', sessionHandler.alreadyAuthenticated, passport.authenticate('local', {
  successRedirect: 'http://localhost:3000/home',
  failureRedirect: 'http://localhost:3000/login',
}));

module.exports = router;
