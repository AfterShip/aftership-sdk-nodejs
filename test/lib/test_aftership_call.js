'use strict';

const api_key = 'SOME_API_KEY'; // please use your AfterShip api key

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const http = require('http');
const http_proxy = require('http-proxy');
const Aftership = require('./../../index');

describe('Test aftership.call()', function () {
	this.timeout(10000);

	let sandbox;

	before(function () {
		sandbox = sinon.sandbox.create();
	});

	beforeEach(function () {
		sandbox.reset();
		sandbox.restore();
	});

	describe('Test using proxy', function () {
		let proxy;
		let server;
		let expected_result = {
			meta: {
				code: 200
			},
			message: 'proxied!'
		};

		before(function () {
			proxy = http_proxy.createProxyServer({
				target: 'http://localhost:9000'
			}).listen(8000);

			server = http.createServer(function (req, res) {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.write(JSON.stringify(expected_result));
				res.end();
			}).listen(9000);
		});

		after(function () {
			proxy.close();
			server.close();
		});

		it('should return proxied result', function (done) {
			// Construct with valid api_key
			let aftership = Aftership(api_key, {
				endpoint: 'http://google.com',
				proxy: 'http://localhost:8000'
			});
			aftership.call('GET', '/couriers/all', function (err, result) {
				expect(err).to.equal(null);
				expect(result).to.deep.equal(expected_result);
				done();
			});
		});
	});

	describe('Test correct cases', function () {
		let aftership;
		let expected_result = {
			meta: {
				code: 200
			},
			data: {}
		};
		let mock_req = {
			headers: {
				'x-ratelimit-limit': 999,
				'x-ratelimit-remaining': 999,
				'x-ratelimit-reset': 999
			}
		};

		before(function () {
			// Construct with valid api_key
			aftership = Aftership(api_key);

			// Stub request to throw
			sinon.stub(aftership, 'request', function (options, callback) {
				callback(null, mock_req, expected_result);
			});
		});

		beforeEach(function () {
			aftership.request.reset();
		});

		it('should work with call(method, path) with callback', function (done) {
			aftership.call('GET', '/couriers/all', function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/all',
					method: 'GET',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				expect(result).to.deep.equal(expected_result);
				done();
			});
		});

		it('should work with call(method, path, {body}) with callback', function (done) {
			// Body
			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};
			aftership.call('POST', '/couriers/detect', {
				body: body
			}, function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/detect',
					body: body,
					method: 'POST',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				expect(result).to.deep.equal(expected_result);
				done();
			});
		});

		it('should work with call(method, path) with promise', function (done) {
			aftership.call('GET', '/couriers/all').then(function (result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/all',
					method: 'GET',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				expect(result).to.deep.equal(expected_result);
				done();
			});
		});

		it('should work with call(method, path, {body}) with promise', function (done) {
			// Body
			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};
			aftership.call('POST', '/couriers/detect', {
				body: body
			}).then(function (result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/detect',
					body: body,
					method: 'POST',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				expect(result).to.deep.equal(expected_result);
				done();
			});
		});

		it('should work with call(method, path, {body, query})', function (done) {
			let query = {
				fields: 'slug,name'
			};
			aftership.call('GET', '/couriers/all', {
				query: query
			}, function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/all',
					qs: query,
					method: 'GET',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				done();
			});
		});

		it('should work with call(method, path, {raw = true})', function (done) {
			aftership.call('GET', '/couriers/all', {
				raw: true
			}, function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/all',
					method: 'GET',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				expect(_.isString(result)).to.equal(true);
				done();
			});
		});
	});

	describe('Test Proxy method', function () {
		let aftership;
		let expected_result = {
			meta: {
				code: 200
			},
			data: {}
		};
		let mock_req = {
			headers: {
				'x-ratelimit-limit': 999,
				'x-ratelimit-remaining': 999,
				'x-ratelimit-reset': 999
			}
		};

		before(function () {
			// Construct with valid api_key
			aftership = Aftership(api_key);

			// Stub request to throw
			sinon.stub(aftership, 'request', function (options, callback) {
				callback(null, mock_req, expected_result);
			});
		});

		beforeEach(function () {
			aftership.request.reset();
		});

		it('should work with handler.GET(...)', function (done) {
			aftership.GET('/couriers/all', function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/all',
					method: 'GET',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				done();
			});
		});

		it('should work with handler.POST(...)', function (done) {
			// Body
			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};
			aftership.POST('/couriers/detect', {
				body: body
			}, function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/couriers/detect',
					method: 'POST',
					body: body,
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				done();
			});
		});

		it('should work with handler.PUT(...)', function (done) {
			let body = {
				tracking: {
					title: 'Title'
				}
			};

			aftership.PUT('/trackings/dhl/0000000000', {
				body: body
			}, function (err, result) {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/trackings/dhl/0000000000',
					method: 'PUT',
					body: body,
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				done();
			});
		});

		it('should work with handler.DELETE(...)', function (done) {
			aftership.DELETE('/trackings/dhl/0000000000', function () {
				let request_object = {
					headers: {
						'aftership-api-key': api_key,
						'Content-Type': 'application/json',
						'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
					},
					url: 'https://api.aftership.com/v4/trackings/dhl/0000000000',
					method: 'DELETE',
					json: true
				};
				expect(aftership.request.args[0][0]).to.deep.equal(request_object);
				done();
			});
		});
	});

	describe('Test error handling', function () {
		it('should callback with response error, if response code != 200', function (done) {
			let expected_message = 'Invalid API key.';
			let mock_req = {
				headers: {
					'x-ratelimit-limit': 999,
					'x-ratelimit-remaining': 999,
					'x-ratelimit-reset': 999
				}
			};
			let result = {
				meta: {
					code: 401,
					message: 'Invalid API key.',
					type: 'Unauthorized'
				},
				data: {}
			};
			// Construct with invalid api_key
			let aftership = Aftership('');
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(null, mock_req, result);
			});
			aftership.call('GET', '/couriers/all', function (err) {
				expect(err.message).to.equal(expected_message);
				done();
			});
		});

		it('should return promise with response error, if response code != 200', function (done) {
			let expected_message = 'Invalid API key.';
			let mock_req = {
				headers: {
					'x-ratelimit-limit': 999,
					'x-ratelimit-remaining': 999,
					'x-ratelimit-reset': 999
				}
			};
			let result = {
				meta: {
					code: 401,
					message: 'Invalid API key.',
					type: 'Unauthorized'
				},
				data: {}
			};
			// Construct with invalid api_key
			let aftership = Aftership('');
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(null, mock_req, result);
			});
			aftership.call('GET', '/couriers/all').catch(function (err) {
				expect(err.message).to.equal(expected_message);
				done();
			});
		});

		it('should callback with response error, if request throw', function (done) {
			let expected_error = new Error('Some error');
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

		it('should return promise with response error, if request throw', function (done) {
			let expected_error = new Error('Some error');
			let aftership = Aftership(api_key);
			// Stub request to throw
			sandbox.stub(aftership, 'request', function (request_object, callback) {
				callback(expected_error);
			});
			aftership.call('GET', '/couriers/all').catch(function (err) {
				expect(err.message).to.equal(expected_error.message);
				done();
			});
		});

		it('should callback with response error, if method is invalid', function () {
			let method = 'invalid';
			let expected_error = 'HandlerError: Invalid Method value';
			let aftership = Aftership(api_key);
			try {
				aftership.call(method, '/couriers/all', null);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should callback with response error, if path is invalid', function () {
			let expected_error = 'HandlerError: Invalid Path value';
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', null);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should callback with response error, if body is invalid', function () {
			let expected_error = 'HandlerError: Invalid Body value';
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', {
					body: 'body'
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should callback with response error, if query is invalid', function () {
			let expected_error = 'HandlerError: Invalid Query value';
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', {
					query: 'query'
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should callback with response error, if retry is invalid', function () {
			let expected_error = 'HandlerError: Invalid Retry value';
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', {
					retry: 'retry'
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should callback with response error, if raw is invalid', function () {
			let expected_error = 'HandlerError: Invalid Raw value';
			let aftership = Aftership(api_key);
			try {
				aftership.call('GET', '/couriers/all', {
					raw: 'raw'
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});
	});

	describe('Test RateLimit', function () {
		it('should request again until reset timestamp, if return 429 and rate is true', function (done) {
			let now = Math.ceil(Date.now() / 1000);
			let mock_req = {
				headers: {
					'x-ratelimit-limit': 600,
					'x-ratelimit-remaining': 0,
					'x-ratelimit-reset': now + 5
				}
			};
			let mock_result1 = {
				meta: {
					code: 429
				},
				data: {}
			};
			let mock_result2 = {
				meta: {
					code: 200
				},
				data: {}
			};
			// Construct with valid api_key
			let aftership = Aftership(api_key);
			// Stub request to throw
			let request = sandbox.stub(aftership, 'request');
			request.onCall(0).callsArgWith(1, null, mock_req, mock_result1);
			request.onCall(1).callsArgWith(1, null, mock_req, mock_result2);

			aftership.call('GET', '/couriers/all', function (first_err, first_result) {
				let diff = Math.ceil(Date.now() / 1000) - now;
				expect(diff).to.be.gte(5);
				done();
			});
		});

		it('should not request again, if return 429 and rate is false', function (done) {
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
					code: 429
				},
				data: {}
			};
			// Construct with valid api_key
			let aftership = Aftership(api_key, {
				rate: false
			});
			// Stub request to throw
			let request = sandbox.stub(aftership, 'request');
			request.onCall(0).callsArgWith(1, null, mock_req, mock_result);

			aftership.call('GET', '/couriers/all', function (err, result) {
				let diff = Math.ceil(Date.now() / 1000) - now;
				expect(diff).to.be.lte(1);
				expect(err.code).to.equal(mock_result.meta.code);
				done();
			});
		});
	});

	describe('Test retry flag', function () {
		describe('Test retry with Request Error', function () {
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

			it('should retry with call() with default retry = true, if request return ECONNRESET', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				let expected_error = new Error();
				expected_error.code = 'ECONNRESET';
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal('ECONNRESET');
					expect(err.retry_count).to.equal(5);
					done();
				});
			});

			it('should retry with call() with default retry = true, if request return ECONNREFUSED', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				let expected_error = new Error();
				expected_error.code = 'ECONNREFUSED';
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal('ECONNREFUSED');
					expect(err.retry_count).to.equal(5);
					done();
				});
			});

			it('should not retry with call() with retry = false, if request return ECONNREFUSED', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key, {
					retry: false
				});
				let expected_error = new Error();
				expected_error.code = 'ECONNREFUSED';
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(expected_error);
				});
				aftership.call('GET', '/couriers/all', function (err, result) {
					expect(err.type).to.equal('ECONNREFUSED');
					expect(err.retry_count).to.equal(undefined);
					done();
				});
			});
		});

		describe('Test retry with Api Error', function () {
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

			it('should retry with call(..., {retry = true}), if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key, {
					retry: false
				});
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', {
					retry: true
				}, function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(5);
					done();
				});
			});

			it('should not retry with call() with default retry = false, if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key, {
					retry: false
				});
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

			it('should not retry with call(..., {retry = false}), if Aftership return InternalError 500', function (done) {
				// Construct with valid api_key
				let aftership = Aftership(api_key);
				// Stub request to throw
				sandbox.stub(aftership, 'request', function (request_object, callback) {
					callback(null, mock_req, expected_error);
				});
				aftership.call('GET', '/couriers/all', {
					retry: false
				}, function (err, result) {
					expect(err.type).to.equal(expected_error.meta.type);
					expect(err.retry_count).to.equal(undefined);
					done();
				});
			});
		});
	});
});
