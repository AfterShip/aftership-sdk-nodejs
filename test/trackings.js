
if (!GLOBAL.apiKey) {
  console.log('No API Key Provided');
  process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);


exports['Track'] = {

  'No Slug': function(test) {
    test.expect(1);

    test.equal(Aftership.tracking(), 'Missing Required Parameter: slug');
    test.done();
  },

  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(Aftership.tracking('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },

  'No Callback (no fields)': function(test) {
    test.expect(1);

    test.equal(Aftership.tracking('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },

  'No Callback (w/ fields)': function(test) {
    test.expect(1);

    test.equal(Aftership.tracking('ups', '1234', []), 'Missing Required Parameter: callback');
    test.done();
  },

  'Ok': function(test) {
    test.expect(6);

    // UPS
    Aftership.tracking('ups', GLOBAL.tracking['ups'], null, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking['ups']);
      test.ok(tracking.checkpoints);
      test.notEqual(typeof(tracking.active), 'undefined');

      test.done();
    });
  }

};

exports['Trackings'] = {

  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(Aftership.trackings(), 'Missing Required Parameter: callback');
    test.done();
  },

  'No Callback (w/ options)': function(test) {
    test.expect(1);

    test.equal(Aftership.trackings({}), 'Missing Required Parameter: callback');
    test.done();
  },

  'OK': function(test) {
    test.expect(7);

    Aftership.trackings({}, function(err, meta, trackings) {
      test.ok(!err);
      test.equal(typeof meta, 'object');
      test.ok(Array.isArray(trackings));

      // Make sure trackings array was removed from meta data
      test.ok(!meta.trackings);

      // Check for a few meta parameters
      test.equal(typeof meta.limit, 'number');
      test.equal(typeof meta.slug, 'string');

      // We should have at least 1 entry, check it
      test.equal(typeof trackings[0].tracking_number, 'string');

      test.done();

    });
  }

  // 'OK (filtering)': function(test) {
  //   test.expect(8);

  //   Aftership.trackings({limit: 1}, function(err, meta, trackings) {
  //     test.ok(!err);
  //     test.equal(typeof meta, 'object');
  //     test.ok(Array.isArray(trackings));

  //     // Make sure trackings array was removed from meta data
  //     test.ok(!meta.trackings);

  //     // Check for a few meta parameters
  //     test.equal(typeof meta.limit, 'number');
  //     test.equal(meta.limit, 1);
  //     test.equal(trackings.length, 1);

  //     // We should have at least 1 entry, check it
  //     test.equal(typeof trackings[0].tracking_number, 'string');

  //     test.done();

  //   });
  // }

};

exports['Update Tracking'] = {

  'No Slug': function(test) {
    test.expect(1);

    test.equal(Aftership.updateTracking(), 'Missing Required Parameter: slug');
    test.done();
  },

  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(Aftership.updateTracking('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },

  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(Aftership.updateTracking('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },

  'No Callback (w/ options)': function(test) {
    test.expect(1);

    test.equal(Aftership.updateTracking('ups', '1234', {}), 'Missing Required Parameter: callback');
    test.done();
  },

  'Ok': function(test) {
    test.expect(5);

    // UPS
    Aftership.updateTracking('ups', GLOBAL.tracking['ups'], null, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking['ups']);
      test.notEqual(typeof(tracking.active), 'undefined');

      test.done();
    });
  },

  'Ok (with change)': function(test) {
    test.expect(5);

    // UPS
    Aftership.updateTracking('ups', GLOBAL.tracking['ups'], {title: 'Foobar'}, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking['ups']);
      test.equal(tracking.title, 'Foobar');

      test.done();
    });
  }
};


exports['Checkpoint'] = {

  'No Slug': function(test) {
    test.expect(1);

    test.equal(Aftership.last_checkpoint(), 'Missing Required Parameter: slug');
    test.done();
  },

  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(Aftership.last_checkpoint('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },

  'No Callback (no fields)': function(test) {
    test.expect(1);

    test.equal(Aftership.last_checkpoint('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },

  'No Callback (w/ fields)': function(test) {
    test.expect(1);

    test.equal(Aftership.last_checkpoint('ups', '1234', []), 'Missing Required Parameter: callback');
    test.done();
  },

  'Ok': function(test) {
    test.expect(4);

    // UPS
    Aftership.last_checkpoint('ups', GLOBAL.tracking['ups'], null, function(err, tag, checkpoint) {
      test.ok(!err);
      test.equal(typeof tag, 'string');
      test.equal(typeof checkpoint, 'object');
      test.equal(typeof checkpoint.tag, 'string');

      test.done();
    });
  }

};


