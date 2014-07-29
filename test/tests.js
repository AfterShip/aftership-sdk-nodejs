/******************************************
 * Set your API key here for testing
 ******************************************/
GLOBAL.apiKey = process.env.AFTERSHIP_NODEJS_SDK_API_KEY || ''; // please use your AfterShip api key

/******************************************
 * Set tracking numbers here
 ******************************************/

GLOBAL.tracking = {
	'dhl': '2798713875',
	'fedex': '614250480620',
	'tnt': 'GD693099514WWW',
	'toll-global-express': '200927473106',
	'ups': '1ZE8316Y0340536688',
	'usps': '9410809699938642831030'
};

/******************************************
 * Test files to run
 ******************************************/

var tests = [
	'couriers.js',
	'trackings.js'
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
var reporter, i;

if (argv.verbose) {
	reporter = require('nodeunit').reporters.default;

	// Add directory to each item
	for (i = 0; i < tests.length; i++) {
		tests[i] = 'test/' + tests[i];
	}
} else {
	reporter = require('nodeunit');

	// Add directory to each item
	for (i = 0; i < tests.length; i++) {
		tests[i] = __dirname + '/' + tests[i];
	}
}

if (argv.verbose) {
	reporter.run(tests, null);
} else {
	reporter.runFiles(tests);
}