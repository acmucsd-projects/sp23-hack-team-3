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



router.post('/logout', function(req, res, next){
  
  req.logout(function(err) {
    // console.log("2")
    if (err) { 
      // console.log("3")
      // console.log("4")
      return res.status(500).json({message: "FAILED"});
    }
    req.session.destroy();
    return res.status(200).clearCookie('connect.sid').json({message: "SUCCESSFUL LOGOUT"});
  });
});



module.exports = router;
