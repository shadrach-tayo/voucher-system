const passport = require('passport');

/**
 * Module to handle authentication routing request
 */
module.exports = app => {
  
  // Handle Google Login requests
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // Finalize user Authentication on google callback
  app.get(
    '/auth/google/callback', 
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
      res.redirect('/');
    }
  );
  
  // Handle User Logout Request
  app.get('*/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  })

  // Handle request for currently logged In user
  app.get('*/api/current_user', (req, res) => {
    console.log('getting current user', req.user);
    res.send(req.user);
  })

}