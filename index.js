const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
  }
));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Voucher system</h1>')
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

app.listen(PORT, () => console.log('Server running on port: ', PORT));