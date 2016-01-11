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
     * @param endpoint {string} - Aftership endpoint, default 'https://api.aftership.com/v4'
     * @param proxy {string} - Proxy, default is null
     * @param retry {boolean} - Retry if fail, default is true
     * @constructor
     */
	constructor(api_key, endpoint, proxy, retry) {
		if (!_.isString(api_key)) {
			// Verify api_key
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidApiKey, api_key);
		} else if (!_.isNull(endpoint) && !_.isUndefined(endpoint) && !_.isString(endpoint)) {
			// Verify endpoint
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidEndpoint, endpoint);
		} else if (!_.isNull(proxy) && !_.isUndefined(proxy) && !_.isString(proxy)) {
			// Verify proxy
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidProxy, proxy);
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw AftershipError.getSdkError(ErrorEnum.ConstructorInvalidRetry, retry);
		}

		// Setup
		this.request = request;
		this.api_key = api_key;
		this.endpoint = endpoint || DefaultEndpoint;
		this.proxy = proxy || null;
		this.retry = (!_.isNull(retry) && !_.isUndefined(retry)) ? retry : true;

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
     * @param body {object} - POST body
     * @param query {object} - query object
	 * @param retry {boolean} - Retry if fail? override this.retry if set
	 * @param raw {boolean} - if true, return string, else return object, default false
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

		if (_this.rate_limit.remaining === 0) {
			timeout = _this.rate_limit.reset - Math.ceil(Date.now() / 1000);
			if (timeout < 0) {
				timeout = 0;
			} else {
				timeout *= 1000;
			}
		}

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
     * @param body {object} - POST body
     * @param query {object} - query object
	 * @param retry {boolean} - Retry if fail? override this.retry if set
	 * @param raw {boolean} - if true, return string, else return object, default false
     * @param callback {function}
	 * @return
     */
	_constructPayload(method, path, body, query, retry, raw) {
		if (methods.indexOf(method.toUpperCase()) === -1) {
			// Verify method
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidMethod, method);
		} else if (!_.isString(path)) {
			// Verify path
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidPath, path);
		} else if (!_.isNull(body) && !_.isUndefined(body) && !_.isPlainObject(body)) {
			// Verify body
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidBody, body);
		} else if (!_.isNull(query) && !_.isUndefined(query) && !_.isPlainObject(query)) {
			// Verify query
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidQuery, query);
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidRetry, retry);
		} else if (!_.isNull(raw) && !_.isUndefined(raw) && !_.isBoolean(raw)) {
			// Verify raw
			throw AftershipError.getSdkError(ErrorEnum.HandlerInvalidRaw, raw);
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
			body: body,
			qs: query,
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
			retry: (!_.isNull(retry) && !_.isUndefined(retry)) ? retry : this.retry,
			raw: (!_.isNull(raw) && !_.isUndefined(raw)) ? raw : false
		};

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
