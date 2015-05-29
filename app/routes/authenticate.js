// Libraries
var config = require('../../config');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secretKey = config.TOKEN_SECRET;

// function for creating a token
function createToken(user) {

	var token = jwt.sign({
		id: user._id,
	}, secretKey, {
		expiresInMinutes: 1440
	});

	return token;
}


module.exports = function(app, express, passport) {

	var router = express.Router();

	router.get('/twitter', function(req, res, next) {

		passport.authenticate('twitter', { session: false }, function(err, user, info) {
			if (err) { return next(err) };

			if (user) {
				var token = createToken(user);
				return res.json({ token: token });
			} else {
				return res.status(401).json(info);
			}
		})(req, res, next);
	});


	return router;

}