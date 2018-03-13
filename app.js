'use strict';

// Module Imports
const express = require('express'),
	path = require('path'),
	compression = require('compression'),
	morgan = require('morgan'),
	passport = require('passport');

// Config
const pkg = require('./package.json');
const port = process.env.PORT || 9099;
const renderEngine = 'ejs';
const environment = process.env.NODE_ENV || 'DEVELOPMENT';
const apiVersion = pkg.version.split('.')[0];

console.log(`${environment} v${pkg.version}`);

/************************************************************************/
// Server Setup
const app = express();
app.apiVersion = apiVersion;
app.use(compression()); // Compression available
app.use(morgan('dev')); // log every request to the console
app.set('view engine', renderEngine); // set up view engine for templating
// Static Assets
app.use(express.static(path.join(__dirname, 'static')));
// Body Parsing
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/************************************************************************/
// Routing
require('./api/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

/************************************************************************/

/* eslint-disable no-unused-vars */
// 404
app.use((req, res, next) => res.status(404).send('Not Found'));

// 500
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server Error: ' + err);
});
/* eslint-enable no-unused-vars */

// Serving
app.listen(port, () => console.log(`http://localhost:${port}`));
