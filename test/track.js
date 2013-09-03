
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
    AS.startTracking(GLOBAL.tracking['ups'], {}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['ups']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);

      // Make sure it auto-detected the slug
      test.equal(result.slug, 'ups');

      test.done();
    });
  },

  'Ok (w/ slug tnt)': function(test) {
    test.expect(6);

    // UPS
    AS.startTracking(GLOBAL.tracking['tnt'], {slug: 'tnt'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['tnt']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'tnt');

      test.done();
    });
  },

  'Ok (w/ slug fedex)': function(test) {
    test.expect(6);

    // Fedex
    AS.startTracking(GLOBAL.tracking['fedex'], {slug: 'fedex'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['fedex']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'fedex');

      test.done();
    });
  },

  'Ok (w/ slug toll-global-express)': function(test) {
    test.expect(6);

    // toll-global-express
    AS.startTracking(GLOBAL.tracking['toll-global-express'], {slug: 'toll-global-express'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['toll-global-express']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'toll-global-express');

      test.done();
    });
  },

  'Ok (w/ slug usps)': function(test) {
    test.expect(6);

    // usps
    AS.startTracking(GLOBAL.tracking['usps'], {slug: 'usps'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['usps']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'usps');

      test.done();
    });
  },

  'Ok (w/ slug dhl)': function(test) {
    test.expect(6);

    // dhl
    AS.startTracking(GLOBAL.tracking['dhl'], {slug: 'dhl'}, function(err, trackingNumber, result) {
      test.ok(!err);
      test.equal(trackingNumber, GLOBAL.tracking['dhl']);
      test.equal(typeof result, 'object');
      test.ok(result.checkpoints);
      test.equal(result.active, true);
      test.equal(result.slug, 'dhl');

      test.done();
    });
  }
};
