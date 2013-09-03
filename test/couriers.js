
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

    Aftership.couriers(function(err, length, couriers) {
      test.ok(!err);
      test.ok(Array.isArray(couriers));
      test.equal(typeof length, 'number');

      // Make sure trackings array was removed from meta data
      test.ok(!couriers.total);

      // We should have at least 1 entry, check it
      test.equal(typeof couriers[0].slug, 'string');

      test.done();
    });
  }
};
