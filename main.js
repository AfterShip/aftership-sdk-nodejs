/**
 * NodeJS interface for the AfterShip API.
 * From docs here: https://www.aftership.com/docs/api/4.0
 *
 * @author Kirk Morales (kirk@intrakr.com), Bossa (github.com/BossaGroove)
 * @copyright Copyright (C) 2013
 * @license GNU General Public License, version 2 (see LICENSE.md)
 */


/**
 *
 * Error Type
 * 600, 'UnhandledError'
 * 601, 'ParseResponseError', 'Could not parse response.'
 * 602, 'MissingParameter', 'Missing Required Parameter: tracking number.'
 * 603, 'ResponseError', 'Invalid response body.'
 */

var _ = require('lodash');

/**
 * Hostname for AfterShip API.
 * @type {string}
 * @private
 */
var request_hostname = process.env.AFTERSHIP_NODEJS_SDK_HOST || 'api.aftership.com';

/**
 * Port for AfterShip API.
 * @type {number}
 * @private
 */
var request_post = process.env.AFTERSHIP_NODEJS_SDK_PORT || 443;

var protocol = ((request_post === 443) ? 'https' : 'http');

var request = require('request');

/**
 * Path for AfterShip API.
 * @type {string}
 * @const
 * @private
 */
var API_PATH = '/v4';

/**
 * timeout of each request in milliseconds
 * @const
 * @type {number}
 */
var TIMEOUT = 30000;

/**
 * Initializes the AfterShip plugin.
 * @param {string} api_key - AfterShip api key
 * @return {Object.<string,function>}
 */
