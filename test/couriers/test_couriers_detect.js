'use strict';

const api_key = process.env.AFTERSHIP_NODEJS_SDK_API_KEY || ''; // please use your AfterShip api key

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const Aftership = require('./../../index');

describe('Test couriers/detect', function () {
	this.timeout(5000);

	let sandbox;

	before(function () {
		sandbox = sinon.sandbox.create();
	});

	beforeEach(function () {
		sandbox.reset();
		sandbox.restore();
	});

	describe('Test /couriers/detect', function () {
		it('should return some couriers', function (done) {
			let aftership = new Aftership(api_key);

			let body = {
				tracking: {
					tracking_number: '1111111111'
				}
			};

			aftership.call('POST', '/couriers/detect', body, function (err, result) {
				expect(err).to.equal(null);
				expect(result.meta.code).to.equal(200);
				expect(result.data).to.contains.all.keys(['total', 'couriers']);
				done();
			});
		});
	});
});
