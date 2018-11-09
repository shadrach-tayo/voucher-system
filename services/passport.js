const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// serialize user 
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  console.log(id);
  const userId = mongoose.Types.ObjectId(id);
  User.findById(userId).then(user => {
    console.log('deserilizing user: ', user);
    done(null, user)
  });
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