'use strict';

// Declare imports
const _ = require('lodash');
const AftershipError = require('./error/error');

// Global variable
const RetryLimit = 5;
const UnauthorizedError = 401;
const TooManyRequestError = 429;
const RetriableApiError = [500, 502, 503, 504];
const RetriableRequestError = ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED'];
const ErrorEnum = require('./error/error_enum');

// Handler class
class Handler {
	/**
	 * Function to get the payload and create the request
	 *
	 * @param aftership {Aftership} - the aftership object
	 * @param payload {object} - The payload object to create the request
	 * @param callback {function}
	 */
	static handlePayload(aftership, payload, callback) {
		aftership.request(payload.request_object, function (err, response, body) {
			if (err) {
				// If request return err
				if (RetriableRequestError.indexOf(err.code) !== -1) {
					// Retry if err is retriable
					Handler._retryRequestError(aftership, payload, err, callback);
				} else {
					// Return err if not retriable
					callback(err);
				}
			} else {
				if (_.isString(body)) {
					// Non json response, throw error
					let internal_error = {
						meta: _.cloneDeep(ErrorEnum.InternalError)
					};
					internal_error.meta.code = 500;
					internal_error.data = payload.request_object.body || {};
					Handler._retryApiError(aftership, payload, internal_error, callback);
				} else {
					// check http status code
					if (response.statusCode !== UnauthorizedError) {
						// Not UnauthorizedError
						// Set rate_limit
						aftership.rate_limit[payload.request_object.headers['aftership-api-key']] = {
							limit: Number(response.headers['x-ratelimit-limit']),
							remaining: Number(response.headers['x-ratelimit-remaining']),
							reset: Number(response.headers['x-ratelimit-reset'])
						};
					}

					if (response.statusCode === TooManyRequestError) {
						// Retry if err is TooManyRequestError
						Handler._retryTooManyRequestError(aftership, payload, body, callback);
					} else if (RetriableApiError.indexOf(response.statusCode) !== -1) {
						// Retry if err is RetriableApiError
						Handler._retryApiError(aftership, payload, body, callback);
					} else if (response.statusCode !== 200 && response.statusCode !== 201) {
						// Return err if it is not OK response
						callback(AftershipError.getApiError(body));
					} else {
						// Response OK
						if (payload.raw) {
							// If raw is true, response string
							callback(null, JSON.stringify(body));
						} else {
							// Else response Object
							callback(null, body);
						}
					}
				}
			}
		});
	}

	/**
	 * Function to retry request error
	 *
	 * @param aftership {aftership}
	 * @param payload {object} - The payload object to create the request
	 * @param err {error} - the error object request return
	 * @param callback {function}
	 */
	static _retryRequestError(aftership, payload, err, callback) {
		// If retry is true && retry_count < 5
		if (payload.retry && payload.retry_count < RetryLimit) {
			// Increase retry_count
			payload.retry_count++;
			// Retry after 1s
			setTimeout(function () {
				Handler.handlePayload(aftership, payload, callback);
			}, 1000);
		} else {
			// Return err
			callback(AftershipError.getRequestError(err, payload.request_object, payload.retry_count));
		}
	}

	/**
	 * Function to retry 429 too many request error
	 *
	 * @param aftership {aftership}
	 * @param payload {object} - The payload object to create the request
	 * @param body {object} - If it is an RetriableError, body is the response body, else is the request error object
	 * @param callback {function}
	 */
	static _retryTooManyRequestError(aftership, payload, body, callback) {
		// If aftership.rate is true
		if (aftership.rate) {
			let timeout = aftership.rate_limit[payload.request_object.headers['aftership-api-key']].reset - Math.ceil(Date.now() / 1000);
			timeout *= 1000;

			// Retry after 1s
			setTimeout(function () {
				Handler.handlePayload(aftership, payload, callback);
			}, timeout);
		} else {
			// Return err
			callback(AftershipError.getApiError(body, payload.retry_count));
		}
	}

	/**
	 * Function to retry API error (code >= 500)
	 *
	 * @param aftership {aftership}
	 * @param payload {object} - The payload object to create the request
	 * @param body {object} - If it is an RetriableError, body is the response body, else is the request error object
	 * @param callback {function}
	 */
	static _retryApiError(aftership, payload, body, callback) {
		// If retry is true && retry_count < 5
		if (payload.retry && payload.retry_count < RetryLimit) {
			// Increase retry_count
			payload.retry_count++;
			// Retry after 1s
			setTimeout(function () {
				Handler.handlePayload(aftership, payload, callback);
			}, 1000);
		} else {
			// Return err
			callback(AftershipError.getApiError(body, payload.retry_count));
		}
	}
}

module.exports = Handler;
