'use strict';

const _ = require('lodash');

class AftershipError extends Error {
	/**
	 * Constructor of Error object
	 *
	 * @param source {string} Source of error, 'API' / 'SDK'
	 * @param payload {object}
	 * @constructor
	 */
	constructor(source, payload) {
		super();

		if (source === 'SDK') {
			Error.captureStackTrace(this, this.constructor);
		}

		for (let key in payload) {
			if (payload.hasOwnProperty(key)) {
				this[key] = payload[key];
			}
		}
	}

	/**
	 * Static Method for getting SDK error
	 *
	 * @param error_enum {object}
	 * @param error_data {object} - The object trigger the error
	 * @param retry_count {number}
	 * @constructor
	 */
	static getSdkError(error_enum, error_data) {
		let payload = {
			type: error_enum.type,
			message: error_enum.message,
			data: error_data
		};

		return new AftershipError('SDK', payload);
	}

	/**
	 * Static Method for getting SDK error
	 *
	 * @param error_enum {object}
	 * @param error_data {object} - The object trigger the error
	 * @param retry_count {number}
	 * @constructor
	 */
	static getRequestError(error, error_data, retry_count) {
		error.data = error_data;
		error.type = error.code;

		if (retry_count) {
			error.retry_count = retry_count;
		}

		return error;
	}

	/**
	 * Static Method for getting API error
	 *
	 * @param response_body {object}
	 * @param retry_count {number}
	 * @constructor
	 */
	static getApiError(response_body, retry_count) {
		let payload = {
			type: response_body.meta.type,
			message: response_body.meta.message,
			code: response_body.meta.code,
			data: response_body.data,
			response_body: JSON.stringify(response_body)
		};

		if (retry_count) {
			payload.retry_count = retry_count;
		}

		return new AftershipError('API', payload);
	}
}

module.exports = AftershipError;
