const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userControllers.js');
const sessionHandler = require('../auth/session.js');
require('../auth/local');


router.post('/register', sessionHandler.alreadyAuthenticatedLoginRegister, userController.registerUser);

router.post('/login', sessionHandler.alreadyAuthenticatedLoginRegister, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(401).json({ message: "Failed Login", logged: false });
    }
    if (!user) {
      return res.status(401).json({ message: "Failed Login", logged: false});
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      //If Successful
      return res.status(200).json({ message: "Successful Login", logged: true });
    });
  })(req, res, next);
});

router.post('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) 
    { 
      return next(err); 
    }
    res.status(200).json({ message: "Unsuccessful logout", logged: false });
  });
});

module.exports = router;
