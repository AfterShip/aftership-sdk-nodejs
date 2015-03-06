/******************************************
 * Set your API key here for testing
 ******************************************/
GLOBAL.apiKey = process.env.AFTERSHIP_NODEJS_SDK_API_KEY || ''; // please use your AfterShip api key

/******************************************
 * Set tracking numbers here
 ******************************************/

GLOBAL.tracking = {
	'dhl': '1100677045',
	'fedex': '618320505092',
	'tnt': 'GE171378685WW',
	'toll-global-express': '813007861271',
	'ups': '1Z01Y69E6644338280',
	'usps': '9374869903500183656767',
	'dx': {
		tracking_number: '1551540939',
		tracking_postal_code: 'NR172BS'
	}
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