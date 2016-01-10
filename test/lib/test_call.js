'use strict';

const api_key = process.env.AFTERSHIP_NODEJS_SDK_API_KEY || ''; // please use your AfterShip api key

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Aftership = require('./../../index');

describe('Test call method', function () {
	this.timeout(10000);

	let sandbox;

	before(function () {
		sandbox = sinon.sandbox.create();
	});

	beforeEach(function () {
		sandbox.reset();
		sandbox.restore();
	});

	describe('Test correct cases', function () {
		it('should work with call(method, path)', function (done) {
			// Construct with valid api_key
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data.total).to.be.greaterThan(300);
				done();
			});
		});

		it('should work with call(method, path, body)', function (done) {
			// Construct with valid api_key
			let aftership = new Aftership(api_key);
			// Body
			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};
			aftership.call('POST', '/couriers/detect', body, function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data).to.contains.all.keys(['total', 'couriers']);
				done();
			});
		});

		it('should work with call(method, path, body, query)', function (done) {
			// Construct with valid api_key
			let aftership = new Aftership(api_key);
			let query = {
				fields: 'slug,name'
			};
			aftership.call('GET', '/couriers/all', null, query, function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data.couriers[0]).to.have.all.keys('slug', 'name');
				done();
			});
		});

		it('should work with call(..., raw = true)', function (done) {
			// Construct with valid api_key
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', null, null, null, true, function (err, result) {
				expect(err).to.equal(null);
				expect(_.isString(result)).to.equal(true);
				done();
			});
		});
	});

	describe('Test error handling', function () {
		it('should callback with response error, if response code != 200', function (done) {
			let expected_message = 'Invalid API key.';
			// Construct with invalid api_key
			let aftership = new Aftership('');
			aftership.call('GET', '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_message);
				done();
			});
		});

		it('should callback with response error, if request throw', function (done) {
			let expected_error = new Error('Some error');
			let aftership = new Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(expected_error);
			});
			aftership.call('GET', '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if method is invalid', function (done) {
			let method = 'invalid';
			let expected_error = new Error('HandlerError: Invalid Method value');
			let aftership = new Aftership(api_key);
			aftership.call(method, '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if path is invalid', function (done) {
			let expected_error = new Error('HandlerError: Invalid Path value');
			let aftership = new Aftership(api_key);
			aftership.call('GET', null, function (err) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if body is invalid', function (done) {
			let expected_error = new Error('HandlerError: Invalid Body value');
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', 'body', function (err, res) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if query is invalid', function (done) {
			let expected_error = new Error('HandlerError: Invalid Query value');
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', null, 'query', function (err, res) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if retry is invalid', function (done) {
			let expected_error = new Error('HandlerError: Invalid Retry value');
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', null, null, 'retry', function (err, res) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if raw is invalid', function (done) {
			let expected_error = new Error('HandlerError: Invalid Raw value');
			let aftership = new Aftership(api_key);
			aftership.call('GET', '/couriers/all', null, null, false, 'raw', function (err, res) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});
	});
});
