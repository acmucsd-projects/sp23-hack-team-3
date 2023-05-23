const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');

const usersRouter = require('./routes/users');
const organizationsRouter = require('./routes/organizations');
const eventRouter = require('./routes/events');

const sessionHandler = require('./auth/session.js');

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

//IGNORE THESE TEST ROUTES 
app.get('/', async (req, res) => {
  res.status(200).json({message: "EMPTY ROUTE TEST"});
});
app.get('/authtest', sessionHandler.ensureAuthenticated, async (req, res) => {
  res.status(200).json({message: "YOU ARE LOGGED IN!"});
});

//ACTUAL EVENT SITE ROUTES
app.use('/users', usersRouter);
app.use('/events', eventRouter);
app.use('/organizations', organizationsRouter);
dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;