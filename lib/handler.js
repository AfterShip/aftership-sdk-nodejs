'use strict';

// Declare imports
const _ = require('lodash');
const request = require('request');
const Error = require('./error/error');
const ErrorEnum = require('./error/error_enum');

// Global variable
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
			throw Error.getSdkError(ErrorEnum.ConstructorInvalidApiKey, api_key);
		} else if (!_.isNull(endpoint) && !_.isUndefined(endpoint) && !_.isString(endpoint)) {
			// Verify endpoint
			throw Error.getSdkError(ErrorEnum.ConstructorInvalidEndpoint, endpoint);
		} else if (!_.isNull(proxy) && !_.isUndefined(proxy) && !_.isString(proxy)) {
			// Verify proxy
			throw Error.getSdkError(ErrorEnum.ConstructorInvalidProxy, proxy);
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw Error.getSdkError(ErrorEnum.ConstructorInvalidRetry, retry);
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
			let payload = this._constructPayload.apply(this, args);
			this._handlePayload(payload, callback);
		} catch (e) {
			callback(e);
		}
	}

	/**
     * Function to get the payload and create the request
     *
     * @param payload {object} - The payload object to create the request
     * @param callback {function}
     */
	_handlePayload(payload, callback) {
		this.request(payload.request_object, function (err, req, body) {
			if (err) {
				callback(err);
			} else {
				if (body.meta.code !== 200) {
					callback(Error.getApiError(body));
				} else {
					callback(null, payload.raw ? JSON.stringify(body) : body);
				}
			}
		});
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
			throw Error.getSdkError(ErrorEnum.HandlerInvalidMethod, method);
		} else if (!_.isString(path)) {
			// Verify path
			throw Error.getSdkError(ErrorEnum.HandlerInvalidPath, path);
		} else if (!_.isNull(body) && !_.isUndefined(body) && !_.isPlainObject(body)) {
			// Verify body
			throw Error.getSdkError(ErrorEnum.HandlerInvalidBody, body);
		} else if (!_.isNull(query) && !_.isUndefined(query) && !_.isPlainObject(query)) {
			// Verify query
			throw Error.getSdkError(ErrorEnum.HandlerInvalidQuery, query);
		} else if (!_.isNull(retry) && !_.isUndefined(retry) && !_.isBoolean(retry)) {
			// Verify retry
			throw Error.getSdkError(ErrorEnum.HandlerInvalidRetry, retry);
		} else if (!_.isNull(raw) && !_.isUndefined(raw) && !_.isBoolean(raw)) {
			// Verify raw
			throw Error.getSdkError(ErrorEnum.HandlerInvalidRaw, raw);
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

		// Remove all null or undefined
		for (let key in request_object) {
			if (request_object[key] === null || request_object[key] === undefined) {
				delete request_object[key];
			}
		}

		let payload = {
			request_object: request_object,
			retry: (!_.isNull(retry) && !_.isUndefined(retry)) ? retry : this.retry,
			raw: (!_.isNull(raw) && !_.isUndefined(raw)) ? raw : false
		};

		return payload;
	}
}

module.exports = Handler;
