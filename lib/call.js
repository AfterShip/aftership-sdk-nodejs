'use strict';

let request = require('request');

let call = function(aftership) {
    return function(method, path, callback) {
        request({
            method: method,
            url: `${aftership.endpoint}${path}`,
            headers: {
                'aftership-api-key': aftership.api_key,
                'content-type': 'application/json',
                'x-aftership-agent': 'LANGUAGE-sdk-VERSION'
            }
        }, callback);
    }
}

module.exports = call;
