/**
 * NodeJS interface for the AfterShip API.
 * From docs here: https://www.aftership.com/docs/api/3.0
 * 
 * @author Kirk Morales (kirk@intrakr.com)
 * @copyright Copyright (C) 2013
 * @license GNU General Public License, version 2 (see LICENSE.md)
 */

"use strict";

var https = require('https');

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
  if (!key) return;
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
    if (path.substr(0,1) != '/') path = '/' + path;

    data = JSON.stringify(data);

    // console.log(data);

    var asReq = https.request({
      hostname: REQUEST_HOSTNAME,
      path:     API_PATH + path,
      method:   method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'aftership-api-key': apiKey
      }
    }, function(asRes) {
      var body = '';

      // Capture the response chunks
      asRes.on('data', function (chunk) {
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
    asReq.on('error', function(e) { callback(e.message); });

    asReq.write(data);
    asReq.end();
  }

  return {

    /**
     * Starts tracking a new number.
     * @param {string} trackingNumber The number to track. Default: DHL.
     * @param {Object=} options Additional options to attach.
     * @param {function(?string, string=, Array=)} callback
     */
    'startTracking': function(trackingNumber, options, callback) {

      options = options || {};

      if (!trackingNumber) {
        return 'Missing Required Parameter: tracking number';
      }

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      options.tracking_number = trackingNumber;

      request('POST', '/trackings', {tracking: options}, function(err, body) {
        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 201) {
          callback(body.meta.code + ': ' + body.meta.error_message);
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
        callback(null, body.data.tracking.tracking_number, body.data.tracking);
      });
    },

    /**
     * Tracks a specific tracking number.
     * @param {string} slug
     * @param {string} trackingNumber
     * @param {Array|string} fields Fields to return: https://www.aftership.com/docs/api/3.0/tracking/get-trackings-slug-tracking_number
     * @param {function(?string, Object=)} callback
     */
    'track': function(slug, trackingNumber, fields, callback) {

      if (!slug) {
        return 'Missing Required Parameter: slug';
      }

      if (!trackingNumber) {
        return 'Missing Required Parameter: tracking number';
      }

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      // Default to all fields if none are provided
      fields = fields || [];
      if (Array.isArray(fields)) fields = fields.join(',');

      request('GET', '/trackings/' + slug + '/' + trackingNumber, 
          {fields: fields}, function(err, body) {

        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 200) {
          callback(body.meta.code + ': ' + body.meta.error_message);
          return;
        }

        // Check for valid data contents
        if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
          callback('Invalid response body');
          return;
        }

        // Return the time and checkpoints
        callback(null, body.data.tracking);
      });
    },

    /**
     * Updates the tracking for an existing number
     * @param {string} slug
     * @param {string} trackingNumber
     * @param {Array} options Fields to update:
     *  https://www.aftership.com/docs/api/3.0/tracking/put-trackings-slug-tracking_number
     * @param {function(?string, Object=)} callback
     */
    'updateTracking': function(slug, trackingNumber, options, callback) {

      if (!slug) {
        return 'Missing Required Parameter: slug';
      }

      if (!trackingNumber) {
        return 'Missing Required Parameter: tracking number';
      }

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      options = options || {};

      request('PUT', '/trackings/' + slug + '/' + trackingNumber, 
          {tracking: options}, function(err, body) {

        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 200) {
          callback(body.meta.code + ': ' + body.meta.error_message);
          return;
        }

        // Check for valid data contents
        if (!body.data || !body.data.tracking || typeof body.data.tracking != 'object') {
          callback('Invalid response body');
          return;
        }

        callback(null, body.data.tracking);
      });
    },

    /**
     * Gets all trackings in account.
     * @param {object} options Defined here: https://www.aftership.com/docs/api/3.0/tracking/get-trackings
     * @param {function(?string, Object=)} callback
     */
    'trackings': function(options, callback) {

      options = options || {};

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      request('GET', '/trackings', options, function(err, body) {

        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 200) {
          callback(body.meta.code + ': ' + body.meta.error_message);
          return;
        }

        // Check for valid data contents
        if (!body.data || typeof body.data != 'object') {
          callback('Invalid response body');
          return;
        }

        var trackings = body.data.trackings;
        delete body.data.trackings;

        // Return the time and checkpoints
        callback(null, body.data, trackings);
      });
    },

    /**
     * Gets all available couriers.
     * @param {function(?string, Object=)} callback
     */
    'couriers': function(callback) {

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      request('GET', '/couriers', {}, function(err, body) {

        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 200) {
          callback(body.meta.code + ': ' + body.meta.error_message);
          return;
        }

        // Check for valid data contents
        if (!body.data || typeof body.data != 'object') {
          callback('Invalid response body');
          return;
        }

        callback(null, body.data.total, body.data.couriers);
      });
    },

    /**
     * Updates the tracking for an existing number
     * @param {string} slug
     * @param {string} trackingNumber
     * @param {Array|string} fields Fields to update: https://www.aftership.com/docs/api/3.0/last_checkpoint
     * @param {function(?string, Object=)} callback
     */
    'checkpoint': function(slug, trackingNumber, fields, callback) {

      if (!slug) {
        return 'Missing Required Parameter: slug';
      }

      if (!trackingNumber) {
        return 'Missing Required Parameter: tracking number';
      }

      if (typeof callback != 'function') {
        return 'Missing Required Parameter: callback';
      }

      fields = fields || [];
      if (Array.isArray(fields)) fields = fields.join(',');

      request('GET', '/last_checkpoint/' + slug + '/' + trackingNumber, 
          {fields: fields}, function(err, body) {

        if (err) {
          callback(err);
          return;
        }

        // Check for valid meta code
        if (!body.meta || !body.meta.code || body.meta.code != 200) {
          callback(body.meta.code + ': ' + body.meta.error_message);
          return;
        }

        // Check for valid data contents
        if (!body.data || !body.data.checkpoint || typeof body.data.checkpoint != 'object') {
          callback('Invalid response body');
          return;
        }

        callback(null, body.data.tag, body.data.checkpoint);
      });
    }
  };
};


