if (!GLOBAL.apiKey) {
  console.log('No API Key Provided');
  process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);

exports['Couriers'] = {

  'No Callback (no options)': function(test) {
    test.expect(1);

    test.equal(Aftership.couriers(), 'Missing Required Parameter: callback');
    test.done();
  },

  'OK': function(test) {
    test.expect(5);

    Aftership.couriers(function(err, results) {
      test.ok(!err);
      test.ok(Array.isArray(results.couriers));
      test.equal(typeof results.total, 'number');

      // We should have at least 1 entry, check it
      test.equal(typeof results.couriers[0].slug, 'string');

      test.done();
    });
  }
};
