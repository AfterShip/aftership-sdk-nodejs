if (!GLOBAL.apiKey) {
	console.log('No API Key Provided');
	process.exit(1);
}

var Aftership = require('../main.js')(GLOBAL.apiKey);

exports.Couriers = {

	'No Callback (no options)': function(test) {
		test.expect(1);

		test.equal(Aftership.couriers(), 'Missing Required Parameter: callback');
		test.done();
	},

	'OK': function(test) {
		test.expect(2);

		Aftership.couriers(function(err, result) {
			test.notEqual(err, null);
			test.equal(typeof err, 'string');

			test.done();
		});
	}
};
