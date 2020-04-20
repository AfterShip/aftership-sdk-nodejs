'use strict';

const API_KEY = 'SOME_API_KEY';
const AfterShip = require('../dist/index.js').AfterShip;

const aftership = new AfterShip(API_KEY);

let paramWithTrackingNumber = {
  slug: "ups",
  tracking_number: "1234567890",
};

const paramWithTrackingId = {
  tracking_id: "5b74f4958776db0e00b6f5ed",
};

// GET /notifications/:slug/:tracking_number
aftership.notification.getNotification(paramWithTrackingNumber)
  .then(result => console.log(result))
  .catch(e => console.log(e));

// GET /notifications/:tracking_id
aftership.notification.getNotification(paramWithTrackingId)
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/add
let notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.addNotification(paramWithTrackingNumber, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));

// POST /notifications/:tracking_id/add
aftership.notification.addNotification(paramWithTrackingId, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/remove
notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.removeNotification(paramWithTrackingNumber, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));

// POST /notifications/:tracking_id/remove
aftership.notification.removeNotification(paramWithTrackingId, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));
