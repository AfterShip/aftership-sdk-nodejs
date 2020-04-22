'use strict';

const API_KEY = 'SOME_API_KEY';
const { AfterShip } = require('../dist/index.js');

const aftership = new AfterShip(API_KEY);

let param = {
  slug: "ups",
  tracking_number: "1234567890",
};

// GET /notifications/:slug/:tracking_number
aftership.notification.getNotification(param)
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/add
let notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.addNotification(param, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/remove
notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.removeNotification(param, notification)
  .then(result => console.log(result))
  .catch(e => console.log(e));

