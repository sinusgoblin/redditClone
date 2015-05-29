var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan  =require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');
var passport = require('passport');

var app = express();

mongoose.connect(config.database, function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Connected to the database");

});

require('./passport') (passport);

var authenticate = require('./app/routes/authenticate')(app, express, passport);
// var api = require('./app/routes/api');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
	secret: config.TOKEN_SECRET,
	resave: true,
	saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// The '/api' and '/auth' API
app.use('/auth', authenticate);
// app.use('/api', api);

// app.get('*', function(req, res, next) {
// 	res.sendFile(__dirname + '/public/app/views/index.html');
// });


//Listen on Port 3000
app.listen(config.port, function(err) {
	if(err) {
		console.log(err);
	} 

	console.log("Listening on port " + config.port);
});