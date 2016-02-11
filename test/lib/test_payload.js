'use strict';

const api_key = 'SOME_API_KEY'; // please use your AfterShip api key

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
const Payload = require('./../../lib/payload');
const Aftership = require('./../../index');

describe('Test Payload constructor', function () {
	describe('Test error handling', function () {
		it('should throw HandlerInvalidMethod, if method is not `GET`, `POST`, `DELETE`, `PUT`', function () {
			let expected_error = 'HandlerError: Invalid Method value';
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, '');
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Payload(aftership, null);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Payload(aftership, 999);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Payload(aftership, true);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				Payload(aftership, {});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should throw HandlerInvalidPath, if path is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Path value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', null);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', 999);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', true);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', {});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidOptions, if options is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Options value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', '');
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', 999);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', true);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', false);
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidBody, if body is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Body value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', {
					body: ''
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					body: 999
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					body: true
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					body: false
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidQuery, if query is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Query value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', {
					query: ''
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					query: 999
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					query: true
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					query: false
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidRetry, if retry is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Retry value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', {
					retry: ''
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					retry: 999
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					retry: {}
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidRaw, if retry is invalid', function () {
			let expected_error = Error('HandlerError: Invalid Raw value');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', {
					raw: ''
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					raw: 999
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					raw: {}
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});

		it('should throw HandlerInvalidApiKey, if api_key is invalid', function () {
			let expected_error = Error('HandlerError: Invalid API key');
			let aftership = Aftership(api_key);
			try {
				Payload(aftership, 'GET', '', {
					api_key: ''
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					api_key: 999
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					api_key: null
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
			try {
				Payload(aftership, 'GET', '', {
					api_key: true
				});
			} catch (e) {
				expect(e.message).to.equal(expected_error.message);
			}
		});
	});

	describe('Test Correct cases', function () {
		describe('Test Request Object', function () {
			it('should set correct headers', function () {
				let aftership = Aftership(api_key);
				let result = Payload(aftership, 'GET', '');
				let headers = {
					'aftership-api-key': api_key,
					'Content-Type': 'application/json',
					'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
				};
				expect(result.request_object.headers).to.deep.equal(headers);
			});

			it('should set correct url', function () {
				let aftership = Aftership(api_key);
				let result1 = Payload(aftership, 'GET', '/aaa/bbb');
				expect(result1.request_object.url).to.equal(aftership.endpoint + '/aaa/bbb');

				aftership.endpoint = 'http://example.com';
				let result2 = Payload(aftership, 'GET', '/ccc/ddd');
				expect(result2.request_object.url).to.equal(aftership.endpoint + '/ccc/ddd');
			});

			it('should set correct retry value', function () {
				// Default to true
				let aftership = Aftership(api_key, {
					retry: true
				});

				// Equal to default retry
				let result1 = Payload(aftership, 'GET', '');
				expect(result1.retry).to.equal(true);

				// Overwrite default retry
				let result2 = Payload(aftership, 'GET', '', {
					retry: false
				});
				expect(result2.retry).to.equal(false);

				// Default to false
				aftership = Aftership(api_key, {
					retry: false
				});

				// Equal to default retry
				let result3 = Payload(aftership, 'GET', '');
				expect(result3.retry).to.equal(false);

				// Overwrite default retry
				let result4 = Payload(aftership, 'GET', '', {
					retry: true
				});
				expect(result4.retry).to.equal(true);
			});

			it('should set correct raw value', function () {
				// Default is false
				let aftership = Aftership(api_key);

				// Equal to default, false
				let result1 = Payload(aftership, 'GET', '');
				expect(result1.raw).to.equal(false);

				// Overwrite default raw, to true
				let result2 = Payload(aftership, 'GET', '', {
					raw: true
				});
				expect(result2.raw).to.equal(true);

				// Overwrite default raw, still false
				let result3 = Payload(aftership, 'GET', '', {
					raw: false
				});
				expect(result3.raw).to.equal(false);
			});

			it('should have retry count, if retry = true', function () {
				// Default to true
				let aftership = Aftership(api_key, {
					retry: true
				});

				// Retry count = 0
				let result1 = Payload(aftership, 'GET', '');
				expect(result1.retry_count).to.equal(0);

				// Default to false
				aftership = Aftership(api_key, {
					retry: false
				});

				// Retry count is undefined
				let result2 = Payload(aftership, 'GET', '');
				expect(result2.retry_count).to.equal(undefined);
			});

			it('should override default api_key, if api_key is defined', function () {
				// Default to true
				let aftership = Aftership(api_key);

				let other_api_key = 'OTHER_API_KEY';
				let result = Payload(aftership, 'GET', '', {
					api_key: other_api_key
				});
				expect(result.request_object.headers['aftership-api-key']).to.equal(other_api_key);
			});
		});
	});
});
