if (!GLOBAL.apiKey) {
	console.log('No API Key Provided');
	process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);


exports.DeleteTracking = {

	'No Slug': function(test) {
		test.expect(1);

		test.equal(Aftership.deleteTracking(), 'Missing Required Parameter: slug');
		test.done();
	},

	'No Tracking Number': function(test) {
		test.expect(1);

		test.equal(Aftership.deleteTracking('ups'), 'Missing Required Parameter: tracking number');
		test.done();
	},

	'No Callback (no fields)': function(test) {
		test.expect(1);

		test.equal(Aftership.deleteTracking('ups', '1234'), 'Missing Required Parameter: callback');
		test.done();
	},

	'No Callback (w/ fields)': function(test) {
		test.expect(1);

		test.equal(Aftership.deleteTracking('ups', '1234', []), 'Missing Required Parameter: callback');
		test.done();
	},

	'Tracking Number is not exist': function(test) {
		test.expect(3);

		// UPS
		Aftership.deleteTracking('ups', '12345677654', function(err, result) {
			test.equal(err, '404: Tracking is not exist.');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, '12345677654');

			test.done();
		});
	},

	'Ok Delete dhl': function(test) {
		test.expect(4);

		// dhl
		Aftership.deleteTracking('dhl', GLOBAL.tracking.dhl, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'dhl');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.dhl);

			test.done();
		});
	},

	'Ok Delete fedex': function(test) {
		test.expect(4);

		// fedex
		Aftership.deleteTracking('fedex', GLOBAL.tracking.fedex, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'fedex');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.fedex);

			test.done();
		});
	},

	'Ok Delete tnt': function(test) {
		test.expect(4);

		// tnt
		Aftership.deleteTracking('tnt', GLOBAL.tracking.tnt, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'tnt');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.tnt);

			test.done();
		});
	},

	'Ok Delete toll-global-express': function(test) {
		test.expect(4);

		// toll-global-express
		Aftership.deleteTracking('toll-global-express', GLOBAL.tracking['toll-global-express'], function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'toll-global-express');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking['toll-global-express']);

			test.done();
		});
	},

	'Ok Delete ups': function(test) {
		test.expect(4);

		// UPS
		Aftership.deleteTracking('ups', GLOBAL.tracking.ups, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);

			test.done();
		});
	},

	'Ok Delete usps': function(test) {
		test.expect(4);

		// usps
		Aftership.deleteTracking('usps', GLOBAL.tracking.usps, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.tracking, 'object');
			test.equal(result.tracking.slug, 'usps');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.usps);

			test.done();
		});
	}

};


