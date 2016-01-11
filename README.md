# aftership-sdk-node

[![Build Status](https://travis-ci.org/chiulam/aftership-sdk-nodejs.svg?branch=master)](https://travis-ci.org/chiulam/aftership-sdk-nodejs)
[![codecov.io](https://codecov.io/github/chiulam/aftership-sdk-nodejs/coverage.svg?branch=master)](https://codecov.io/github/chiulam/aftership-sdk-nodejs?branch=master)
[![Dependency Status](https://gemnasium.com/chiulam/aftership-sdk-nodejs.svg)](https://gemnasium.com/chiulam/aftership-sdk-nodejs)

[![node](https://img.shields.io/node/v/aftership-sdk-node.svg)]()
[![npm](https://img.shields.io/npm/v/aftership-sdk-node.svg)]()
[![npm](https://img.shields.io/npm/dm/aftership-sdk-node.svg)]()
[![npm](https://img.shields.io/npm/l/aftership-sdk-node.svg)]()

![codecov.io](http://codecov.io/github/chiulam/aftership-sdk-nodejs/branch.svg?branch=master)

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


## Table of contents

- Constructor
- Call(...)
- RESTful call - GET, POST, PUT, DELETE
- Error Handling
- Example
	- /couriers
	- /trackings
	- /last_checkpoint
	- /notifications

## License
Copyright (c) 2016 AfterShip

Licensed under the MIT license.
