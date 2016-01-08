'use strict';

const _ = require('lodash');

// Handler class
class Handler {
	constructor(api_key, endpoint, proxy, retry, rate) {
		// Verify api_key
		if (!_.isString(api_key)) {
			throw new Error('Constructor: Invalid API key');
		}

		// Verify endpoint
		if (!_.isNull(endpoint) && !_.isUndefined(endpoint) && !_.isString(endpoint)) {
			throw new Error('Constructor: Invalid Endpoint');
		}

		// Verify proxy
		if (!_.isNull(proxy) && !_.isUndefined(proxy) && !_.isString(proxy)) {
			throw new Error('Constructor: Invalid Proxy');
		}

		// Verify retry
		if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			throw new Error('Constructor: Invalid Retry value');
		}

		this.api_key = api_key;
		this.endpoint = endpoint || 'https://api.aftership.com/v4';
		this.proxy = proxy || null;
		this.retry = (!_.isNull(retry) && !_.isUndefined(retry)) ? retry : true;
	}

	call() {
		console.log(arguments);
	}
}

module.exports = Handler;
