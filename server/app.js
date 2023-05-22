const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');

const usersRouter = require('./routes/users');
const eventRouter = require('./routes/events');

const app = express();

app.use(logger('dev'));
//passport stuff

app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.status(200).json({message: "EMPTY ROUTE TEST"});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}
app.get('/authtest', ensureAuthenticated, async (req, res) => {
  res.status(200).json({message: "YOU ARE LOGGED IN!"});
});

app.use('/users', usersRouter);
app.use('/events', eventRouter);
dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;