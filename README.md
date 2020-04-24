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
> It could be used on both client and server side.

## Installation
```
npm install aftership
```

## Quick Start

```javascript
const { AfterShip } = require('aftership');
const aftership = new AfterShip('YOUR_API_KEY');

aftership.courier.listAllCouriers()
  .then(result => console.log(result))
  .catch(err => console.log(err));


/** Console
  { total: 335,
    couriers:
     [ ... ]
  }
*/
```

## Test
```
npm run test
```

## Table of contents

- [Constructor(api_key[, options])](#constructorapi_key-options)
- [Endpoints](#endpoints)
- [Rate Limiter](#rate-limiter)
- [Error Handling](#error-handling)
- [Examples](#examples)
	- [/couriers](#couriers)
	- [/trackings](#trackings)
	- [/last_checkpoint](#last_checkpoint)
	- [/notifications](#notifications)
- [Migrations](#migrations)
- [Change log](#change-log)


## Constructor(api_key[, options])

Create AfterShip instance with options

- `api_key` - **Require** - your Aftership API key
- `options` - **Optional** - object of request options
	- `endpoint` - *string*, AfterShip endpoint, default 'https://api.aftership.com/v4'
	- `user_agent_prefix` - *string*, prefix of User-Agent in headers, default 'aftership-sdk-nodejs'


Example:
```javascript
// Construct with options
const aftership = new AfterShip('YOUR_API_KEY', {
	endpoint: 'https://api.aftership.com/OLDER_VERSION'
});
```

## Endpoints

The AfterShip instance has the following properties which are exactly the same as the API endpoins:

- `courier` - Get a list of our supported couriers.
- `tracking` - Create trackings, update trackings, and get tracking results.
- `last_checkpoint` - Get tracking information of the last checkpoint of a tracking.
- `notification` - Get, add or remove contacts (sms or email) to be notified when the status of a tracking has changed.

Make request in a specific endpoint

```javascript
// GET /trackings/:slug/:tracking_number
aftership.tracking
  .getTracking({
    slug: "ups",
    tracking_number: "1234567890",
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));
```


## Rate Limiter

To understand AfterShip rate limit policy, please see `limit` session in https://www.aftership.com/docs/api/4

You can get the recent rate limit by `aftership.rate_limit`. Initially all value are `null`.
```javascript
const { AfterShip } = require('aftership');
const aftership = new AfterShip('YOUR_API_KEY');

console.log(aftership.rate_limit);

// console output
// { reset: null, limit: null, remaining: null }
```
After making an API call, it will be set.
```javascript
aftership.courier.listCouriers()
  .then(result => {
    console.log(result);
    console.log(aftership.rate_limit);
  })
  .catch(err => console.log(err));

// console output
// { limit: 600, remaining: 599, reset: 1453281417 }
```


## Error Handling

There are 3 kinds of error
- SDK Error
- Request Error
- API Error

Error object of this SDK contain fields:
- `type` - **Require** - type of the error, **please handle each error by this field**
- `message` - **Optional** - detail message of the error
- `data` - **Optional** - data lead to the error
- `code` - **Optional** - error code for API Error
- `response_body` - **Optional** - response body of API Error

> Please handle each error by its `type`, since it is a require field

### SDK Error

Error return by the SDK instance, mostly invalid param type when calling `constructor` or `endpoint method`  
`error.type` is one of [error_enum](https://github.com/AfterShip/aftership-sdk-nodejs/blob/master/src/error/error_enum.js)  
**Throw** by the SDK instance

```js
const { AfterShip } = require('aftership');
const aftership = new AfterShip('YOUR_API_KEY');

// GET /notifications/:slug/:tracking_number
aftership.notification.getNotification()
  .then(result => console.log(result))
  .catch(err => console.log(err));

/*
{ Error: HandlerError: You must specify the id or slug and tracking number
  type: 'HandlerError',
  code: '',
  data: undefined,
  responseBody: '' }
*/
```

### Request Error

Error return by the `request` module  
`error.type` could be `ETIMEDOUT`, `ECONNRESET`, etc.  
**Catch** by promise

```js
const { AfterShip } = require('aftership');
const aftership = new AfterShip('YOUR_API_KEY');

aftership.courier.listCouriers()
  .then(result => console.log(result))
  .catch(err => console.log(err));
/*
{ Error: getaddrinfo ENOTFOUND api.aftership.com api.aftership.com:443
  type: 'ENOTFOUND',
  code: 'ENOTFOUND',
  ... }
*/
```

### API Error

Error return by the Aftership API  
`error.type` shuold be same as https://www.aftership.com/docs/api/4/errors  
**Catch** by promise

```js
const { AfterShip } = require('aftership');
const aftership = new AfterShip('INVALID_API_KEY');

aftership.courier.listCouriers()
  .then(result => console.log(result))
  .catch(err => console.log(err));
/*
{ [Error: Invalid API key.]
  type: 'Unauthorized',
  message: 'Invalid API key.',
  code: 401,
  data: {},
  response_body: '{"meta":{"code":401,"message":"Invalid API key.","type":"Unauthorized"},"data":{}}' }
*/
```

## Examples
### /couriers
**GET** /couriers

```javascript
aftership.courier.listCouriers()
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

**GET** /couriers/all

```javascript
aftership.courier.listAllCouriers()
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

**POST** /couriers/detect

```javascript
const payload = {
  'tracking': {
    'tracking_number': '906587618687',
    'tracking_postal_code': 'DA15BU',
    'tracking_ship_date': '20131231',
    'tracking_account_number': '1234567890',
    'slug': ['dhl', 'ups', 'fedex']
  }
};
aftership.courier.detectCouriers(payload)
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

### /trackings

**POST** /trackings

```javascript
const payload = {
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
aftership.tracking
  .createTracking(payload)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

**DELETE** /trackings/:slug/:tracking_number

```javascript
aftership.tracking
  .deleteTracking({
    slug: "ups",
    tracking_number: "1234567890",
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

**GET** /trackings

```javascript
const query = {
  slug: 'dhl,ups,usps'
};
aftership.tracking
  .listTrackings(query)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

**GET** /trackings/:slug/:tracking_number

```javascript
aftership.tracking
  .getTracking({
    slug: "ups",
    tracking_number: "1234567890",
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

Tip: You can also add `optional_parameters` to `/:slug/:tracking_number`

```javascript
// GET /trackings/:slug/:tracking_number?tracking_postal_code=:postal_code&tracking_ship_date=:ship_date
aftership.tracking
  .getTracking({
    slug: "ups",
    tracking_number: "1234567890",
    optional_parameters: {
      tracking_postal_code: "1234",
      tracking_ship_date: "20200423",
    }
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```


> Pro Tip: You can always use /:id to replace /:slug/:tracking_number.
```javascript
// GET /trackings/:id
aftership.tracking
  .getTracking({
    id: "1234567890",
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

**POST** /trackings/:slug/:tracking_number/retrack

```javascript
aftership.tracking
  .retrack({
    slug: "ups",
    tracking_number: "1234567890",
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
```

### /last_checkpoint

**GET** /last_checkpoint/:slug/:tracking_number

```javascript
aftership.last_checkpoint.getLastCheckpoint({
    slug: 'ups',
    tracking_number: '1234567890',
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

### /notifications

**GET** /notifications/:slug/:tracking_number

```javascript
aftership.notification.getNotification({
    slug: 'ups',
    tracking_number: '1234567890',
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

**POST** /notifications/:slug/:tracking_number/add

```javascript
const payload = {
  'notification': {
    'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
    'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
  }
};
aftership.notification.addNotification({
    slug: 'ups',
    tracking_number: '1234567890',
  }, payload)
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

**POST** /notifications/:slug/:tracking_number/remove

```javascript
const payload = {
  'notification': {
    'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
    'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
  }
};
aftership.notification.removeNotification({
    slug: 'ups',
    tracking_number: '1234567890',
  }, payload)
  .then(result => console.log(result))
  .catch(e => console.log(e));
```

## Migrations
```javascript
// v5 (old version)
const Aftership = require('aftership')('YOUR_API_KEY');

Aftership.call('GET', '/couriers/all').then(function (result) {
  console.log(result);
}).catch(function (err) {
  console.log(err);
});

// v6 (new version)
const { AfterShip } = require('aftership');
const aftership = new AfterShip('YOUR_API_KEY');

aftership.courier.listAllCouriers()
  .then(result => console.log(result))
  .catch(err => console.log(err));
```

## Change log

### 2020-04-23 v6.0.0-alpha
- New features
	- Support latest features in v4 API
	- Support TypeScript
	- Support IntelliSense, bring more convenient to consumers
- Compatibility
	- Node >=10.0
- Breaking changes
	- Don't support `callback` anymore, please use `Promise` instead.
	- Removed `auto retry` feature, consumers need to retry the request by themselves.
	- Removed `call` method
  - Remove `meta` in SDK `response` object.

## License
Copyright (c) 2016-2020 AfterShip

Licensed under the MIT license.
