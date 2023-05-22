const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

passport.serializeUser((userID, done) => {
    done(null, userID);
});

passport.deserializeUser(async (userID, done) => {
    try 
    {
        const user = await User.findOne({ _id: userID});
        if (!user)
        {
            return done(null, false);
        }
        return done(null, user._id);
    }
    catch (err)
    {
        return done(err);
    }
});


passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  async function(email, password, done) 
  {
    try
    {
        //verify that this login and this password is valid!
        const user = await User.findOne({ email: email});
        if (!user)
        {
            return done(null, false, { message: `Email or password wrong. Please try again.`});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
        {
            return done(null, false, { message: `Email or password wrong. Please try again.`});
        }
        return done(null, user._id);
    }
    catch (err)
    {
        return done(null, false, { message: 'Failed to login. Please try again.' });
    }
  }
));