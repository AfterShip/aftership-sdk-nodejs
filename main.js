/**
 * NodeJS interface for the AfterShip API.
 * From docs here: https://www.aftership.com/docs/api/4.0
 *
 * @author Kirk Morales (kirk@intrakr.com), Bossa (github.com/BossaGroove)
 * @copyright Copyright (C) 2013
 * @license GNU General Public License, version 2 (see LICENSE.md)
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

var transport = require((request_post === 443)?'https':'http');

/**
 * Path for AfterShip API.
 * @type {string}
 * @const
 * @private
 */
var API_PATH = '/v4';

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
	 * Performs an API request.
	 * @param {string} method The HTTP method.
	 * @param {string} path The HTTP path to append to the AfterShip default.
	 * @param {Object} data Body for POST requests.
	 * @param {function(?string, object=)} callback
	 * @private
	 */
	function request(method, path, data, callback) {

		// Make sure path starts with a slash
		if (path.substr(0, 1) !== '/') {
			path = '/' + path;
		}

		data = JSON.stringify(data);

		// console.log(data);

		var asReq = transport.request({
			hostname: request_hostname,
			port: request_post,
			path: API_PATH + path,
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': data.length,
				'aftership-api-key': api_key
			}
		}, function(asRes) {
			var body = '';

			// Capture the response chunks
			asRes.on('data', function(chunk) {
				body += chunk;
			});

			// Called when request is complete
			asRes.on('end', function() {
				try {
					body = JSON.parse(body);

					if (!body || !body.meta) {
						callback('Could not parse response');
						return;
					}

					callback(null, body);
				} catch (e) {
					callback('Could not parse response');
				}
			});
		});

		// Capture any errors
		asReq.on('error', function(e) {
			callback(e.message);
		});

		asReq.write(data);
		asReq.end();
	}

	return {

		/**
		 * create a new tracking_number.
		 * @param {string} tracking_number - The number to track. Default: DHL.
		 * @param {Object|function(string, Array=)} params - Additional options to attach.
		 * @param {function(string, Array=)=} callback - callback function
		 */
		'createTracking': function(tracking_number, params, callback) {

			if (!callback) {
				callback = params;
				params = {};
			}

			if (!_.isString(tracking_number)) {
				callback('Missing Required Parameter: tracking number');
			}

			params.tracking_number = tracking_number;

			request('POST', '/trackings', {tracking: params}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 201) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback('500: Invalid response body');
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
		 * @param {Array|string|function(string, Object=)} fields - Fields to return:
		 * https://www.aftership.com/docs/api/3.0/tracking/get-trackings-slug-tracking_number
		 * @param {function(string, Object=)=} callback - callback function
		 */
		'getTracking': function(slug, tracking_number, fields, callback) {

			if (!callback) {
				callback = fields;
				fields = [];
			}

			if (!_.isString(tracking_number)) {
				callback('Missing Required Parameter: tracking number');
			}

			if (!_.isString(slug)) {
				callback('Missing Required Parameter: tracking number');
			}

			if (Array.isArray(fields)) {
				fields = fields.join(',');
			}

			fields = 'fields=' + fields;

			request('GET', '/trackings/' + slug + '/' + tracking_number + '?' + fields, {}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback('500: Invalid response body');
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
		 * @param {function(string, Object=)=} callback
		 */
		'getTrackings': function(options, callback) {
			if (!callback) {
				callback = options;
				options = {};
			}

			request('GET', '/trackings', options, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data !== 'object') {
					callback('500: Invalid response body');
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
		 * @param {function(string, Object=)} callback
		 */
		'updateTracking': function(slug, tracking_number, options, callback) {
			request('PUT', '/trackings/' + slug + '/' + tracking_number, {tracking: options}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback('500: Invalid response body');
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Delete a specific tracking number.
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {function(string, Object=)} callback
		 */
		'deleteTracking': function(slug, tracking_number, callback) {
			request('DELETE', '/trackings/' + slug + '/' + tracking_number, {}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking !== 'object') {
					callback('500: Invalid response body');
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
		 * @param {Array|string|function(string, Object=)} fields Fields to update: https://www.aftership.com/docs/api/3.0/last_checkpoint
		 * @param {function(string, Object=)} callback
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

			request('GET', '/last_checkpoint/' + slug + '/' + tracking_number + '?' + fields, {}, function(err, body) {

				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.checkpoint || typeof body.data.checkpoint !== 'object') {
					callback('500: Invalid response body');
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Gets all available couriers.
		 * @param {function(string, Object=)} callback
		 */
		'getCouriers': function(callback) {
			request('GET', '/couriers', {}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data !== 'object') {
					callback('500: Invalid response body');
					return;
				}

				callback(null, body.data);
			});
		},


		/**
		 * Detect the courier for given tracking number
		 * @param {string} tracking_number - tracking number to be detected
		 * @param {object|function(string, Object=)} required_fields - optional, hash of required fields
		 * possible values: {"tracking_account_number": "", "tracking_postal_code": "", "tracking_ship_date": ""}
		 * @param {string|function(string, Object=)=} detect_mode - optional, accept "strict" or "tracking_number"
		 * @param {function(string, Object=)=} callback - callback function
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
				tracking_number: tracking_number,
				tracking_account_number: required_fields.tracking_account_number,
				tracking_postal_code: required_fields.tracking_postal_code,
				tracking_ship_date: required_fields.tracking_ship_date,
				detect_mode: detect_mode
			};

			request('POST', '/couriers/detect/', param, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code !== 200) {
					callback(body.meta.code + ': ' + body.meta.message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.couriers || typeof body.data.couriers !== 'object') {
					callback('500: Invalid response body');
					return;
				}

				callback(null, body.data);
			});
		}
	};
};


