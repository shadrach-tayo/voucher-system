const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// serialize user 
passport.serializeUser((user, done) => {
  console.log('serializing user :', user);
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  console.log('deserializing user by googleId: ', id);
  User.findOne({googleId: id})
  .then(user => {
    done(null, user)
  }).catch(err => {
    console.log(err);
    done('error: still not working with googleId');
  })
})

// config for the google strategy when authentication using google
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleCallBackURL,
    proxy: true
  }, 
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if(existingUser) {
          // user exits
          done(null, existingUser);
        } else {
          new User({
            _id: profile.id,
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            imageUrl: profile.photos[0].value
          }).save()
            .then(user => {
              done(null, user)
            })
        }
      })
  }
));