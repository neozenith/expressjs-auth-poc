'use strict';

// Imports
const express = require('express'),
	path = require('path'),
	compression = require('compression');
const actions = require('./api/actions'),
	auth = require('./api/auth');
const pkg = require('./package.json');

// Server Setup
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'DEVELOPMENT';
const apiVersion = pkg.version.split('.')[0];
const app = express();
app.use(compression());

console.log(`${environment} v${pkg.version}`);

// Static Assets
app.use(express.static(path.join(__dirname, 'static')));

// Routing
app.get('/', (req, res) => res.send('Hello World!'));

const servicesRouter = express.Router();

servicesRouter.all('/auth/sso', auth.sso);

servicesRouter.all('/actions/message', actions.message);
servicesRouter.all('/actions/rpc', actions.rpc);

app.use(`/api/v${apiVersion}`, servicesRouter);

/* eslint-disable no-unused-vars */
// 404
app.use(function(req, res, next) {
	res.status(404).send('Not Found');
});

// 500
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Internal Server Error: ' + err);
});
/* eslint-enable no-unused-vars */

// Serving
app.listen(port, () => console.log(`http://localhost:${port}`));
