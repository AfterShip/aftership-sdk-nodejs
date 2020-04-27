// const { AfterShip } = require('../dist');
// const aftership = new AfterShip('');

describe.skip('trackings', () => {
  describe('createTrackings', () => {
    test('create tracking successfully', async () => {
      const payload = {
        slug: 'usps',
        tracking_number: (new Date()).valueOf().toString(),
        title: 'Title Name',
        smses: ['+18555072509', '+18555072501'],
        emails: ['email@yourdomain.com', 'another_email@yourdomain.com'],
        order_id: 'ID 1234',
        order_id_path: 'http://www.aftership.com/order_id=1234',
        custom_fields: {
          product_name: 'iPhone Case',
          product_price: 'USD19.99',
        },
        language: 'en',
        order_promised_delivery_date: '2019-05-20',
        delivery_type: 'pickup_at_store',
        pickup_location: 'Flagship Store',
        pickup_note: 'Reach out to our staffs when you arrive our stores for shipment pickup',
        tracking_destination_country: 'HKG'
      };

      const newTracking = await aftership.tracking.createTracking({
        tracking: payload
      });

      const tracking = newTracking.tracking;
      expect(tracking.slug).toBe(payload.slug);
      expect(tracking.tracking_number).toBe(payload.tracking_number);
      expect(tracking.tracking_destination_country).toBe(payload.tracking_destination_country);
    });

    test('create tracking bad format', async () => {
      const payload = {
        slug: 'dhl',
        tracking_number: '62541256321'
      };

      try {
        await aftership.tracking.createTracking({
          tracking: payload
        });
      } catch (e) {
        expect(e.type).toBe('BadRequest');
        expect(e.code).toBe(4017);
        expect(e.data.tracking).toEqual(payload);
        expect(JSON.parse(e.responseBody).meta.code).toEqual(4017);
      }
    });
  });
  describe('listTrackings', () => {
    test('listTrackings successfully', async () => {
        const results = await aftership.tracking.listTrackings();
        expect(typeof results.page).toBe('number');
        expect(Array.isArray(results.trackings)).toBeTruthy();
    });
  });
  describe('getTracking', () => {
    test('simple getTracking', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017'
      };
      const result = await aftership.tracking.getTracking(query);
      expect(result.tracking.slug).toBe(query.slug);
      expect(result.tracking.tracking_number).toBe(query.tracking_number);
    });

    test('simple getTracking', async () => {
      const query = {
        id: 'nzg2id4lm0yz1k9cgfv4s02m'
      };
      const result = await aftership.tracking.getTracking(query);
      expect(result.tracking.id).toBe(query.id);
    });

    test('getTracking error HandlerError', async () => {
      const query = {
        tracking_number: '300000000017'
      };

      try {
        await aftership.tracking.getTracking(query);
      } catch (e) {
        expect(e.type).toBe('HandlerError');
      }
    });

    test('getTracking error BadRequest', async () => {
      const query = {
        slug: 'postnl',
        tracking_number: '300000000017'
      };

      try {
        await aftership.tracking.getTracking(query);
      } catch (e) {
        expect(e.type).toBe('BadRequest');
        expect(e.code).toBe(4009);
        expect(JSON.parse(e.responseBody).meta.code).toEqual(4009);
      }
    });

    test('getTracking test optional parameter', async () => {
      const query = {
        slug: 'postnl',
        tracking_number: '132485736098',
        optional_parameters: {
          tracking_postal_code: '12345'
        }
      };

      const result = await aftership.tracking.getTracking(query);
      expect(result.tracking.slug).toBe(query.slug);
      expect(result.tracking.tracking_number).toBe(query.tracking_number);
      expect(result.tracking.tracking_postal_code).toBe(query.optional_parameters.tracking_postal_code);
    });
  });
  describe('updateTracking', () => {
    test('updateTracking successfully', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017'
      };
      const payload = {
        tracking: {
          title: (new Date()).valueOf().toString()
        }
      };
      const result = await aftership.tracking.updateTracking(query, payload);
      expect(result.tracking.slug).toBe(query.slug);
      expect(result.tracking.tracking_number).toBe(query.tracking_number);
      expect(result.tracking.title).toBe(payload.tracking.title);
    });

    test('updateTracking failed', async () => {
      const query = {
        slug: 'usps'
      };
      const payload = {
        tracking: {
          title: (new Date()).valueOf().toString()
        }
      };
      try {
        await aftership.tracking.updateTracking(query, payload);
      } catch (e) {
        expect(e.type).toBe('HandlerError');
      }
    });
  });
});
describe.skip('couriers', () => {
  describe('listCouriers', () => {
    test('listCouriers successfully', async () => {
      const couriers = await aftership.courier.listCouriers();
      expect(typeof couriers.total).toBe('number');
      expect(Array.isArray(couriers.couriers)).toBeTruthy();
    });
  });
  describe('listAllCouriers', () => {
    test('listAllCouriers successfully', async () => {
      const couriers = await aftership.courier.listAllCouriers();
      expect(typeof couriers.total).toBe('number');
      expect(Array.isArray(couriers.couriers)).toBeTruthy();
    });
  });
  describe('detectCouriers', () => {
    test('detectCouriers successfully', async () => {
      const payload = {
        tracking: {
          tracking_number: '123412341234'
        }
      };
      const couriers = await aftership.courier.detectCouriers(payload);
      expect(typeof couriers.total).toBe('number');
      expect(Array.isArray(couriers.couriers)).toBeTruthy();
    });
    test('detectCouriers with limited slug group successfully', async () => {
      const payload = {
        tracking: {
          tracking_number: '123412341234',
          slug: [
            'fedex',
            'australia-post-api'
          ]
        }
      };
      const couriers = await aftership.courier.detectCouriers(payload);
      expect(typeof couriers.total).toBe('number');
      expect(Array.isArray(couriers.couriers)).toBeTruthy();
    });
  });
});
describe.skip('last_checkpoint', () => {
  describe('getLastCheckpoint', () => {
    test('get lastCheckpoint successfully', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017',
      };
      const result = await aftership.last_checkpoint.getLastCheckpoint(query);
      expect(typeof result.id).toBe('string');
      expect(result.tracking_number).toBe(query.tracking_number);
      expect(result.slug).toBe(query.slug);
      expect(typeof result.checkpoint).toBe('object');
    });
  });
});
describe.skip('notification', () => {
  describe('getNotification', () => {
    test('get getNotification successfully', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017',
      };
      const result = await aftership.notification.getNotification(query);
      expect(typeof result.notification).toBe('object');
    });
  });
  describe('addNotification', () => {
    test('get addNotification successfully', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017',
      };
      const payload = {
        notification: {
          emails: [
            'abc@abc.com'
          ],
          smses: [
            '+15553750'
          ]
        }
      };
      const result = await aftership.notification.addNotification(query, payload);
      expect(typeof result.notification).toBe('object');
      expect(result.notification.emails.indexOf(payload.notification.emails[0])).toBeGreaterThan(-1);
    });
  });
  describe('removeNotification', () => {
    test('get removeNotification successfully', async () => {
      const query = {
        slug: 'usps',
        tracking_number: '300000000017',
      };
      const payload = {
        notification: {
          emails: [
            'abc@abc.com'
          ],
          smses: [
            '+15553750'
          ]
        }
      };
      const result = await aftership.notification.removeNotification(query, payload);
      expect(typeof result.notification).toBe('object');
    });
  });
});
