'use strict';

const message = function(req, res) {
	console.log(req);
	res.send('message');
};

const rpc = function(req, res) {
	console.log(req);
	res.send('rpc');
};

module.exports = { message, rpc };
