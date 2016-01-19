'use strict';

// Declare imports
const _ = require('lodash');
const request = require('request');
const AftershipError = require('./error/error');
const ErrorEnum = require('./error/error_enum');
const Handler = require('./handler');
const Payload = require('./payload');

// Global variable
const DefaultEndpoint = 'https://api.aftership.com/v4';
const methods = ['GET', 'POST', 'DELETE', 'PUT'];

// Aftership class
class Aftership {
	/**
     * Aftership constructor
     *
     * @param api_key {string} - Your Aftership API key
	 * @param options {object}
     * 	endpoint {string} - Aftership endpoint, default 'https://api.aftership.com/v4'
     * 	proxy {string} - Proxy, default is null
     * 	retry {boolean} - Retry if fail, default is true
     * @constructor
     */
	constructor(api_key, options) {
		if (!_.isString(api_key)) {
			// Verify api_key
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidApiKey, api_key);
		} else if (!_.isNull(options) && !_.isUndefined(options) && !_.isPlainObject(options)) {
			// Verify options
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidOptions, options);
		}

		// Verify options value
		options = options || {};
		if (!_.isNull(options.endpoint) && !_.isUndefined(options.endpoint) && !_.isString(options.endpoint)) {
			// Verify endpoint
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidEndpoint, options.endpoint);
		} else if (!_.isNull(options.proxy) && !_.isUndefined(options.proxy) && !_.isString(options.proxy)) {
			// Verify proxy
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidProxy, options.proxy);
		} else if (!_.isNull(options.retry) && !_.isUndefined(options.retry) && !_.isBoolean(options.retry)) {
			// Verify retry
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidRetry, options.retry);
		}

		// Setup
		this.request = request;
		this.api_key = api_key;
		this.endpoint = options.endpoint || DefaultEndpoint;
		this.proxy = options.proxy || null;
		this.retry = (!_.isNull(options.retry) && !_.isUndefined(options.retry)) ? options.retry : true;

		this.rate_limit = {
			reset: null,
			limit: null,
			remaining: null
		};

		// Create proxy methods
		// 	aftership.GET(...)
		// 	aftership.POST(...)
		// 	aftership.PUT(...)
		// 	aftership.DELETE(...)
		for (let i = 0; i < methods.length; i++) {
			let _this = this;
			this[methods[i]] = function () {
				let args = Array.prototype.slice.call(arguments);
				args.unshift(methods[i]);
				_this.call.apply(_this, args);
			};
		}
	}

	/**
     * Call (Context-less)
     *
     * @param method {string} - get, post, put or delete
     * @param path {string} - pathname for URL
	 * @param options {object}
     *	body {object} - POST body
     *	query {object} - query object
	 *	retry {boolean} - Retry if fail? override this.retry if set
	 *	raw {boolean} - if true, return string, else return object, default false
	 * @param callback {function}
     */
	call(method, path, options, callback) {
		// retrieve arguments as array
		let args = [this];
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

		let payload = Payload.apply(this, args);
		Handler.handlePayload(this, payload, callback);
	}
}

// Exports the constructor
module.exports = function (api_key, endpoint, proxy, retry) {
	return new Aftership(api_key, endpoint, proxy, retry);
};