module.exports = function(api_key) {
	'use strict';

	// Require API key
	if (!api_key) {
		return {};
	}


	/**
	 * Return the error object for callback use
	 * @param code {!number} - meta.code
	 * @param type  {!string}- meta.type
	 * @param message {!string} - meta.message
	 * @returns {{code: *, type: *, message: *}}
	 * @private
	 */
	function _getError(code, type, message) {
		return {
			code: code,
			type: type,
			message: message
		}
	}


	/**
	 * Performs an API request.
	 * @param method {string} - method The HTTP method.
	 * @param path {string} - path The HTTP path to append to the AfterShip default.
	 * @param data {Object} - data Body for POST requests.
	 * @param callback {function(?Object, ?Object)} - callback
	 * @private
	 */
	function _call(method, path, data, callback) {

		// Make sure path starts with a slash
		if (path.substr(0, 1) !== '/') {
			path = '/' + path;
		}

		data = JSON.stringify(data);

		// console.log(data);

		var request_option = {
			url: protocol + '://' + request_hostname + ':' + request_post + API_PATH + path,
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'aftership-api-key': api_key
			},
			timeout: TIMEOUT,
			body: data
		};

		request(request_option, function(err, response, body) {
			try {
				body = JSON.parse(body);

				if (!body || !body.meta) {
					callback(_getError(601, 'ParseResponseError', 'Could not parse response.'), null);
				} else {
					callback(null, body);
				}
			} catch (e) {
				//console.log(e.stack);
				callback(_getError(601, 'ParseResponseError', 'Could not parse response.'), null);
			}
		});
	}

	return {



		/**
		 * Create a new tracking_number
		 * @param {string} tracking_number - The tracking number to track.
		 * @param {Object=} params - Additional options to attach.
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'createTracking': function(tracking_number, params, callback) {

			if (!callback) {
				callback = params;
				params = {};
			}

			if (!_.isString(tracking_number)) {
				callback(_getError(602, 'MissingParameter', 'Missing Required Parameter: tracking number.'));
			}

			params.tracking_number = tracking_number;

			_call('POST', '/trackings', {tracking: params}, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (!(body.meta.code === 201 || body.meta.code === 202)) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				// Return the tracking number and data
				callback(null, body.data);
			});
		},


		/**
		 * Get a tracking number
		 * @param {string} slug - slug of the tracking number
		 * @param {string} tracking_number    - number to get
		 * @param {Array|string|function(?Object, ?Object)} fields - Fields to return:
		 * https://www.aftership.com/docs/api/3.0/tracking/get-trackings-slug-tracking_number
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'getTracking': function(slug, tracking_number, fields, callback) {

			if (!callback) {
				callback = fields;
				fields = [];
			}

			if (!_.isString(tracking_number)) {
				callback(_getError(602, 'MissingParameter', 'Missing Required Parameter: tracking number.'));
			}

			if (!_.isString(slug)) {
				callback(_getError(602, 'MissingParameter', 'Missing Required Parameter: tracking number.'));
			}

			if (Array.isArray(fields)) {
				fields = fields.join(',');
			}

			fields = 'fields=' + fields;

			_call('GET', '/trackings/' + slug + '/' + tracking_number + '?' + fields, {}, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				// Return the time and checkpoints
				callback(null, body.data);
			});

			return null;
		},

		/**
		 * Gets all tracking numbers in account.
		 * @param {Object|function} options - Defined here:
		 * https://www.aftership.com/docs/api/3.0/tracking/get-trackings
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'getTrackings': function(options, callback) {
			if (!callback) {
				callback = options;
				options = {};
			}

			_call('GET', '/trackings', options, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				// Return the time and checkpoints
				callback(null, body.data);
			});
		},


		/**
		 * Updates the tracking for an existing number
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {Array} options Fields to update:
		 *  https://www.aftership.com/docs/api/3.0/tracking/put-trackings-slug-tracking_number
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'updateTracking': function(slug, tracking_number, options, callback) {
			_call('PUT', '/trackings/' + slug + '/' + tracking_number, {tracking: options}, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta, null);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Delete a specific tracking number.
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'deleteTracking': function(slug, tracking_number, callback) {
			_call('DELETE', '/trackings/' + slug + '/' + tracking_number, {}, function(err, body) {

				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				// Return the tracking number and slug
				callback(null, body.data);
			});
		},


		/**
		 * Get the last checkpoint information of a tracking number
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {Array|string|function(?Object, ?Object)} fields Fields to update: https://www.aftership.com/docs/api/3.0/last_checkpoint
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'getLastCheckpoint': function(slug, tracking_number, fields, callback) {

			if (!callback) {
				callback = fields;
				fields = [];
			}

			if (Array.isArray(fields)) {
				fields = fields.join(',');
			}

			fields = 'fields=' + fields;

			_call('GET', '/last_checkpoint/' + slug + '/' + tracking_number + '?' + fields, {}, function(err, body) {

				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.checkpoint || typeof body.data.checkpoint !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Gets all available couriers.
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'getCouriers': function(callback) {
			_call('GET', '/couriers', {}, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Detect the courier for given tracking number
		 * @param {string} tracking_number - tracking number to be detected
		 * @param {Object|function(?Object, ?Object)} required_fields - optional, hash of required fields
		 * possible values: {"tracking_account_number": "", "tracking_postal_code": "", "tracking_ship_date": ""}
		 * @param {string|function(?Object, ?Object)=} detect_mode - optional, accept "strict" or "tracking_number"
		 * @param {function(?Object, ?Object)} callback - callback function
		 */
		'detectCouriers': function(tracking_number, required_fields, detect_mode, callback) {
			if (!callback) {
				callback = detect_mode;
				detect_mode = 'tracking_number';
			}

			if (!callback) {
				callback = required_fields;
				required_fields = {};
			}

			var param = {
				tracking: {
					tracking_number: tracking_number,
					tracking_account_number: required_fields.tracking_account_number,
					tracking_postal_code: required_fields.tracking_postal_code,
					tracking_ship_date: required_fields.tracking_ship_date,
					detect_mode: detect_mode
				}
			};

			_call('POST', '/couriers/detect/', param, function(err, body) {
				if (err) {
					callback(err, null);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code) {
					callback(body.meta, null);
					return;
				}

				if (body.meta.code !== 200) {
					callback(body.meta, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.couriers || typeof body.data.couriers !== 'object') {
					callback(_getError(603, 'ResponseError', 'Invalid response body.'));
					return;
				}

				callback(null, body.data);
			});
		}

	};
};


