"use strict";

const API_KEY = "SOME_API_KEY";
const { AfterShip } = require('../dist/index.js');

const aftership = new AfterShip(API_KEY);

// POST /trackings
let payload = {
  tracking: {
    slug: "dhl",
    tracking_number: "123456789",
    title: "Title Name",
    smses: ["+18555072509", "+18555072501"],
    emails: ["email@yourdomain.com", "another_email@yourdomain.com"],
    order_id: "ID 1234",
    order_id_path: "http://www.aftership.com/order_id=1234",
    custom_fields: {
      product_name: "iPhone Case",
      product_price: "USD19.99",
    },
    language: "en",
    order_promised_delivery_date: "2019-05-20",
    delivery_type: "pickup_at_store",
    pickup_location: "Flagship Store",
    pickup_note:
      "Reach out to our staffs when you arrive our stores for shipment pickup",
  },
};
aftership.tracking
  .createTracking(payload)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));


// DELETE /trackings/:tracking_id
aftership.tracking
  .deleteTracking({
    id: 'id1234567890'
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));


// GET /trackings
const query = {
  slug: 'dhl,ups,usps'
};
aftership.tracking
  .listTrackings(query)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));


// GET /trackings/:tracking_id
aftership.tracking
  .getTracking({
    id: "id1234567890"
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));

// PUT /trackings/:tracking_id
payload = {
  tracking: {
    title: "New Title",
  },
};
aftership.tracking
  .updateTracking({
    id: "id1234567890"
  }, payload)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));


// POST /trackings/:tracking_id
aftership.tracking
  .retrack({
    id: "id1234567890"
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));


// POST /trackings/:tracking_id/mark-as-completed
aftership.tracking
  .markAsCompleted({
    id: "id1234567890"
  }, {
    reason: "DELIVERED"
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
