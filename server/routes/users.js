const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userControllers.js');
const sessionHandler = require('../auth/session.js');
require('../auth/local');

//no need login/signup if user is already within login session
//just redirect to home page
/* GET users listing. */


// router.get('/', userController.getUserInfo);
router.post('/register', sessionHandler.alreadyAuthenticated, userController.registerUser);
// router.post('/login', sessionHandler.alreadyAuthenticated, passport.authenticate('local', {
//   successRedirect: 'http://localhost:3000',
//   failureRedirect: 'localhost:3000',
// }));

router.post('/login', sessionHandler.alreadyAuthenticated, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    console.log("WHYYYY")
    console.log(req.body)
    if (err) {
      console.log("WHYYYY2")
      return next(err);
    }
    if (!user) {
      console.log(user);
      console.log(info)
      console.log("WHYYYY3")
      return res.status(302).json({ redirectUrl: "localhost:3000/login" });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log("WHYYYY4")
        return next(err);
      }
      //If Successful
      console.log("WHYYYY5")
      return res.status(200).json({ redirectURL: "localhost:3000" });
    });
  })(req, res, next);
});
module.exports = router;
