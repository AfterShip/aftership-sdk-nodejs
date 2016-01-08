'use strict';

// Declare imports
const _ = require('lodash');
const request = require('request');

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
		if (!_.isString(api_key)) {
			// Verify api_key
			throw new Error('Constructor: Invalid API key');
		} else if (!_.isNull(endpoint) && !_.isUndefined(endpoint) && !_.isString(endpoint)) {
			// Verify endpoint
			throw new Error('Constructor: Invalid Endpoint');
		} else if (!_.isNull(proxy) && !_.isUndefined(proxy) && !_.isString(proxy)) {
			// Verify proxy
			throw new Error('Constructor: Invalid Proxy');
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw new Error('Constructor: Invalid Retry value');
		}

		this.api_key = api_key;
		this.endpoint = endpoint || 'https://api.aftership.com/v4';
		this.proxy = proxy || null;
		this.retry = (!_.isNull(retry) && !_.isUndefined(retry)) ? retry : true;
		this.request = request;
	}

	/**
     * Call (Context-less)
     *
     * @param method {string} - get, post, put or delete
     * @param path {string} - pathname for URL
     * @param body {object} - POST body
     * @param query {object} - query object
	 * @param retry {boolean} - Retry if fail? override this.retry if set
	 * @param raw {boolean} - if true, return string, else return object, default false
     * @constructor
     */
	call(method, path, body, query, retry, raw, callback) {
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

		try {
			let request_object = this._constructRequestObject.apply(this, args);
			this._handleRequest(request_object, callback);
		} catch (e) {
			callback(e);
		}
	}

	_handleRequest(request_object, callback) {
		this.request(request_object, function (err, req, body) {
			if (err) {
				callback(err);
			} else {
				if (body.meta.code !== 200) {
					callback(body);
				} else {
					callback(null, body);
				}
			}
		});
	}

	_constructRequestObject(method, path, body, query, retry, raw, safe) {
		if (methods.indexOf(method.toUpperCase()) === -1) {
			// Verify method
			throw new Error(`Call: Invalid method ${method.toUpperCase()}`);
		} else if (!_.isString(path)) {
			// Verify path
			throw new Error('Call: Invalid path');
		} else if (!_.isNull(body) && !_.isUndefined(body) && !_.isPlainObject(body)) {
			// Verify body
			throw new Error('Call: Invalid body');
		} else if (!_.isNull(query) && !_.isUndefined(query) && !_.isPlainObject(query)) {
			// Verify query
			throw new Error('Call: Invalid query');
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw new Error('Call: Invalid retry');
		} else if (!_.isNull(raw) && !_.isUndefined(raw) && !_.isBoolean(raw)) {
			// Verify raw
			throw new Error('Call: Invalid raw');
		}

		let request_object = {
			headers: {
				'aftership-api-key': this.api_key,
				'Content-Type': 'application/json',
				'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
			},
			url: this.endpoint + path,
			method: method,
			body: body,
			qs: query,
			proxy: this.proxy,
			json: true
		};

		return request_object;
	}
}

module.exports = Handler;
