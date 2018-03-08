'use strict';

// Imports
const express = require('express'),
	path = require('path');
const actions = require('./api/actions');
const pkg = require('./package.json');

// Defines
const port = process.env.PORT || 3000;
const apiVersion = pkg.version.split('.')[0];
const app = express();

// Static Assets
app.use(express.static(path.join(__dirname, 'static')));

// Routing
app.get('/', (req, res) => res.send('Hello World!'));

const servicesRouter = express.Router();

servicesRouter.all('/actions/message', actions.message);
servicesRouter.all('/actions/rpc', actions.rpc);

app.use(`/api/v${apiVersion}`, servicesRouter);

// Serving
app.listen(port, () => console.log(`http://localhost:${port}`));
