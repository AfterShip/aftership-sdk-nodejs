
if (!GLOBAL.apiKey) {
  console.log('No API Key Provided');
  process.exit(1);
}

var AS = require('../lib/main.js')(GLOBAL.apiKey);


exports['Track'] = {
  
  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(AS.startTracking(), 'Missing Required Parameter: tracking number');
    test.done();
  },
  
  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(AS.startTracking('foo'), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'No Callback (w/ options)': function(test) {
    test.expect(1);

    test.equal(AS.startTracking('foo', {}), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'Ok (no slug)': function(test) {
    test.expect(6);

    // UPS
    AS.startTracking(GLOBAL.tracking.ups, {}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking.ups);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);

      // Make sure it auto-detected the slug
      test.equal(result.slug, 'ups');

      test.done();
    });
  },
  
  'Ok (w/ slug)': function(test) {
    test.expect(6);

    // UPS
    AS.startTracking(GLOBAL.tracking.tnt, {slug: 'tnt'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking.tnt);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'tnt');

      test.done();
    });
  }
};
