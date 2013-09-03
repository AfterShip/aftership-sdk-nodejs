
if (!GLOBAL.apiKey) {
  console.log('No API Key Provided');
  process.exit(1);
}

var AS = require('../lib/main.js')(GLOBAL.apiKey);


exports['Track'] = {
  
  'No Slug': function(test) {
    test.expect(1);

    test.equal(AS.track(), 'Missing Required Parameter: slug');
    test.done();
  },
  
  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(AS.track('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },
  
  'No Callback (no fields)': function(test) {
    test.expect(1);

    test.equal(AS.track('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'No Callback (w/ fields)': function(test) {
    test.expect(1);

    test.equal(AS.track('ups', '1234', []), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'Ok': function(test) {
    test.expect(6);

    // UPS
    AS.track('ups', GLOBAL.tracking.ups, null, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking.ups);
      test.ok(tracking.checkpoints);
      test.equal(tracking.active, true);

      test.done();
    });
  }
  
  // 'Ok (with fields)': function(test) {
  //   test.expect(4);

  //   // UPS
  //   AS.track('ups', GLOBAL.tracking.ups, ['active'], function(err, tracking) {
  //     test.ok(!err);
  //     test.equal(typeof tracking, 'object');
  //     test.ok(typeof tracking.active == 'boolean');
  //     test.equal(Object.keys(tracking).length, 1);

  //     test.done();
  //   });
  // },
  
  // 'Ok (with fields as string)': function(test) {
  //   test.expect(4);

  //   // UPS
  //   AS.track('ups', GLOBAL.tracking.ups, 'active', function(err, tracking) {
  //     test.ok(!err);
  //     test.equal(typeof tracking, 'object');
  //     test.ok(typeof tracking.active == 'boolean');
  //     test.equal(Object.keys(tracking).length, 1);

  //     test.done();
  //   });
  // }
};

exports['Trackings'] = {
  
  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(AS.trackings(), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'No Callback (w/ options)': function(test) {
    test.expect(1);

    test.equal(AS.trackings({}), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'OK': function(test) {
    test.expect(7);

    AS.trackings({}, function(err, meta, trackings) {
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

  //   AS.trackings({limit: 1}, function(err, meta, trackings) {
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

    test.equal(AS.updateTracking(), 'Missing Required Parameter: slug');
    test.done();
  },
  
  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(AS.updateTracking('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },
  
  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(AS.updateTracking('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'No Callback (w/ options)': function(test) {
    test.expect(1);

    test.equal(AS.updateTracking('ups', '1234', {}), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'Ok': function(test) {
    test.expect(5);

    // UPS
    AS.updateTracking('ups', GLOBAL.tracking.ups, null, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking.ups);
      test.equal(tracking.active, true);

      test.done();
    });
  },
  
  'Ok (with change)': function(test) {
    test.expect(5);

    // UPS
    AS.updateTracking('ups', GLOBAL.tracking.ups, {title: 'Foobar'}, function(err, tracking) {
      test.ok(!err);
      test.equal(typeof tracking, 'object');
      test.equal(tracking.slug, 'ups');
      test.equal(tracking.tracking_number, GLOBAL.tracking.ups);
      test.equal(tracking.title, 'Foobar');

      test.done();
    });
  }
};


exports['Checkpoint'] = {
  
  'No Slug': function(test) {
    test.expect(1);

    test.equal(AS.checkpoint(), 'Missing Required Parameter: slug');
    test.done();
  },
  
  'No Tracking Number': function(test) {
    test.expect(1);

    test.equal(AS.checkpoint('ups'), 'Missing Required Parameter: tracking number');
    test.done();
  },
  
  'No Callback (no fields)': function(test) {
    test.expect(1);

    test.equal(AS.checkpoint('ups', '1234'), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'No Callback (w/ fields)': function(test) {
    test.expect(1);

    test.equal(AS.checkpoint('ups', '1234', []), 'Missing Required Parameter: callback');
    test.done();
  },
  
  'Ok': function(test) {
    test.expect(4);

    // UPS
    AS.checkpoint('ups', GLOBAL.tracking.ups, null, function(err, tag, checkpoint) {
      test.ok(!err);
      test.equal(typeof tag, 'string');
      test.equal(typeof checkpoint, 'object');
      test.equal(typeof checkpoint.tag, 'string');

      test.done();
    });
  }
  
  // 'Ok (with fields)': function(test) {
  //   test.expect(4);

  //   // UPS
  //   AS.checkpoint('ups', GLOBAL.tracking.ups, ['tag'], function(err, tag, checkpoint) {
  //     test.ok(!err);
  //     test.equal(typeof tracking, 'object');
  //     test.ok(typeof tag == 'string');
  //     test.equal(Object.keys(checkpoint).length, 1);

  //     test.done();
  //   });
  // },
  
  // 'Ok (with fields as string)': function(test) {
  //   test.expect(4);

  //   // UPS
  //   AS.checkpoint('ups', GLOBAL.tracking.ups, 'tag', function(err, tag, checkpoint) {
  //     test.ok(!err);
  //     test.equal(typeof tracking, 'object');
  //     test.ok(typeof tag == 'string');
  //     test.equal(Object.keys(checkpoint).length, 1);

  //     test.done();
  //   });
  // }
};


