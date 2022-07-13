var Aftership = require("../dist/index.js").AfterShip;
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var aftership = new Aftership("SOME_API_KEY");

describe("EstimatedDeliveryDate", function () {
  describe("#batchPredict()", function () {
    var mock = new MockAdapter(axios);
    it("should get estimated_delivery_dates when success", async function () {
      mock.onPost('/estimated-delivery-date/predict-batch').reply(
        200,
        {
          "meta": {
            "code": 200
          },
          "data": {
            "estimated_delivery_dates": [
              {
                "slug": "fedex",
                "service_type_name": "FEDEX HOME DELIVERY",
                "origin_address": {
                  "country": "USA",
                  "state": "WA",
                  "postal_code": "98108",
                  "raw_location": "Seattle, Washington, 98108, USA, United States",
                  "city": null
                },
                "destination_address": {
                  "country": "USA",
                  "state": "CA",
                  "postal_code": "92019",
                  "raw_location": "El Cajon, California, 92019, USA, United States",
                  "city": null
                },
                "weight": {
                  "unit": "kg",
                  "value": 11
                },
                "package_count": 1,
                "pickup_time": "2021-07-01 15:00:00",
                "estimated_pickup": null,
                "estimated_delivery_date": "2021-07-05",
                "estimated_delivery_date_min": "2021-07-04",
                "estimated_delivery_date_max": "2021-07-05"
              }
            ]
          }
        }
      );

      const data = {
        estimated_delivery_dates: [{
          "slug": "fedex",
          "service_type_name": "FEDEX HOME DELIVERY",
          "origin_address": {
            "country": "USA",
            "state": "WA",
            "postal_code": "98108",
            "raw_location": "Seattle, Washington, 98108, USA, United States"
          },
          "destination_address": {
            "country": "USA",
            "state": "CA",
            "postal_code": "92019",
            "raw_location": "El Cajon, California, 92019, USA, United States"
          },
          "weight": {
            "unit": "kg",
            "value": 11
          },
          "package_count": 1,
          "pickup_time": "2021-07-01 15:00:00"
        }]
      };

      const result = await aftership.estimated_delivery_date.batchPredict(data);
      expect(typeof result.estimated_delivery_dates).toBe('object');
      expect(result.estimated_delivery_dates.length).toEqual(1);
    });

    it("should throw an error", async function () {
      mock.onPost('/estimated-delivery-date/predict-batch').reply(
        400,
        {
          "meta": {
            "code": 400
          },
          "data": {
            "estimated_delivery_dates": []
          }
        }
      );

      const data = {
        estimated_delivery_dates: []
      };

      try {
        await aftership.estimated_delivery_date.batchPredict(data);
      } catch (e) {
        expect(e.code).toEqual(400);
      }
    })
  });
});
