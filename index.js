const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// require authentication routing handler
// and plug into express app instance
require('./routes/authRoutes')(app);

// serialize user 
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

// deserialize user
passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
})

// config for the google strategy when authentication using google
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  console.log('profile: ', profile);
  done(null, profile);
}
));


app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voucher system</h1>')
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ', PORT));