'use strict';

// Module Imports
const express = require('express'),
	path = require('path'),
	compression = require('compression');

// Internal Imports
const actions = require('./api/actions'),
	auth = require('./api/auth');

// Config
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

// App level routing
const EapiSsoOptions = {
	tokens: {},
	tokenTimeout: 15
};
app.all('/auth/sso', auth.sso());

// Collection of API Routes
const apiRouter = express.Router();
apiRouter.use(auth.tokenAuthenticate());
apiRouter.all('/actions/message', actions.message);
apiRouter.all('/actions/rpc', actions.rpc);
app.use(`/api/v${apiVersion}`, apiRouter);

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
