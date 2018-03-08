'use strict';

const uuidv1 = require('uuid/v1');

const sso = function(req, res) {
	const token = uuidv1();
	console.log(`sso: ${token}`);
	res.send(token);
};

module.exports = { sso };
