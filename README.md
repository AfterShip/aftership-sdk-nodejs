# aftership-nodejs [![Build Status](https://secure.travis-ci.org/chiulam/aftership-nodejs.png?branch=master)](http://travis-ci.org/chiulam/aftership-nodejs)

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
Copyright (c) 2015 Chiu Lam  
Licensed under the MIT license.
