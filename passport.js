var User = require('./app/models/user');
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('./config');

module.exports = function(passport) {


	passport.use(new TwitterStrategy({
		consumerKey: config.TWITTER_KEY,
		consumerSecret: config.TWITTER_SECRET,
		callbackURL: config.TWITTER_CALLBACK

	}, function(req, accessToken, tokenSecret, profile, done) {
		if (req.user) {
			User.findOne({ twitter: profile.id }, function(err, existingUser) {
				if (existingUser) {
					req.flash('errors', { msg: "There is already a Twitter account. Sign in with different Account"});
					done(err);
				} else {
					User.findById(req.user.id, function(err, user) {
						user.twitter = profile.id;
						user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
						user.profile.name = user.profile.name || profile.displayName;
						user.profile.location = user.profile.location || profile._json.location;
						user.profile.picture = user.profile.picture || profile._json.profile_image_url_https.replace('_normal', '_bigger');

						user.save(function(err) {
							req.flash('info', { msg: 'Twitter account has been linked' });
							done(err, user);
						});
					});
				}
			});
		} else {
			User.findOne({ twitter: profile.id }, function(err, existingUser) {
				if (existingUser) return done(null, existingUser);
				var user = new User();

				user.email = profile.username + "@twitter.com";
				user.twitter = profile.id;
				user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
				user.profile.name = profile.displayName;
				user.profile.location = profile._json.location;
				user.profile.picture = user.profile.picture || profile._json.profile_image_url_https.replace('_normal', '_bigger');
				user.save(function(err) {
					done(err, user);
				});
			});
		}
	}));







}