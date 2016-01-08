'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

let Aftership = require('./../../index');
let api_key = '';
// let default_endpoint = 'https://api.aftership.com/v4';
// let default_proxy = null;
// let default_retry = true;

describe('Test call', function () {
	describe('Test call', function () {
		this.timeout(5000);

		let expected_200 = {
			meta: {
				code: 200
			},
			data: {
				total: 333,
				couriers: []
			}
		};
		let expected_401 = {
			meta: {
				code: 401,
				message: 'Invalid API key.',
				type: 'Unauthorized'
			},
			data: {}
		};
		let expected_error = new Error('Some error');

		let sandbox;

		before(function () {
			sandbox = sinon.sandbox.create();
		});

		beforeEach(function () {
			sandbox.reset();
			sandbox.restore();
		});

		it('should callback with response body, if response code = 200', function (done) {
			// Construct with invalid api_key
			let aftership = new Aftership(api_key);
			// Stub request to return all couriers
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(null, null, JSON.stringify(expected_200));
			});
			aftership.call('GET', 'couriers/all', function (err, result) {
				expect(err).to.equal(null);
				expect(result).to.deep.equal(expected_200);
				done();
			});
		});

		it('should callback with response error, if response code != 200', function (done) {
			// Construct with invalid api_key
			let aftership = new Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(expected_401);
			});
			aftership.call('GET', 'couriers/all', function (err) {
				expect(err).to.deep.equal(expected_401);
				done();
			});
		});

		it('should callback with response error, if request throw', function (done) {
			let aftership = new Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(expected_error);
			});
			aftership.call('GET', 'couriers/all', function (err) {
				expect(err).to.deep.equal(expected_error);
				done();
			});
		});
	});
});
