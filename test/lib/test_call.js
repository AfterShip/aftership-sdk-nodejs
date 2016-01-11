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
			let aftership = Aftership(api_key);
			aftership.call('GET', '/couriers/all', function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data.total).to.be.greaterThan(300);
				done();
			});
		});

		it('should work with call(method, path, body)', function (done) {
			// Construct with valid api_key
			let aftership = Aftership(api_key);
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
			let aftership = Aftership(api_key);
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
			let aftership = Aftership(api_key);
			aftership.call('GET', '/couriers/all', null, null, null, true, function (err, result) {
				expect(err).to.equal(null);
				expect(_.isString(result)).to.equal(true);
				done();
			});
		});
	});

	describe('Test RateLimit', function () {
		it('should request again until reset timestamp', function (done) {
			let now = Math.ceil(Date.now() / 1000);
			let mock_req = {
				headers: {
					'x-ratelimit-limit': 600,
					'x-ratelimit-remaining': 0,
					'x-ratelimit-reset': now + 5
				}
			};
			let mock_result = {
				meta: {
					code: 200
				},
				data: {}
			};
			// Construct with valid api_key
			let aftership = Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(null, mock_req, mock_result);
			});
			aftership.call('GET', '/couriers/all', function (first_err, first_result) {
				aftership.call('GET', '/couriers/all', function (second_err, second_result) {
					let diff = Math.ceil(Date.now() / 1000) - now;
					expect(diff).to.be.gte(5);

					done();
				});
			});
		});
	});

	describe('Test retry', function () {
		describe('Test retry with ConnectionTimeout', function () {
			it('should retry with call() with default retry = true, if request return ETIMEDOUT', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				let expected_error = new Error();
				expected_error.code = 'ETIMEDOUT';
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal('ETIMEDOUT');
					expect(err.retry_count).to.equal(5);
					done();
				});
			});
		});

		describe('Test retry with InternalError', function () {
			let mock_req;
			let expected_error;

			before(function () {
				mock_req = {
					headers: {}
				};
				expected_error = {
					meta: {
						code: 500,
						message: 'Something went wrong on AfterShip\'s end.',
						type: 'InternalError'
					},
					data: {}
				};
			});

			it('should retry with call() with default retry = true, if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(5);
					done();
				});
			});

			it('should retry with call(..., retry = true), if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key, null, null, false);
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', null, null, true, function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(5);
					done();
				});
			});

			it('should not retry with call() with default retry = false, if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key, null, null, false);
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(undefined);
					done();
				});
			});

			it('should not retry with call(..., retry = false), if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', null, null, false, function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(undefined);
					done();
				});
			});
		});
	});

	describe('Test Proxy method', function () {
		it('should work with handler.GET(...)', function (done) {
			let aftership = Aftership(api_key);
			aftership.GET('/couriers/all', function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data.total).to.be.greaterThan(300);
				done();
			});
		});

		it('should work with handler.POST(...)', function (done) {
			// Construct with valid api_key
			let aftership = Aftership(api_key);
			// Body
			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};
			aftership.POST('/couriers/detect', body, function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data).to.contains.all.keys(['total', 'couriers']);
				done();
			});
		});

		it('should work with handler.PUT(...) and handler.DELETE(...)', function (done) {
			let aftership = Aftership(api_key);
			let post_body = {
				tracking: {
					slug: 'dhl',
					tracking_number: '0000000000',
					title: 'Title Name',
					order_id: 'ID 1234',
					order_id_path: 'http://www.aftership.com/order_id=1234',
					custom_fields: {
						'product_name': 'iPhone Case',
						'product_price': 'USD19.99'
					}
				}
			};
			let put_body = {
				tracking: {
					title: 'Title'
				}
			};

			// DELETE tracking first
			aftership.DELETE('/trackings/dhl/0000000000', function () {
				aftership.POST('/trackings', post_body, function (post_err, post_result) {
					expect(post_err).to.equal(null);
					aftership.PUT('/trackings/dhl/0000000000', put_body, function (put_err, put_result) {
						expect(put_err).to.equal(null);
						aftership.DELETE('/trackings/dhl/0000000000', function (delete_err, delete_result) {
							expect(delete_err).to.equal(null);
							done();
						});
					});
				});
			});
		});
	});

	describe('Test error handling', function () {
		it('should callback with response error, if response code != 200', function (done) {
			let expected_message = 'Invalid API key.';
			// Construct with invalid api_key
			let aftership = Aftership('');
			aftership.call('GET', '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_message);
				done();
			});
		});

		it('should callback with response error, if request throw', function (done) {
			let expected_error = Error('Some error');
			let aftership = Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(expected_error);
			});
			aftership.call('GET', '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if method is invalid', function () {
			let method = 'invalid';
			let expected_error = Error('HandlerError: Invalid Method value');
			let aftership = Aftership(api_key);
			try {
				aftership.call(method, '/couriers/all', null);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should callback with response error, if path is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Path value');
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', null);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should callback with response error, if body is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Body value');
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', 'body');
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should callback with response error, if query is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Query value');
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', null, 'query');
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should callback with response error, if retry is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Retry value');
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', null, null, 'retry');
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should callback with response error, if raw is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Raw value');
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', null, null, false, 'raw');
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});
	});
});
