'use strict';

const API_KEY = 'SOME_API_KEY';
const Aftership = require('./../index')(API_KEY);

/*
// GET /couriers
Aftership.call('GET', '/couriers', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/


// GET /couriers/all
Aftership.call('GET', '/couriers/all', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});


/*
// POST /couriers/detect
let body = {
	'tracking': {
		'tracking_number': '906587618687',
		'tracking_postal_code': 'DA15BU',
		'tracking_ship_date': '20131231',
		'tracking_account_number': '1234567890',
		'slug': ['dhl', 'ups', 'fedex']
	}
};
Aftership.call('POST', '/couriers', {
	body: body
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// POST /trackings
let body = {
	'tracking': {
		'slug': 'dhl',
		'tracking_number': '123456789',
		'title': 'Title Name',
		'smses': [
			'+18555072509',
			'+18555072501'
		],
		'emails': [
			'email@yourdomain.com',
			'another_email@yourdomain.com'
		],
		'order_id': 'ID 1234',
		'order_id_path': 'http://www.aftership.com/order_id=1234',
		'custom_fields': {
			'product_name': 'iPhone Case',
			'product_price': 'USD19.99'
		}
	}
};
Aftership.call('POST', '/trackings', {
	body: body
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// DELETE /trackings/:slug/:tracking_number
Aftership.call('DELETE', '/trackings/ups/1234567890', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /trackings
let query = {
	slug: 'dhl,ups,usps'
};
Aftership.call('GET', '/trackings', {
	query: query
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /trackings/exports
Aftership.call('GET', '/trackings/exports', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /trackings/:slug/:tracking_number
Aftership.call('GET', '/trackings/ups/1234567890', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /trackings/:slug/:tracking_number
let body = {
	'tracking': {
		'title': 'New Title'
	}
};
Aftership.call('PUT', '/trackings/ups/1234567890', {
	body: body
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// POST /trackings/:slug/:tracking_number/retrack
Aftership.call('POST', '/trackings/ups/1234567890/retrack', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /last_checkpoint/:slug/:tracking_number
Aftership.call('GET', '/last_checkpoint/ups/1234567890', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// GET /notifications/:slug/:tracking_number
Aftership.call('GET', '/notifications/ups/1234567890', function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// POST /notifications/:slug/:tracking_number/add
let body = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
Aftership.call('POST', '/notifications/ups/1234567890/add', {
	body: body
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/

/*
// POST /notifications/:slug/:tracking_number/remove
let body = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
Aftership.call('POST', '/notifications/ups/1234567890/remove', {
	body: body
}, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
});
*/
