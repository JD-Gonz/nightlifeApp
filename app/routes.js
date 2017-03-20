'use strict';

var DBHandler = require('./controllers/dbHandler.js');

module.exports = function(app, passport) {
	
	var dbHandler = new DBHandler();
	
  app.get("/loggedin", function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
  
  app.get('/auth/twitter', function authenticateFacebook (req, res, next) {
    req.session.returnTo = '/#' + req.query.returnTo; 
    next ();
  },
  passport.authenticate ('twitter'));
  
  app.get('/auth/twitter/callback', function (req, res, next) {
    var authenticator = passport.authenticate('twitter', { 
      successRedirect: req.session.returnTo,
      failureRedirect: '/'
    }); 
    delete req.session.returnTo;
    authenticator (req, res, next);
  });
};