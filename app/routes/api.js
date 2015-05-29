var express = require('express');
var router = express.Router();
var config = require('../../config');
var Reddit = require('../models/reddit');
var RedditPost = require('../models/reddit');
var RedditLink = require('../models/reddit');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secretKey = config.TOKEN_SECRET;

function ensureAuthenticated(req, res, next) {

	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, secretKey, function(err, decoded) {
			if(err) {
				res.status(403).json({ message: "Failed to authorize the header"});
			}

			req.decoded = decoded;
			next();
		});
	} else {
		res.status(403).json({ message: "Failed to retrieve token "});
	}
}

function checkSubReddit(checkSubReddit) {

	Reddit.findOne({ subReddit: checkSubReddit }, function(err, existing) {
			if(existing) {
				checkSubReddit = existing;
			} else {
				res.json({ message: "You have just created a new Post"})
			}
		})
}


module.exports = function(app, express, passport) {

	var api = express.Router();

	api.get('/', function(req, res, next) {


	})

	api.post('/reddits/post/create', function(req, res, next) {
		var post = new RedditPost();
		post.title = req.body.title;
		post.body = req.body.title;
		post.subReddit = req.body.subReddit

		checkSubReddit(post.subReddit);

		post.save(function(err) {
			if(err) { return next(err) };
			res.json({ message: "You have just created a new Post"});

		});


	});

	api.post('/reddits/link/create', function(req, res, next) {

		var post = new RedditLink();
		post.title = req.body.title;
		post.url = req.body.url;
		post.subReddit = req.body.subReddit;

		checkSubReddit(post.subReddit);

	});

	api.post('/reddits/:reddit_id/upvote', function(req, res, next) {
		if(RedditPost) {
			RedditPost.findById(req.body.id, function(err, redP) {
				if(err) { return next(err) };
				var index = redP.upvote.indexOf(req.body.id);
				redP.save(function(err) {
					if(err) return next(err);
					res.json(200);
				})

			})

		} else {

			RedditLink.findById(req.body.id, function(err, redL) {
				if(err) { return next(err) };
				var index = redL.upvote.indexOf(req.body.id);
				redL.save(function(err) {
					if(err) return next(err);
					res.json(200);
				});
			});

		}
	});

	api.post('/reddits/:user_id/downvote');

	api.get('/r/:reddit_name');

	api.get('/r/:reddit_name/comments');



}