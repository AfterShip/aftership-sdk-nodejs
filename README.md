Installing
=========

```npm install aftership-nodejs```

Testing
=========

- Paste your API key in ```test/tests.js```
- If you desire, update test tracking numbers in ```test/test.js```

To test, run ```npm test```

NOTE: Once tracking numbers have been added to your account, the tests in track.js will fail. If this is the case, you can test everything else by commenting out the ```track.js``` line in ```test/tests.js```


Use
=========

Reference the AfterShip library: ```var AS = require('aftership-nodejs')('API KEY');```

Couriers
-

Gets a list of available couriers. Returns the total number of couriers along with an array of available couriers. Accepts:

- callback: ```function(err, length, couriers)```

Example: ```AS.couriers(callback)```


Begin Tracking
-

Starts tracking a new tracking number. Accepts:

- trackingNumber: The number to track
- options: An object with options to set (https://www.aftership.com/docs/api/3.0/tracking/post-trackings)
- callback: ```function(err, trackingNumber, trackingInfo)```

Example: ```AS.startTracking('1Z21E98F0314447088', {slug: 'ups'}, callback);```

Get All Trackings
-

Returns all available trackings from your account. Accepts:

- options: An object with options to limit results (https://www.aftership.com/docs/api/3.0/tracking/get-trackings)
- callback: ```function(err, metaData, trackings)```

Example: ```AS.trackings({}, callback);```

Get Specific Tracking Information
-

Gets information for a specific tracking number. Accepts:

- slug: The slug for the tracking number, e.g., 'ups'
- trackingNumber: The tracking number to retrieve.
- fields: Array of fields to return
- callback: ```function(err, trackingInfo)```

Example: ```AS.track('ups', '1Z21E98F0314447088', [], callback);```

Update Tracking Information
-

Updates tracking information for an existing tracking number. Accepts:

- slug: The slug for the tracking number, e.g., 'ups'
- trackingNumber: The tracking number to retrieve.
- options: Object of fields to update (https://www.aftership.com/docs/api/3.0/tracking/put-trackings-slug-tracking_number)
- callback: ```function(err, trackingInfo)```

Example:
```AS.updateTracking('ups', '1Z21E98F0314447088', {title: 'My Shipment'}, callback);```

Get Last Checkpoint
-

Gets the last checkpoint for a specific tracking number. Accepts:

- slug: The slug for the tracking number, e.g., 'ups'
- trackingNumber: The tracking number to retrieve.
- fields: Array of fields to return
- callback: ```function(err, tag, checkpoints)```

Example: ```AS.checkpoint('ups', '1Z21E98F0314447088', {}, callback)```


License
=========

GNU v2

Contributors
=========

[Kirk Morales] - [Intrakr]

  [Kirk Morales]: https://github.com/knation
  [Intrakr]: http://intrakr.com
  

    