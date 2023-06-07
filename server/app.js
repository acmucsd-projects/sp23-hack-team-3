const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
//image stuff with s3

const usersRouter = require('./routes/users');
const organizationsRouter = require('./routes/organizations');
const eventRouter = require('./routes/events');

const sessionHandler = require('./auth/session.js');
const app = express();

app.use(logger('dev'));



app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
  })
);
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(passport.initialize());
app.use(passport.session());

//formatting?
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));

//IGNORE THESE TEST ROUTES 
app.get('/', async (req, res) => {
  return res.status(200).json({message: "HELLO"});
});

app.get('/authtest', sessionHandler.ensureAuthenticated, async (req, res) => {
  res.status(200).json({ logged: "true"});
});

app.get('/logged', async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ logged: true});
  }
  return res.status(200).json({logged: false});
});


//ACTUAL WEBSITE ROUTES
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