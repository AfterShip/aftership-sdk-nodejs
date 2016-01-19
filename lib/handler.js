'use strict';

const RetryLimit = 5;
const RetriableApiError = [429, 500, 502, 503, 504];
const RetriableRequestError = ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED'];
const AftershipError = require('./error/error');

class Handler {
	/**
	 * Function to get the payload and create the request
	 *
	 * @param handler {Handler}
	 * @param payload {object} - The payload object to create the request
	 * @param callback {function}
	 */
	static handlePayload(handler, payload, callback) {
		let timeout = 0;

		// Rate limit
		if (handler.rate_limit.remaining <= 0) {
			timeout = handler.rate_limit.reset - Math.ceil(Date.now() / 1000);
			timeout *= 1000;
		}

		// Handle payload with timeout
		setTimeout(function () {
			handler.request(payload.request_object, function (err, req, body) {
				if (err) {
					if (RetriableRequestError.indexOf(err.code) !== -1) {
						Handler._retryPayload(handler, 'RequestError', payload, err, callback);
					} else {
						callback(err);
					}
				} else {
					handler.rate_limit = {
						limit: Number(req.headers['x-ratelimit-limit']),
						remaining: Number(req.headers['x-ratelimit-remaining']),
						reset: Number(req.headers['x-ratelimit-reset'])
					};

					if (RetriableApiError.indexOf(body.meta.code) !== -1) {
						Handler._retryPayload(handler, 'RetriableError', payload, body, callback);
					} else if (body.meta.code !== 200 && body.meta.code !== 201) {
						// It's an API Error
						callback(AftershipError.getApiError(body));
					} else {
						// Response OK
						callback(null, payload.raw ? JSON.stringify(body) : body);
					}
				}
			});
		}, timeout);
	}

	/**
	 * Function to retry the payload and create the request
	 *
	 * @param type {string} - 'RetriableError' for return API Error / 'ETIMEDOUT' for return ConnectionTimeout
	 * @param payload {object} - The payload object to create the request
	 * @param body {object} - If it is an RetriableError, body is the response body, else is the request error object
	 * @param callback {function}
	 */
	static _retryPayload(handler, type, payload, body, callback) {
		if (payload.retry && payload.retry_count < RetryLimit) {
			// Retry
			payload.retry_count++;
			// let _this = this;
			setTimeout(function () {
				Handler.handlePayload(handler, payload, callback);
			}, 1000);
		} else {
			// Return err if retriable and exceed RetryLimit
			if (type === 'RetriableError') {
				callback(AftershipError.getApiError(body, payload.retry_count));
			} else { // RequestError
				callback(AftershipError.getRequestError(body, payload.request_object, payload.retry_count));
			}
		}
	}
}

module.exports = Handler;
