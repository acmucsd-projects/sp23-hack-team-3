const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userControllers.js');
const sessionHandler = require('../auth/session.js');
require('../auth/local');


router.post('/register', sessionHandler.alreadyAuthenticated, userController.registerUser);

router.post('/login', sessionHandler.alreadyAuthenticated, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(401).json({ message: "Failed Login", logged: false });
    }
    if (!user) {
      return res.status(401).json({ message: "Failed Login", logged: false});
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log("WHYYYY4")
        return next(err);
      }
      //If Successful
      return res.status(200).json({ message: "Successful Login", logged: true });
    });
  })(req, res, next);
});

module.exports = router;
