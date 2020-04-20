'use strict';

const API_KEY = 'SOME_API_KEY';
const AfterShip = require('../dist/index.js').AfterShip;

const aftership = new AfterShip(API_KEY);

// GET /couriers
aftership.courier.listCouriers()
  .then(result => console.log(result))
  .catch(e => console.log(e));


// GET /couriers/all
aftership.courier.listAllCouriers()
  .then(result => console.log(result))
  .catch(e => console.log(e));

// POST /couriers/detect
const payload = {
	'tracking': {
		'tracking_number': '906587618687',
		'tracking_postal_code': 'DA15BU',
		'tracking_ship_date': '20131231',
		'tracking_account_number': '1234567890',
		'slug': ['dhl', 'ups', 'fedex']
	}
}
aftership.courier.detectCouriers(payload)
  .then(result => console.log(result))
  .catch(e => console.log(e));
