# aftership-sdk-node

[![Build Status](https://travis-ci.org/AfterShip/aftership-sdk-nodejs.svg?branch=master)](https://travis-ci.org/AfterShip/aftership-sdk-nodejs)
[![codecov.io](https://codecov.io/github/AfterShip/aftership-sdk-nodejs/coverage.svg?branch=master)](https://codecov.io/github/AfterShip/aftership-sdk-nodejs?branch=master)
[![Dependency Status](https://gemnasium.com/AfterShip/aftership-sdk-nodejs.svg)](https://gemnasium.com/AfterShip/aftership-sdk-nodejs)

[![node](https://img.shields.io/node/v/aftership.svg)]()
[![npm](https://img.shields.io/npm/v/aftership.svg)]()
[![npm](https://img.shields.io/npm/dm/aftership.svg)]()
[![npm](https://img.shields.io/npm/l/aftership.svg)]()

![codecov.io](http://codecov.io/github/AfterShip/aftership-sdk-nodejs/branch.svg?branch=master)

node.js SDK for AfterShip API
## Installation
```
npm install aftership
```

## Quick Start

```javascript
const Aftership = require('aftership')('YOUR_API_KEY');

Aftership.call('GET', '/couriers/all', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});

/** Console
{ meta: { code: 200 },
  data:
   { total: 335,
     couriers:
      [ ... ]
   }
}
*/
```

## Test
```
mocha --recursive
```

## Table of contents

- [Constructor(api_key, options)](#constructorapi_key-options)
- [call(method, path, options, callback)](#callmethod-path-options-callback)
- [Examples](#examples)
	- [/couriers](#couriers)
	- [/trackings](#trackings)
	- [/last_checkpoint](#last_checkpoint)
	- [/notifications](#notifications)
- [Proxy Method](#proxy-method)
- [Error Handling](#error-handling)

## Constructor(api_key, options)

Create AfterShip instance with options

- `api_key` - **Require** - your Aftership API key
- `options` - **Optional** - object of request options
	- `endpoint` - *string*, AfterShip endpoint, default 'https://api.aftership.com/v4'
	- `proxy` - *string*, proxy, default is `null`
	- `retry` - *boolean*, retry if fail? default is `true`

> Retry Policy: Retry after 1 second. Maximum 5 times

Example:
```javascript
// Construct with options
const Aftership = require('aftership')('YOUR_API_KEY', {
	endpoint: 'https://api.aftership.com/OLDER_VERSION',
	proxy: 'http://username:password@my.proxy.com',
	retry: false
});

// Make your call
Aftership.call('GET', '/couriers/all', function (err, result) {
	// ...
});
```

## call(method, path, options, callback)
Make request with option
- `method` - **Require** - Either `get`, `post`, `put` or `delete`, case insensitive
- `path` - **Require** *string*, start with `/`, see available path [here](https://www.aftership.com/docs/)
- `options` - **Optional** - object of request options
	- `body` - *object*, `POST` body
	- `query` - *object*, `query` object
	- `retry` - *boolean*, retry if fail? override `default retry` if set
	- `raw` - *boolean*, if `true`, return result as `string`, else return as `object`, default is `false`
- `callback` - the callback to handle error and result, the result is the response body of the request

## Examples
### /couriers
**GET** /couriers

```javascript
Aftership.call('GET', '/couriers', function (err, result) {
	// Your code here
});
```

**GET** /couriers/all

```javascript
Aftership.call('GET', '/couriers/all', function (err, result) {
	// Your code here
});
```

**POST** /couriers/detect

```javascript
let body = {
	'tracking': {
		'tracking_number': '906587618687',
		'tracking_postal_code': 'DA15BU',
		'tracking_ship_date': '20131231',
		'tracking_account_number': '1234567890',
		'slug': ['dhl', 'ups', 'fedex']
	}
};
Aftership.call('POST', '/couriers', {
	body: body
}, function (err, result) {
	// Your code here
});
```

### /trackings

**POST** /trackings

```javascript
let body = {
    'tracking': {
        'slug': 'dhl',
        'tracking_number': '123456789',
        'title': 'Title Name',
        'smses': [
            '+18555072509',
            '+18555072501'
        ],
        'emails': [
            'email@yourdomain.com',
            'another_email@yourdomain.com'
        ],
        'order_id': 'ID 1234',
        'order_id_path': 'http://www.aftership.com/order_id=1234',
        'custom_fields': {
            'product_name': 'iPhone Case',
            'product_price': 'USD19.99'
        }
    }
};
Aftership.call('POST', '/trackings', {
	body: body
}, function (err, result) {
	// Your code here
});
```

**DELETE** /trackings/:slug/:tracking_number

```javascript
Aftership.call('DELETE', '/trackings/ups/1234567890', function (err, result) {
	// Your code here
});
```

**GET** /trackings

```javascript
let query = {
	slug: 'dhl,ups,usps'
};
Aftership.call('GET', '/trackings', {
	query: query
}, function (err, result) {
	// Your code here
});
```

**GET** /trackings/exports

```javascript
Aftership.call('GET', '/trackings/exports', function (err, result) {
	// Your code here
});
```

**GET** /trackings/:slug/:tracking_number

```javascript
Aftership.call('GET', '/trackings/ups/1234567890', function (err, result) {
	// Your code here
});
```

**GET** /trackings/:slug/:tracking_number

```javascript
let body = {
	'tracking': {
		'title': 'New Title'
	}
};
Aftership.call('PUT', '/trackings/ups/1234567890', {
	body: body
}, function (err, result) {
	// Your code here
});
```

**POST** /trackings/:slug/:tracking_number/retrack

```javascript
Aftership.call('POST', '/trackings/ups/1234567890/retrack', function (err, result) {
	// Your code here
});
```

### /last_checkpoint

**GET** /last_checkpoint/:slug/:tracking_number

```javascript
Aftership.call('GET', '/last_checkpoint/ups/1234567890', function (err, result) {
	// Your code here
});
```

### /notifications

**GET** /notifications/:slug/:tracking_number

```javascript
Aftership.call('GET', '/notifications/ups/1234567890', function (err, result) {
	// Your code here
});
```

**POST** /notifications/:slug/:tracking_number/add

```javascript
let body = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
Aftership.call('POST', '/notifications/ups/1234567890/add', {
	body: body
}, function (err, result) {
	// Your code here
});
```


**POST** /notifications/:slug/:tracking_number/remove

```javascript
let body = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
Aftership.call('POST', '/notifications/ups/1234567890/remove', {
	body: body
}, function (err, result) {
	// Your code here
});
```

## Proxy Method

There are also interface `GET`, `POST`, `PUT`, `DELETE` which are proxy to `Aftership.call(...)`

```javascript
Aftership.call('GET', '/path', options, callback);
// is equivalent to
Aftership.GET('/path', options, callback);

// So as `POST`, `PUT` and `DELETE`
```

## Error Handling

## License
Copyright (c) 2016 AfterShip

Licensed under the MIT license.
