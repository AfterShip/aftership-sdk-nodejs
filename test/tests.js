/******************************************
 * Set your API key here for testing
 ******************************************/
GLOBAL.apiKey = 'e9f201df-91f2-4f13-9a64-3ad64826d47d';

/******************************************
 * Set tracking numbers here
 ******************************************/

GLOBAL.tracking = {
  'dhl': '4681442382',
  'fedex': '573191403485',
  'tnt': '881232984',
  'toll-global-express': '813081390262',
  'ups': '1Z5V572E0365305588',
  'usps': '9405509699937485290971'
};

/******************************************
 * Test files to run
 ******************************************/

var tests = [
  'track.js',
  'trackings.js',
  'couriers.js'
];

/******************************************
 * Don't touch below this!
 ******************************************/

var optimist = require('optimist');

var argv = optimist.usage('\n./tests.js OPTIONS', {
  'verbose': {
    description: 'If set, shows verbose output',
    alias: 'v',
    default: false,
    boolean: true
  }
}).argv;

// Choose appropriate reporter
var reporter;
if (argv.verbose) {
  reporter = require('nodeunit').reporters.default;

  // Add directory to each item
  for (var i = 0; i < tests.length; i++) {
    tests[i] = 'test/' + tests[i];
  }

} else {
  reporter = require('nodeunit');

  // Add directory to each item
  for (var i = 0; i < tests.length; i++) {
    tests[i] = __dirname + '/' + tests[i];
  }
}

if (argv.verbose) {
  reporter.run(tests, null);

} else {
  reporter.runFiles(tests);
}
