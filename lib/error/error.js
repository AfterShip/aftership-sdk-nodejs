'use strict';

const _ = require('lodash');

class AftershipError {
	/**
	 * Static Method for getting REQUEST error
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
	 * Static Method for getting SDK error
	 *
	 * @param error_enum {object}
	 * @param error_data {object} - The object trigger the error
	 * @param retry_count {number}
	 * @constructor
	 */
	static getSdkError(error_enum, error_data) {
		let error = new Error();
		error.type = error_enum.type;
		error.message = error_enum.message;
		error.data = error_data;
		Error.captureStackTrace(error);

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
		let error = new Error();
		error.type = response_body.meta.type;
		error.message = response_body.meta.message;
		error.code = response_body.meta.code;
		error.data = response_body.data;
		error.response_body = JSON.stringify(response_body);

		if (retry_count) {
			error.retry_count = retry_count;
		}

		return error;
	}
}

module.exports = AftershipError;
