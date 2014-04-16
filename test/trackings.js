if (!GLOBAL.apiKey) {
	console.log('No API Key Provided');
	process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);


exports.CreateTracking = {

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
			test.equal(err, null);
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
			test.equal(err, null);
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
			test.equal(err, null);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.fedex);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'fedex');

			test.done();
		});
	},

	'Ok (w/ slug ups)': function(test) {
		test.expect(5);

		// Fedex
		Aftership.createTracking(GLOBAL.tracking.ups, {slug: 'ups'}, function(err, result) {
			test.equal(err, null);
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);
			test.equal(typeof result, 'object');
			test.ok(result.tracking.checkpoints);
			test.equal(result.tracking.slug, 'ups');

			test.done();
		});
	},

	'Ok (w/ slug toll-global-express)': function(test) {
		test.expect(5);

		// toll-global-express
		Aftership.createTracking(GLOBAL.tracking['toll-global-express'], {slug: 'toll-global-express'}, function(err, result) {
			test.equal(err, null);
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


exports.Tracking = {

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
		test.expect(7);

		// UPS
		Aftership.tracking('ups', GLOBAL.tracking.ups, ['tracking_number', 'slug'], function(err, result) {
			test.equal(err, null);
			test.equal(typeof result, 'object');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);
			test.equal(typeof result.tracking.checkpoints, 'undefined');
			test.equal(typeof result.tracking.active, 'undefined');
			test.equal(typeof result.tracking.tag, 'undefined');

			test.done();
		});

	},

	'Ok': function(test) {
		test.expect(6);

		// UPS
		Aftership.tracking('ups', GLOBAL.tracking.ups, [], function(err, result) {

			test.equal(err, null);
			test.equal(typeof result, 'object');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);
			test.ok(result.tracking.checkpoints);
			test.equal(typeof result.tracking.active, 'boolean');

			test.done();
		});
	}

};

exports.Trackings = {

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
		test.expect(5);

		Aftership.trackings({}, function(err, results) {
			test.equal(err, null);
			test.ok(Array.isArray(results.trackings));

			// Check for a few meta parameters
			test.equal(typeof results.limit, 'number');
			test.equal(typeof results.slug, 'string');

			// We should have at least 1 entry, check it
			test.equal(typeof results.trackings[0].tracking_number, 'string');

			test.done();

		});
	}

	// 'OK (filtering)': function(test) {
	//   test.expect(8);

	//   Aftership.trackings({limit: 1}, function(err, meta, trackings) {
	//     test.equal(err, null);
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

exports.UpdateTracking = {

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
		Aftership.updateTracking('ups', GLOBAL.tracking.ups, {}, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result, 'object');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);
			test.notEqual(typeof(result.tracking.active), 'undefined');

			test.done();
		});
	},

	'Ok (with change)': function(test) {
		test.expect(5);

		// UPS
		Aftership.updateTracking('ups', GLOBAL.tracking.ups, {title: 'Foobar'}, function(err, result) {
			test.equal(err, null);
			test.equal(typeof result, 'object');
			test.equal(result.tracking.slug, 'ups');
			test.equal(result.tracking.tracking_number, GLOBAL.tracking.ups);
			test.equal(result.tracking.title, 'Foobar');

			test.done();
		});
	}
};


exports.Checkpoint = {

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

	'Ok with fields': function(test) {
		test.expect(4);

		// UPS
		Aftership.last_checkpoint('ups', GLOBAL.tracking.ups, ['message'], function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.checkpoint, 'object');
			test.equal(typeof result.checkpoint.tag, 'undefined');
			test.equal(typeof result.checkpoint.country_iso3, 'undefined');

			test.done();
		});
	},

	'Ok': function(test) {
		test.expect(2);

		// UPS
		Aftership.last_checkpoint('ups', GLOBAL.tracking.ups, [], function(err, result) {
			test.equal(err, null);
			test.equal(typeof result.checkpoint, 'object');

			test.done();
		});
	}

};


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

