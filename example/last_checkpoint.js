'use strict';

const API_KEY = 'SOME_API_KEY';
const { AfterShip } = require('../dist/index.js');

const aftership = new AfterShip(API_KEY);

// GET /last_checkpoint/:slug/:tracking_number
aftership.last_checkpoint.getLastCheckPoint({
    slug: 'ups',
    tracking_number: '1234567890',
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));

// GET /last_checkpoint/:tracking_id
aftership.last_checkpoint.getLastCheckPoint({
    tracking_id: '5b74f4958776db0e00b6f5ed',
  })
  .then(result => console.log(result))
  .catch(e => console.log(e));
