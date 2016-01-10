'use strict';

const chai = require('chai');
const expect = chai.expect;
const Aftership = require('./../../index');

let api_key = 'SOME_API_KEY';
let default_endpoint = 'https://api.aftership.com/v4';
let default_proxy = null;
let default_retry = true;

describe('Test constructor', function () {
	describe('Test construct correct cases', function () {
		it('should construct with api_key correctly', function () {
			let aftership = new Aftership(api_key);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);

			aftership = new Aftership(api_key, null, null, null, null);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and endpoint correctly', function () {
			let endpoint = 'https://api.aftership.com/v3';
			let aftership = new Aftership(api_key, endpoint);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(endpoint);
			expect(aftership.proxy).to.equal(default_proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and proxy correctly', function () {
			let proxy = '127.0.0.1';
			let aftership = new Aftership(api_key, null, proxy, null);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal(default_endpoint);
			expect(aftership.proxy).to.equal(proxy);
			expect(aftership.retry).to.equal(default_retry);
		});

		it('should construct with api_key and retry correctly', function () {
			let aftership = new Aftership(api_key, null, null, false);
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
				return new Aftership();
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(null);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(999);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(true);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(false);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership({});
			}).to.throw(expected_error);
		});

		it('should return error, if endpoint is defined but not string', function () {
			let expected_error = 'Invalid Endpoint';
			expect(function () {
				return new Aftership(api_key, 999);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, true);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, false);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, {});
			}).to.throw(expected_error);
		});

		it('should return error, if proxy is defined but not string', function () {
			let expected_error = 'Invalid Proxy';
			expect(function () {
				return new Aftership(api_key, null, 999);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, true);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, false);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, {});
			}).to.throw(expected_error);
		});

		it('should return error, if retry is defined but not boolean', function () {
			let expected_error = 'Invalid Retry value';
			expect(function () {
				return new Aftership(api_key, null, null, 999);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, null, 0);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, null, 1);
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, null, {});
			}).to.throw(expected_error);
			expect(function () {
				return new Aftership(api_key, null, null, '');
			}).to.throw(expected_error);
		});
	});
});
