'use strict';

const message = (req, res) => {
	res.send('message');
};

const rpc = (req, res) => {
	res.send('rpc');
};

module.exports = { message, rpc };
