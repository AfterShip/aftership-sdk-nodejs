'use strict';

// Declare imports
const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');
const co = require('co');

const methods = ['GET', 'POST', 'DELETE', 'PUT'];

// Handler class
class Handler {
	/**
     * Handler constructor
     *
     * @param api_key {string} - Your Aftership API key
     * @param endpoint {string} - Aftership endpoint, default 'https://api.aftership.com/v4'
     * @param proxy {string} - Proxy, default is null
     * @param retry {boolean} - Retry if fail, default is true
     * @constructor
     */
	constructor(api_key, endpoint, proxy, retry) {
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
		this.request = request;
	}

	// arg order: method, path, body, query, retry, raw, safe
	call(method, path, body, query, retry, raw, safe, callback) {
		// console.log(path);
		// retrieve arguments as array
		let args = [];
		for (let i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		// if last element is a callback
		// store it to callback
		if (typeof args[args.length - 1] === 'function') {
			callback = args.pop();
		} else {
			callback = null;
		}

		let request_object = this._constructRequestObject.apply(this, args);

		if (!callback) {
			return this._handleRequestAsync(request_object);
		} else {
			this._handleRequest(request_object, callback);
		}
	}

	_handleRequest(request_object, callback) {
		this.request(request_object, function (err, req, body) {
			if (err) {
				callback(err);
			} else {
				body = JSON.parse(body);
				if (body.meta.code !== 200) {
					callback(body);
				} else {
					callback(null, body);
				}
			}
		});
	}

	_constructRequestObject(method, path, body, query, retry, raw, safe) {
		let request_object = {
			headers: {
				'aftership-api-key': this.api_key,
				'Content-Type': 'application/json'
			},
			url: this.endpoint + path,
			method: method,
			body: body,
			query: query
		};

		return request_object;
	}
}

module.exports = Handler;
