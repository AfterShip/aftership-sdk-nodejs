'use strict';

// Declare imports
const _ = require('lodash');
const request = require('request');
const AftershipError = require('./error/error');
const ErrorEnum = require('./error/error_enum');

// Global variable
const RetryLimit = 5;
const DefaultEndpoint = 'https://api.aftership.com/v4';
const RetriableError = [429, 500, 502, 503, 504];
const methods = ['GET', 'POST', 'DELETE', 'PUT'];

// Handler class
class Handler {
	/**
     * Handler constructor
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
		// 	handler.GET(...)
		// 	handler.POST(...)
		// 	handler.PUT(...)
		// 	handler.DELETE(...)
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

		let payload = this._constructPayload.apply(this, args);
		this._handlePayload(payload, callback);
	}

	/**
     * Function to get the payload and create the request
     *
     * @param payload {object} - The payload object to create the request
     * @param callback {function}
     */
	_handlePayload(payload, callback) {
		let _this = this;
		let timeout = 0;

		// Rate limit
		if (_this.rate_limit.remaining === 0) {
			timeout = _this.rate_limit.reset - Math.ceil(Date.now() / 1000);
			timeout *= 1000;
		}

		// Handle payload with timeout
		setTimeout(function () {
			_this.request(payload.request_object, function (err, req, body) {
				if (err) {
					if (err.code === 'ETIMEDOUT') {
						_this._retryPayload('ETIMEDOUT', payload, null, callback);
					} else {
						callback(err);
					}
				} else {
					_this.rate_limit = {
						limit: req.headers['x-ratelimit-limit'],
						remaining: req.headers['x-ratelimit-remaining'],
						reset: req.headers['x-ratelimit-reset']
					};

					if (RetriableError.indexOf(body.meta.code) !== -1) {
						_this._retryPayload('RetriableError', payload, body, callback);
					} else if (body.meta.code !== 200 && body.meta.code !== 201) {
						// It's an API Error
						callback(AftershipError.getApiError(body));
					} else {
						// Response OK
						callback(null, payload.raw ? JSON.stringify(body) : body);
					}
				}
			});
		}, timeout);
	}

	/**
     * Function to retry the payload and create the request
     *
	 * @param type {string} - 'RetriableError' for return API Error / 'ETIMEDOUT' for return ConnectionTimeout
     * @param payload {object} - The payload object to create the request
	 * @param body {object} - If body is defined, it is an RetriableError
     * @param callback {function}
     */
	_retryPayload(type, payload, body, callback) {
		if (payload.retry && payload.retry_count < RetryLimit) {
			// Retry
			payload.retry_count++;
			let _this = this;
			setTimeout(function () {
				_this._handlePayload(payload, callback);
			}, 1000);
		} else if (payload.retry && payload.retry_count >= RetryLimit) {
			// Return err if retriable and exceed RetryLimit
			if (type === 'RetriableError') {
				callback(AftershipError.getApiError(body, payload.retry_count));
			} else {
				callback(AftershipError.getSdkError(ErrorEnum.ConnectionTimeout, payload.request_object, payload.retry_count));
			}
		} else {
			// Return err if not retriable
			if (type === 'RetriableError') {
				callback(AftershipError.getApiError(body));
			} else {
				callback(AftershipError.getSdkError(ErrorEnum.ConnectionTimeout));
			}
		}
	}

	/**
     * Function to create the request_object and other information
     *
	 * @param method {string} - get, post, put or delete
     * @param path {string} - pathname for URL
	 * @param options {object}
     *	body {object} - POST body
     *	query {object} - query object
	 *	retry {boolean} - Retry if fail? override this.retry if set
	 *	raw {boolean} - if true, return string, else return object, default false
	 * @return the payload object
     */
	_constructPayload(method, path, options) {
		// body, query, retry, raw
		if (methods.indexOf(method.toUpperCase()) === -1) {
			// Verify method
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidMethod, method);
		} else if (!_.isString(path)) {
			// Verify path
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidPath, path);
		} else if (!_.isNull(options) && !_.isUndefined(options) && !_.isPlainObject(options)) {
			// Verify options
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidOptions, options);
		}

		// Verify options value
		options = options || {};
		if (!_.isNull(options.body) && !_.isUndefined(options.body) && !_.isPlainObject(options.body)) {
			// Verify body
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidBody, options.body);
		} else if (!_.isNull(options.query) && !_.isUndefined(options.query) && !_.isPlainObject(options.query)) {
			// Verify query
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidQuery, options.query);
		} else if (!_.isNull(options.retry) && !_.isUndefined(options.retry) && !_.isBoolean(options.retry)) {
			// Verify retry
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidRetry, options.retry);
		} else if (!_.isNull(options.raw) && !_.isUndefined(options.raw) && !_.isBoolean(options.raw)) {
			// Verify raw
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidRaw, options.raw);
		}

		// Request object
		let request_object = {
			headers: {
				'aftership-api-key': this.api_key,
				'Content-Type': 'application/json',
				'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
			},
			url: this.endpoint + path,
			method: method,
			body: options.body,
			qs: options.query,
			proxy: this.proxy,
			json: true
		};

		// Remove all null or undefined
		for (let key in request_object) {
			if (request_object[key] === null || request_object[key] === undefined) {
				delete request_object[key];
			}
		}

		// Payload
		let payload = {
			request_object: request_object,
			retry: (!_.isNull(options.retry) && !_.isUndefined(options.retry)) ? options.retry : this.retry,
			raw: (!_.isNull(options.raw) && !_.isUndefined(options.raw)) ? options.raw : false
		};

		// Add retry count if needed
		if (payload.retry) {
			payload.retry_count = 0;
		}

		return payload;
	}
}

// Exports the constructor
module.exports = function (api_key, endpoint, proxy, retry) {
	return new Handler(api_key, endpoint, proxy, retry);
};
