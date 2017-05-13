'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./app/routes.js');
const mongoose = require("mongoose");
const yelp = require('yelp-fusion');

const app = express();

require('./app/config/passport')(passport);

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGO_URI);
mongoose.set("debug", true);

app.use('public', express.static(__dirname + '/public'));
app.use('views', express.static(__dirname + '/public/views'));
app.use('css', express.static(__dirname + '/public/css'));
app.use('js', express.static(__dirname + '/public/js'));

app.use(session({
	secret: 'secretNightlifeApp',
	resave: false,
	saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});