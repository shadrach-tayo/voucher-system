const passport = require('passport');

/**
 * Module to handle authentication routing
 */
module.exports = app => {
    
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
    	console.log(req.user);
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })

  app.get('/dashboard', (req, res) => {
    res.send(req.user);
  })
}