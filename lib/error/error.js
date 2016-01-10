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
	 * @param error_message {string}
	 * @param error_data {object} - The object trigger the error
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
	 * Static Method for getting API error
	 *
	 * @param error_type {object}
	 * @param error_enum {object}
	 * @param error_object {object} - The object trigger the error
	 * @constructor
	 */
	static getApiError(response_body) {
		let payload = {
			type: response_body.meta.type,
			message: response_body.meta.message,
			code: response_body.meta.code,
			data: response_body.data,
			response_body: JSON.stringify(response_body)
		};

		return new AftershipError('API', payload);
	}
}

module.exports = AftershipError;
