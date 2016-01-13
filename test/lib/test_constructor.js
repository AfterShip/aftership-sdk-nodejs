'use strict';

const chai = require('chai');
const expect = chai.expect;
// const http = require('http');
// const request = require('request');
const Aftership = require('./../../index');

let api_key = 'SOME_API_KEY';
let default_endpoint = 'https://api.aftership.com/v4';
let default_proxy = null;
let default_retry = true;

describe('Test constructor', function () {
	describe('Test construct correct cases', function () {
		it('should construct with api_key correctly', function () {
			let aftership = Aftership(api_key);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);

			aftership = Aftership(api_key, null, null, null, null);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and endpoint correctly', function () {
			let endpoint = 'https://api.aftership.com/v3';
			let aftership = Aftership(api_key, {
				endpoint: endpoint
			});
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and proxy correctly', function () {
			let proxy = '127.0.0.1';
			let aftership = Aftership(api_key, {
				proxy: proxy
			});
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and retry correctly', function () {
			let aftership = Aftership(api_key, {
				retry: false
			});
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(false);
		});
	});

	describe('Test constructor error', function () {
		it('should return error, if api_key is null/undefined/not string', function () {
			let expected_error = 'Invalid API key';
			expect(function () {
				return Aftership();
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(null);
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(999);
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(true);
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(false);
			}).to.throw(expected_error);
			expect(function () {
				return Aftership({});
			}).to.throw(expected_error);
		});

		it('should return error, if endpoint is defined but not string', function () {
			let expected_error = 'Invalid Endpoint';
			expect(function () {
				return Aftership(api_key, {
					endpoint: 999
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					endpoint: true
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					endpoint: false
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					endpoint: {}
				});
			}).to.throw(expected_error);
		});

		it('should return error, if proxy is defined but not string', function () {
			let expected_error = 'Invalid Proxy';
			expect(function () {
				return Aftership(api_key, {
					proxy: 999
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					proxy: true
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					proxy: false
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					proxy: {}
				});
			}).to.throw(expected_error);
		});

		it('should return error, if retry is defined but not boolean', function () {
			let expected_error = 'Invalid Retry value';
			expect(function () {
				return Aftership(api_key, {
					retry: 999
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					retry: 0
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					retry: 1
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					retry: {}
				});
			}).to.throw(expected_error);
			expect(function () {
				return Aftership(api_key, {
					retry: ''
				});
			}).to.throw(expected_error);
		});
	});
});
