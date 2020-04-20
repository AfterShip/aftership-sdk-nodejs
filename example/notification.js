'use strict';

const API_KEY = 'SOME_API_KEY';
const AfterShip = require('../dist/index.js').AfterShip;

const aftership = new AfterShip(API_KEY);

// GET /notifications/:slug/:tracking_number
aftership.notification.getNotification(null, 'ups', '1234567890')
  .then(result => console.log(result))
  .catch(e => console.log(e));

// GET /notifications/:tracking_id
aftership.notification.getNotification('5b74f4958776db0e00b6f5ed')
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/add
let notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.addNotification(notification, null, 'ups', '1234567890', )
  .then(result => console.log(result))
  .catch(e => console.log(e));

// POST /notifications/:tracking_id/add
aftership.notification.addNotification(notification, '5b74f4958776db0e00b6f5ed')
  .then(result => console.log(result))
  .catch(e => console.log(e));


// POST /notifications/:slug/:tracking_number/remove
notification = {
	'notification': {
		'emails': ['user1@gmail.com','user2@gmail.com','invalid EMail @ Gmail. com'],
		'smses': ['+85291239123', '+85261236123', 'Invalid Mobile Phone Number']
	}
};
aftership.notification.removeNotification(notification, null, 'ups', '1234567890')
  .then(result => console.log(result))
  .catch(e => console.log(e));

// POST /notifications/:tracking_id/remove
aftership.notification.removeNotification(notification, '5b74f4958776db0e00b6f5ed')
  .then(result => console.log(result))
  .catch(e => console.log(e));
