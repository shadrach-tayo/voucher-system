const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// serialize user 
passport.serializeUser((user, done) => {
  console.log('serializing user :', user);
  done(null, user._id);
});

// deserialize user
passport.deserializeUser((id, done) => {
<<<<<<< HEAD
  console.log('deserializing user: ', id);
  User.findById(id)
  .then(user => {
||||||| merged common ancestors
  User.findById(id).then(user => {
=======
  console.log('deserializing user: ', id);
  User.findOne({_id: id})
  .then(user => {
>>>>>>> 86564fe5963bff37e8ce2e092c1b873728a8bd2f
    console.log(user);
    done(null, user)
  }).catch(err => {
    console.log(err);
    done('error: still not working');
  })
})

// config for the google strategy when authentication using google
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, 
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if(existingUser) {
          // user already exits
          console.log('existing user: ', existingUser);
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
              console.log(user);
              done(null, user)
            })
        }
      })
  }
));