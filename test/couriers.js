if (!GLOBAL.apiKey) {
	console.log('No API Key Provided');
	process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);

exports.Couriers = {

	'OK': function(test) {
		Aftership.getCouriers(function(err, result) {
			test.expect(2);

			test.equal(err, null);
			test.equal(typeof result, 'object');
			test.done();
		});
	},

	'Detect Courier': function(test) {
		Aftership.detectCouriers('906587618687', function(err, result) {
			test.expect(2);

			test.equal(err, null);
			test.equal(result.total, 28);
			test.done();
		});
	},

	'Detect Courier strict': function(test) {
		Aftership.detectCouriers('906587618687', {}, 'strict', function(err, result) {
			test.expect(2);

			test.equal(err, null);
			test.equal(result.total, 27);
			test.done();
		});
	},

	'Detect Courier strict with postal code': function(test) {
		Aftership.detectCouriers('906587618687', {'tracking_postal_code': 'DA15BU'}, 'strict', function(err, result) {
			test.expect(2);

			test.equal(err, null);
			test.equal(result.total, 28);
			test.done();
		});
	}
};
