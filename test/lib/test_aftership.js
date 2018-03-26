'use strict';

const chai = require('chai');
const expect = chai.expect;
// const http = require('http');
// const request = require('request');
const Aftership = require('./../../index');

let api_key = 'SOME_API_KEY';

describe('Test constructor', function () {
	describe('Test construct correct cases', function () {
		it('should construct with api_key correctly', function () {
			let aftership = Aftership(api_key);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.endpoint).to.equal('https://api.aftership.com/v4');
			expect(aftership.proxy).to.equal(null);
			expect(aftership.retry).to.equal(true);
			expect(aftership.user_agent_prefix).to.equal('aftership-sdk-nodejs');
		});

		it('should construct with api_key and options correctly', function () {
			let endpoint = 'https://api.aftership.com/v3';
			let aftership = Aftership(api_key, {
				endpoint: endpoint,
				proxy: '127.0.0.1',
				retry: false,
				user_agent_prefix: 'web'
			});
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.api_key).to.equal(api_key);
			expect(aftership.proxy).to.equal('127.0.0.1');
			expect(aftership.retry).to.equal(false);
			expect(aftership.user_agent_prefix).to.equal('web');
		});
	});

	describe('Test constructor error', function () {
		it('should return error, if api_key is null/undefined/not string', function () {
			let expected_error = 'ConstructorError: Invalid API key';
			try {
				Aftership();
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(null);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(999);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(true);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(false);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership({});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if options is not null/undefined/object', function () {
			let expected_error = 'ConstructorError: Invalid Options value';
			try {
				Aftership(api_key, 999);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, true);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, false);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, 'options');
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if endpoint is defined but not string', function () {
			let expected_error = 'ConstructorError: Invalid Endpoint value';
			try {
				Aftership(api_key, {endpoint: 999});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {endpoint: true});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {endpoint: false});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {endpoint: {}});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if proxy is defined but not string', function () {
			let expected_error = 'ConstructorError: Invalid Proxy value';
			try {
				Aftership(api_key, {proxy: 999});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {proxy: true});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {proxy: false});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {proxy: {}});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if retry is defined but not boolean', function () {
			let expected_error = 'ConstructorError: Invalid Retry value';
			try {
				Aftership(api_key, {retry: 999});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {retry: 0});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {retry: 1});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {retry: {}});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {retry: ''});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if rate is defined but not boolean', function () {
			let expected_error = 'ConstructorError: Invalid Rate value';
			try {
				Aftership(api_key, {rate: 999});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {rate: 0});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {rate: 1});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {rate: {}});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Aftership(api_key, {rate: ''});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});
	});
});
