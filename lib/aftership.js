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
     * 	retry {boolean} - Retry if fail, max. 5 times, default is true
	 *	rate {boolean} - Retry if Error 429 occur, wait until rate-limit reset, default is true
     * @constructor
     */
	constructor(api_key, options) {
		this._errorHandling(api_key, options);

		// Setup
		options = options || {};
		this.request = request;
		this.api_key = api_key;
		this.endpoint = options.endpoint || DefaultEndpoint;
		this.proxy = options.proxy || null;
		this.retry = _.isBoolean(options.retry) ? options.retry : true;
		this.rate = _.isBoolean(options.rate) ? options.rate : true;

		this.rate_limit = {};

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
				return _this.call.apply(_this, args);
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
		let _this = this;
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

		// Create payload with (aftership, method, path, options)
		let payload = Payload(_this, args[0], args[1], args[2]);

		if (callback) {
			// Handle the payload, with the callback
			Handler.handlePayload(_this, payload, callback);
		} else {
			// return Promise, is callback is not define
			return new Promise(function (resolve, reject) {
				Handler.handlePayload(_this, payload, function (err, result) {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}

	/**
     * Error Handling function
	 * Throw error if the input param contain incorrect type
     *
     * @param api_key {string}
     * @param options {object}
     */
	_errorHandling(api_key, options) {
		if (!_.isString(api_key)) {
			// Verify api_key
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidApiKey, api_key);
		} else if (!_.isNull(options) && !_.isUndefined(options) && !_.isPlainObject(options)) {
			// Verify options
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidOptions, options);
		}

		// Verify options value
		if (options) {
			if (!_.isNull(options.endpoint) && !_.isUndefined(options.endpoint) && !_.isString(options.endpoint)) {
				// Verify endpoint
				throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidEndpoint, options.endpoint);
			} else if (!_.isNull(options.proxy) && !_.isUndefined(options.proxy) && !_.isString(options.proxy)) {
				// Verify proxy
				throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidProxy, options.proxy);
			} else if (!_.isNull(options.retry) && !_.isUndefined(options.retry) && !_.isBoolean(options.retry)) {
				// Verify retry
				throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidRetry, options.retry);
			} else if (!_.isNull(options.rate) && !_.isUndefined(options.rate) && !_.isBoolean(options.rate)) {
				// Verify rate
				throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidRate, options.rate);
			}
		}
	}
}

// Exports the constructor
module.exports = function (api_key, options) {
	return new Aftership(api_key, options);
};
