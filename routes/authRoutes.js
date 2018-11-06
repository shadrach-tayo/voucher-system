const passport = require('passport');

/**
 * Module to handle authentication routing
 */
module.exports = app => {
    
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  })

  app.get('/dashboard', (req, res) => {
    res.send(req.user);
  })
}