'use strict';

const TwitterStrategy = require("passport-twitter").Strategy;
const configAuth = require('./oauth');
const User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use(new TwitterStrategy({
     consumerKey: configAuth.twitterAuth.consumerKey,
     consumerSecret: configAuth.twitterAuth.consumerSecret,
     callbackURL: configAuth.twitterAuth.callbackURL
  },

  function(token, refreshToken, profile, done) {
     process.nextTick(function() {
         User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
           if (err) {
             return done(err);
           }
           if (user) {
               return done(null, user);
           } else {
             var newUser = new User();
             newUser.twitter.id = profile.id;                  
             newUser.twitter.token = token;
             newUser.twitter.name = profile.displayName;
  
             newUser.save(function(err) {
                 if (err) {
                   throw err;
                 }
                 return done(null, newUser);
             });
           }
         });
     });
  }));
};
