var Aftership = require("../dist/index.js").AfterShip;
var TrackingCreateParams = require("../dist/model/tracking/tracking_create_params").TrackingCreateParams
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var aftership = new Aftership("SOME_API_KEY");

describe("Tracking", function () {
  describe("#createTracking(), validate post body", function () {
    it("should throw exception when not specify tracking number", function () {
      let expected_error =
        "ConstructorError: tracking_number";

      try {
        const param = new TrackingCreateParams({
          slug: "ups",
        });

      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });
  });

  describe("#deleteTracking(), validate url params", function () {
    it("should throw exception when both specify id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify id and tracking number at the same time";
      const param = {
        id: "5b74f4958776db0e00b6f5ed",
        slug: "ups",
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.deleteTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        slug: "ups",
      };
      try {
        await aftership.tracking.deleteTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.deleteTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });
  });

  describe("#listTrackings()", function () {
    it("should get trackings when success", function (done) {

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/trackings`).reply(
        200,
        {
          "meta": {
            "code": 200
          },
          "data": {
            "page": 1,
            "limit": 100,
            "count": 3,
            "keyword": "",
            "slug": "",
            "origin": [],
            "destination": [],
            "tag": "",
            "fields": "",
            "created_at_min": "2018-05-19T06:23:00+00:00",
            "created_at_max": "2018-08-17T06:23:59+00:00",
            "last_updated_at": null,
            "return_to_sender": [],
            "courier_destination_country_iso3": [],
            "trackings": [
              {
                "id": "5b74f4958776db0e00b6f5ed",
                "created_at": "2018-08-16T03:50:45+00:00",
                "updated_at": "2018-08-16T03:50:54+00:00",
                "last_updated_at": "2018-08-16T03:50:53+00:00",
                "tracking_number": "1111111111111",
                "slug": "fedex",
                "active": false,
                "android": [],
                "custom_fields": null,
                "customer_name": null,
                "delivery_time": 2,
                "destination_country_iso3": null,
                "courier_destination_country_iso3": null,
                "emails": [],
                "expected_delivery": null,
                "ios": [],
                "note": null,
                "order_id": null,
                "order_id_path": null,
                "origin_country_iso3": "USA",
                "shipment_package_count": 1,
                "shipment_pickup_date": "2018-07-31T06:00:00",
                "shipment_delivery_date": "2018-08-01T17:19:47",
                "shipment_type": "FedEx Home Delivery",
                "shipment_weight": null,
                "shipment_weight_unit": "kg",
                "signed_by": "Signature not required",
                "smses": [],
                "source": "web",
                "tag": "Delivered",
                "subtag": "Delivered_001",
                "subtag_message": "Delivered",
                "title": "1111111111111",
                "tracked_count": 1,
                "last_mile_tracking_supported": null,
                "language": null,
                "unique_token": "deprecated",
                "checkpoints": [
                  {
                    "slug": "fedex",
                    "city": null,
                    "created_at": "2018-08-16T03:50:47+00:00",
                    "location": null,
                    "country_name": null,
                    "message": "Shipment information sent to FedEx",
                    "country_iso3": null,
                    "tag": "InfoReceived",
                    "subtag": "InfoReceived_001",
                    "subtag_message": "Info Received",
                    "checkpoint_time": "2018-07-31T10:33:00-04:00",
                    "coordinates": [],
                    "state": null,
                    "zip": null,
                    "raw_tag": "FPX_L_RPIF"
                  }
                ],
                "subscribed_smses": [],
                "subscribed_emails": [],
                "return_to_sender": false,
                "tracking_account_number": null,
                "tracking_origin_country": null,
                "tracking_destination_country": null,
                "tracking_key": null,
                "tracking_postal_code": null,
                "tracking_ship_date": null,
                "tracking_state": null,
                "order_promised_delivery_date": null,
                "delivery_type": null,
                "pickup_location": null,
                "pickup_note": null,
                "courier_tracking_link": "https://www.fedex.com/fedextrack/?tracknumbers=111111111111&cntry_code=us",
                "first_attempted_at": "2018-08-01T13:19:47-04:00"
              }
            ]
          }
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership
        .tracking.listTrackings()
        .then(x => {
          const trackings = x.trackings
          if (trackings.length === 1) {
            done()
          } else {
            done('not found tracking list')
          }
        })
        .catch(e => done(e))
    });
  });

  describe("#getTracking({slug, tracking_number})", function () {
    it("should get trackings when success", function (done) {
      const param = {
        slug: "ups",
        tracking_number: "1234567890",
      };

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/trackings/${param.slug}/${param.tracking_number}`).reply(
        200,
        {
          "meta": {
            "code": 200
          },
          "data": {
            "tracking":
            {
              "id": "5b74f4958776db0e00b6f5ed",
              "created_at": "2018-08-16T03:50:45+00:00",
              "updated_at": "2018-08-16T03:50:54+00:00",
              "last_updated_at": "2018-08-16T03:50:53+00:00",
              "tracking_number": "1234567890",
              "slug": "ups",
              "active": false,
              "android": [],
              "custom_fields": null,
              "customer_name": null,
              "delivery_time": 2,
              "destination_country_iso3": null,
              "courier_destination_country_iso3": null,
              "emails": [],
              "expected_delivery": null,
              "ios": [],
              "note": null,
              "order_id": null,
              "order_id_path": null,
              "origin_country_iso3": "USA",
              "shipment_package_count": 1,
              "shipment_pickup_date": "2018-07-31T06:00:00",
              "shipment_delivery_date": "2018-08-01T17:19:47",
              "shipment_type": "FedEx Home Delivery",
              "shipment_weight": null,
              "shipment_weight_unit": "kg",
              "signed_by": "Signature not required",
              "smses": [],
              "source": "web",
              "tag": "Delivered",
              "subtag": "Delivered_001",
              "subtag_message": "Delivered",
              "title": "1111111111111",
              "tracked_count": 1,
              "last_mile_tracking_supported": null,
              "language": null,
              "unique_token": "deprecated",
              "checkpoints": [
                {
                  "slug": "fedex",
                  "city": null,
                  "created_at": "2018-08-16T03:50:47+00:00",
                  "location": null,
                  "country_name": null,
                  "message": "Shipment information sent to FedEx",
                  "country_iso3": null,
                  "tag": "InfoReceived",
                  "subtag": "InfoReceived_001",
                  "subtag_message": "Info Received",
                  "checkpoint_time": "2018-07-31T10:33:00-04:00",
                  "coordinates": [],
                  "state": null,
                  "zip": null,
                  "raw_tag": "FPX_L_RPIF"
                }
              ],
              "subscribed_smses": [],
              "subscribed_emails": [],
              "return_to_sender": false,
              "tracking_account_number": null,
              "tracking_origin_country": null,
              "tracking_destination_country": null,
              "tracking_key": null,
              "tracking_postal_code": null,
              "tracking_ship_date": null,
              "tracking_state": null,
              "order_promised_delivery_date": null,
              "delivery_type": null,
              "pickup_location": null,
              "pickup_note": null,
              "courier_tracking_link": "https://www.fedex.com/fedextrack/?tracknumbers=111111111111&cntry_code=us",
              "first_attempted_at": "2018-08-01T13:19:47-04:00"
            }
          }
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership
        .tracking.getTracking(param)
        .then(x => {

          const tracking = x.tracking
          if (tracking.slug === 'ups') {
            done()
          } else {
            done('not found tracking')
          }
        })
        .catch(e => done(e))
    });
  });

  describe("#updateTracking(), validate url params", function () {
    it("should throw exception when both specify id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify id and tracking number at the same time";
      const param = {
        id: "5b74f4958776db0e00b6f5ed",
        slug: "ups",
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.updateTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        slug: "ups",
      };
      try {
        await aftership.tracking.updateTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.updateTracking(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });
  });

  describe("#retrack(), validate url params", function () {
    it("should throw exception when both specify id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify id and tracking number at the same time";
      const param = {
        id: "5b74f4958776db0e00b6f5ed",
        slug: "ups",
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.retrack(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        slug: "ups",
      };
      try {
        await aftership.tracking.retrack(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        tracking_number: "1234567890",
      };
      try {
        await aftership.tracking.retrack(param);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });
  });

  describe("#markAsCompleted({slug, tracking_number}, { reason })", function () {
    it("should get tracking when success", function (done) {
      const param = {
        slug: "ups",
        tracking_number: "1234567890",
      };

      const reason = {
        reason: "DELIVERED",
      }

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/trackings/${param.slug}/${param.tracking_number}/mark-as-completed`).reply(
        200,
        {
          "meta": {
            "code": 200
          },
          "data": {
            "tracking":
            {
              "id": "5b74f4958776db0e00b6f5ed",
              "created_at": "2018-08-16T03:50:45+00:00",
              "updated_at": "2018-08-16T03:50:54+00:00",
              "last_updated_at": "2018-08-16T03:50:53+00:00",
              "tracking_number": "1234567890",
              "slug": "ups",
              "active": false,
              "android": [],
              "custom_fields": null,
              "customer_name": null,
              "delivery_time": 2,
              "destination_country_iso3": null,
              "courier_destination_country_iso3": null,
            }
          }
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership
        .tracking.markAsCompleted(param, reason)
        .then(x => {
          const tracking = x.tracking
          if (tracking) {
            done()
          } else {
            done('not return tracking after markAsCompleted')
          }
        })
        .catch(e => done(e))
    });
  });

  describe("#markAsCompleted(), validate params", function () {
    it("should throw exception when both specify id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify id and tracking number at the same time";
      const param = {
        id: "5b74f4958776db0e00b6f5ed",
        slug: "ups",
        tracking_number: "1234567890",
      };

      const reason = {
        reason: "DELIVERED",
      }

      try {
        await aftership.tracking.markAsCompleted(param, reason);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        slug: "ups",
      };

      const reason = {
        reason: "DELIVERED",
      }

      try {
        await aftership.tracking.markAsCompleted(param, reason);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify both slug and tracking number";
      const param = {
        tracking_number: "1234567890",
      };

      const reason = {
        reason: "DELIVERED",
      }
      
      try {
        await aftership.tracking.markAsCompleted(param, reason);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should throw exception when reason is incorrect", async function () {
      let expected_error =
        `HandlerError: Reason must be one of "DELIVERED", "LOST" or "RETURNED_TO_SENDER"`;
      const param = {
        slug: "ups",
        tracking_number: "1234567890",
      };

      const reason = {
        reason: "INVALID REASON",
      }
      
      try {
        await aftership.tracking.markAsCompleted(param, reason);
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });
  });
});