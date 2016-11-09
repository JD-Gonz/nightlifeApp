'use strict';

module.exports = {
  'twitterAuth': {
    'consumerKey': process.env.TWRT_CONSUMER_KEY,
    'consumerSecret': process.env.TWRT_CONSUMER_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
  }
};