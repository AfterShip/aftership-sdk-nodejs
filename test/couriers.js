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
	}
};
