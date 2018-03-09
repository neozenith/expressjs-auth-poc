'use strict';

const uuidv1 = require('uuid/v1');
const defaultOptions = {
	tokens: {},
	tokenTimeout: 2 * 60
};

const sso = function(opt) {
	return (req, res) => {
		//merge default options
		const options = Object.assign(opt || {}, defaultOptions);
		const token = uuidv1();
		console.log(`sso: ${token} for requestor: ${req.ip} or ${req.ips}`);

		//Save tokenInfo
		options.tokens[token] = {
			source: req.ip,
			issued: Date.now()
		};

		res.send(token);
	};
};

const tokenAuthenticate = function(opt) {
	return (req, res, next) => {
		//merge default options
		const options = Object.assign(opt || {}, defaultOptions);

		const headers = req.headers;
		const tokenHeaderKey = 'cs-eapi-token';
		const issuedTokens = options.tokens;

		if (headers[tokenHeaderKey]) {
			const token = headers[tokenHeaderKey];
			console.log(`has token: ${token}`);

			if (issuedTokens[token]) {
				console.log(`Token exists:`);
				console.log(issuedTokens[token]);
				const tokenInfo = issuedTokens[token];
				const expiry = tokenInfo.issued + options.tokenTimeout * 1000;
				const now = Date.now();
				console.log(`Expired(${now > expiry}) Expiry: ${expiry} \t Now: ${now}`);
				if (now > expiry) {
					console.error('Token expired!');
				}

				if (req.ip === tokenInfo.source) {
					console.log('Request Source matches');
				} else {
					console.error(
						`Request source(${req.ip}) doesn\'t match token source ${tokenInfo.source} `
					);
				}
			} else {
				console.error(`token not valid. Should be in:`);
				console.error(issuedTokens);
			}
		} else {
			console.error('no cs-eapi-token');
		}

		next();
	};
};

module.exports = { sso, tokenAuthenticate };
