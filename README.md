Install
=========

```
npm install aftership

```

Test
=========

- Paste your API key in ```test/tests.js```
- If you desire, update test tracking numbers in ```test/test.js```

To test, run

```
npm test

```

NOTE: Once tracking numbers have been added to your account, the tests in track.js will fail.

If this is the case, you can test everything else by commenting out the ```track.js``` line in ```test/tests.js```

or remove the tracking number in aftership.com account.


Use
=========

Reference the AfterShip library:

```
var Aftership = require('aftership')('API KEY');

```

Couriers
-

Gets a list of available couriers. Returns the total number of couriers along with an array of available couriers.

#### Get couriers:

Callback:

```
err: the error message
count: The number of couriers count
couriers: the array of available couriers

```

Example:

```
Aftership.couriers(function(err, count, couriers) {
  console.log('Support Courier: ' + count);
});

```



Trackings
-

#### Create a new tracking number:

You must first create a new tracking number before getting the tracking result.

Accepts:

```
tracking_number: The tracking number to track
options: An object with options to set

https://www.aftership.com/docs/api/3.0/tracking/post-trackings

```

Callback:

```
function(err, tracking_number, options)

```

Example:

```
Aftership.createTracking('1Z21E98F0314447088', {slug: 'ups'}, function(err, tracking_number, tracking_detail) {
  if (err) {
    console.log(err);
  } else {
    console.log('Created the tracking: ' + tracking_number);
  }
});

```


#### Get all trackings number in the acccount

Returns all available trackings from your account. Accepts:

Accepts:

```
options: An object with options to limit results

https://www.aftership.com/docs/api/3.0/tracking/get-trackings
```

callback:

```
function(err, data, trackings)

```

Example:

```
Aftership.trackings({}, function(err, data, trackings) {
  if (err) {
    console.log(err);
  } else {
    console.log('Total Trackings in query: ' + data.count);
    console.log(trackings);
  }
});

```

#### Get a specific tracking number in the account

Gets information for a specific tracking number.

Accepts:

```
slug: The slug for the tracking number, e.g., 'ups'
tracking_number: The tracking number to retrieve.
fields: Array of fields to return

```

callback:

```

function(err, tracking)

```

Example:

```

Aftership.track('ups', '1Z21E98F0314447088', [], function(err, tracking) {
  if (err) {
    console.log(err);
  } else {
    console.log(tracking);
  }
});

```

#### Update a tracking number information

Updates tracking information for an existing tracking number.

Accepts:

```
slug: The slug for the tracking number, e.g., 'ups'
tracking_number: The tracking number to retrieve.
options: Object of fields to update

https://www.aftership.com/docs/api/3.0/tracking/put-trackings-slug-tracking_number

```

callback:

```
function(err, updated_tracking)

```


Example:

```
Aftership.updateTracking('ups', '1Z21E98F0314447088', {title: 'My Shipment'},
  function(err, updated_tracking) {
    if (err) {
      console.log(err);
    } else {
      console.log(updated_tracking);
    }
  });

```

#Last Checkpoint
-

Gets the last checkpoint for a specific tracking number.

Accepts:

```
slug: The slug for the tracking number, e.g., 'ups'
tracking_number: The tracking number to retrieve.
fields: Array of fields to return

```

Callback:

```
function(err, tag, last_checkpoint)

```

Example:

```
Aftership.last_checkpoint('ups', '1Z21E98F0314447088', [], function(err, tag, last_checkpoint) {
  if (err) {
    console.log(err);
  } else {
    console.log(last_checkpoint);
  }
});

```


License
=========

GNU v2

Contributors
=========

[Kirk Morales] - [Intrakr]

  [Kirk Morales]: https://github.com/knation
  [Intrakr]: http://intrakr.com


