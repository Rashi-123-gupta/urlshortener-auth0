// Requiring Modules
const express = require('express')
const app = express();
const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');
const routes = require('./routes/router');
require('dotenv').config();

// Set up view engine 
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('main')
})

// Set up session
app.use(
  session({
    secret: 'any key is fine',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(routes);

// Set up Express server
const server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

