/**
 * NodeJS interface for the AfterShip API.
 * From docs here: https://www.aftership.com/docs/api/3.0
 *
 * @author Kirk Morales (kirk@intrakr.com)
 * @copyright Copyright (C) 2013
 * @license GNU General Public License, version 2 (see LICENSE.md)
 */


var https = require('https'),
	_ = require('underscore');

/**
 * Hostname for AfterShip API.
 * @type {string}
 * @const
 * @private
 */
var REQUEST_HOSTNAME = 'api.aftership.com';

/**
 * Path for AfterShip API.
 * @type {string}
 * @const
 * @private
 */
var API_PATH = '/v3';

/**
 * Initializes the AfterShip plugin.
 * @param {string} key
 * @return {Object.<string,function>}
 */
module.exports = function(key) {
	// Require API key
	if (!key) {
		return;
	}
	var apiKey = key;


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
		if (path.substr(0, 1) != '/') {
			path = '/' + path;
		}

		data = JSON.stringify(data);

		// console.log(data);

		var asReq = https.request({
			hostname: REQUEST_HOSTNAME,
			path: API_PATH + path,
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': data.length,
				'aftership-api-key': apiKey
			}
		}, function(asRes) {
			var body = '';

			// Capture the response chunks
			asRes.on('data', function(chunk) {
				body += chunk;
			});

			// Called when request is complete
			asRes.on('end', function() {
				body = JSON.parse(body);

				if (!body || !body.meta) {
					callback('Could not parse response');
					return;
				}

				callback(null, body);
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
		 * @param {string} tracking_number The number to track. Default: DHL.
		 * @param {Object=} options Additional options to attach.
		 * @param {function(?string, string=, Array=)} callback
		 */
		'createTracking': function(tracking_number, options, callback) {

			options = options || {};

			if (!tracking_number) {
				return 'Missing Required Parameter: tracking number';
			}

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			options.tracking_number = tracking_number;

			request('POST', '/trackings', {tracking: options}, function(err, body) {
				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code != 201) {
					callback(body.meta.code + ': ' + body.meta.error_message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
					callback('Invalid response body');
					return;
				}

				// Check that it was activated
				if (!body.data.tracking.active) {
					callback('Tracking not active');
					return;
				}

				// Return the tracking number and data
				callback(null, body.data);
			});
		},


		/**
		 * Tracks a specific tracking number.
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {Array|string} fields Fields to return: https://www.aftership.com/docs/api/3.0/tracking/get-trackings-slug-tracking_number
		 * @param {function(?string, Object=)} callback
		 */
		'tracking': function(slug, tracking_number, fields, callback) {

			if (!slug) {
				return 'Missing Required Parameter: slug';
			}

			if (!tracking_number) {
				return 'Missing Required Parameter: tracking number';
			}

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			// Default to all fields if none are provided
			fields = fields || [];
			if (_.isArray(fields)) {
				fields = fields.join(',');
			}

			request('GET', '/trackings/' + slug + '/' + tracking_number,
				{fields: fields}, function(err, body) {

					if (err) {
						callback(err);
						return;
					}

					// Check for valid meta code
					if (!body.meta || !body.meta.code || body.meta.code != 200) {
						callback(body.meta.code + ': ' + body.meta.error_message, body.data);
						return;
					}

					// Check for valid data contents
					if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
						callback('Invalid response body');
						return;
					}

					// Return the time and checkpoints
					callback(null, body.data);
				});
		},
		/**
		 * Gets all trackings in account.
		 * @param {object} options Defined here: https://www.aftership.com/docs/api/3.0/tracking/get-trackings
		 * @param {function(?string, Object=)} callback
		 */
		'trackings': function(options, callback) {

			options = options || {};

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			request('GET', '/trackings', options, function(err, body) {

				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code != 200) {
					callback(body.meta.code + ': ' + body.meta.error_message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data != 'object') {
					callback('Invalid response body');
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
		 * @param {function(?string, Object=)} callback
		 */
		'updateTracking': function(slug, tracking_number, options, callback) {

			options = options || {};

			if (!slug) {
				return 'Missing Required Parameter: slug';
			}

			if (!tracking_number) {
				return 'Missing Required Parameter: tracking number';
			}

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			request('PUT', '/trackings/' + slug + '/' + tracking_number,
				{tracking: options}, function(err, body) {

					if (err) {
						callback(err);
						return;
					}

					// Check for valid meta code
					if (!body.meta || !body.meta.code || body.meta.code != 200) {
						callback(body.meta.code + ': ' + body.meta.error_message, body.data);
						return;
					}

					// Check for valid data contents
					if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
						callback('Invalid response body');
						return;
					}

					callback(null, body.data);
				});
		},


		/**
		 * Delete a specific tracking number.
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {Array|string} fields Fields to return: https://www.aftership.com/docs/api/3.0/tracking/get-trackings-slug-tracking_number
		 * @param {function(?string, Object=)} callback
		 */
		'deleteTracking': function(slug, tracking_number, callback) {

			if (!slug) {
				return 'Missing Required Parameter: slug';
			}

			if (!tracking_number) {
				return 'Missing Required Parameter: tracking number';
			}

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			request('DELETE', '/trackings/' + slug + '/' + tracking_number,
				{}, function(err, body) {

					if (err) {
						callback(err);
						return;
					}

					// Check for valid meta code
					if (!body.meta || !body.meta.code || body.meta.code != 200) {
						callback(body.meta.code + ': ' + body.meta.error_message, body.data);
						return;
					}

					// Check for valid data contents
					if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
						callback('Invalid response body');
						return;
					}

					// Return the tracking number and slug
					callback(null, body.data);
				});
		},


		/**
		 * Gets all available couriers.
		 * @param {function(?string, Object=)} callback
		 */
		'couriers': function(callback) {

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			request('GET', '/couriers', {}, function(err, body) {

				if (err) {
					callback(err);
					return;
				}

				// Check for valid meta code
				if (!body.meta || !body.meta.code || body.meta.code != 200) {
					callback(body.meta.code + ': ' + body.meta.error_message, body.data);
					return;
				}

				// Check for valid data contents
				if (!body.data || typeof body.data != 'object') {
					callback('Invalid response body');
					return;
				}

				callback(null, body.data);
			});
		},

		/**
		 * Get the last checkpoint information of a tracking number
		 * @param {string} slug
		 * @param {string} tracking_number
		 * @param {Array|string} fields Fields to update: https://www.aftership.com/docs/api/3.0/last_checkpoint
		 * @param {function(?string, Object=)} callback
		 */
		'last_checkpoint': function(slug, tracking_number, fields, callback) {

			if (!slug) {
				return 'Missing Required Parameter: slug';
			}

			if (!tracking_number) {
				return 'Missing Required Parameter: tracking number';
			}

			if (!_.isFunction(callback)) {
				return 'Missing Required Parameter: callback';
			}

			fields = fields || [];
			if (Array.isArray(fields)) {
				fields = fields.join(',');
			}

			request('GET', '/last_checkpoint/' + slug + '/' + tracking_number,
				{fields: fields}, function(err, body) {

					if (err) {
						callback(err);
						return;
					}

					// Check for valid meta code
					if (!body.meta || !body.meta.code || body.meta.code != 200) {
						callback(body.meta.code + ': ' + body.meta.error_message, body.data);
						return;
					}

					// Check for valid data contents
					if (!body.data || !body.data.checkpoint || typeof body.data.checkpoint != 'object') {
						callback('Invalid response body');
						return;
					}

					callback(null, body.data);
				});
		}
	};
};


