'use strict';

//External Imports
const express = require('express');

// Internal Imports
const actions = require('./actions'),
	auth = require('./auth');

module.exports = function(app, passport) {
	// UNSECURED:
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});
	app.get('/login', function(req, res) {
		res.render('login.ejs'); // load the index.ejs file
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/health', (req, res) => {
		const health = {
			status: 'OK',
			timestamp: Date.now()
		};
		res.json(health);
	});

	// SECURED:
	app.all('/auth/sso', auth.sso());

	// Collection of API Routes
	const apiRouter = express.Router();
	apiRouter.use(auth.tokenAuthenticate());
	apiRouter.all('/actions/message', actions.message);
	apiRouter.all('/actions/rpc', actions.rpc);
	app.use(`/api/v${app.apiVersion}`, apiRouter);
};
