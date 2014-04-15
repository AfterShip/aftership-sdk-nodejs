if (!GLOBAL.apiKey) {
	console.log('No API Key Provided');
	process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);


exports.Track = {

	'No Tracking Number': function(test) {
		test.expect(1);

		test.equal(Aftership.createTracking(), 'Missing Required Parameter: tracking number');
		test.done();
	},

	'No Callback (no options)': function(test) {
		test.expect(1);

		test.equal(Aftership.createTracking('foo'), 'Missing Required Parameter: callback');
		test.done();
	},

	'No Callback (w/ options)': function(test) {
		test.expect(1);

		test.equal(Aftership.createTracking('foo', {}), 'Missing Required Parameter: callback');
		test.done();
	},

	'Ok (no slug)': function(test) {
		test.expect(5);
		// usps
		Aftership.createTracking(GLOBAL.tracking.usps, {}, function(err, result) {
			test.ok(!err);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.usps);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			// Make sure it auto-detected the slug
			test.equal(result.tracking.slug, 'usps');

			test.done();
		});
	},

	'Ok (w/ slug tnt)': function(test) {
		test.expect(5);

		// tnt
		Aftership.createTracking(GLOBAL.tracking.tnt, {slug: 'tnt'}, function(err, result) {
			test.ok(!err);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.tnt);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'tnt');

			test.done();
		});
	},

	'Ok (w/ slug fedex)': function(test) {
		test.expect(5);

		// Fedex
		Aftership.createTracking(GLOBAL.tracking.fedex, {slug: 'fedex'}, function(err, result) {
			test.ok(!err);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.fedex);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'fedex');

			test.done();
		});
	},

	'Ok (w/ slug toll-global-express)': function(test) {
		test.expect(5);

		// toll-global-express
		Aftership.createTracking(GLOBAL.tracking['toll-global-express'], {slug: 'toll-global-express'}, function(err, result) {
			test.ok(!err);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking['toll-global-express']);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'toll-global-express');

			test.done();
		});
	},

	'Ok (w/ slug dhl)': function(test) {
		test.expect(5);

		// dhl
		Aftership.createTracking(GLOBAL.tracking.dhl, {slug: 'dhl'}, function(err, result) {
			test.ok(!err);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.dhl);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'dhl');

			test.done();
		});
	},


	'Ok (w/ slug usps)': function(test) {
		test.expect(5);

		// usps
		Aftership.createTracking(GLOBAL.tracking.usps, {slug: 'usps'}, function(err, result) {
			// as the tracking is already created in w/o slug, there should be error return
			test.notEqual(err, '');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.usps);
			test.equal(typeof result, 'object');
			test.equal(typeof result.tracking.checkpoints, 'undefined');
			test.equal(result.tracking.slug, 'usps');

			test.done();
		});
	}

};
