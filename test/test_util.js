var chai = require("chai");
var expect = chai.expect;
var util = require("../dist/lib/util.js");

let api_key = "SOME_API_KEY";

describe("Test util", function () {
  describe("Test correct cases in buildTrackingUrl()", function () {
    it("should build url with slug and tracking_number correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
      });

      expect(url).to.equal(`${slug}/${tracking_number}`);
    });

    it("should build url with slug, tracking_number and one optional parameter correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
      };
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
        optional_parameters,
      });

      expect(url).to.equal(
        `${slug}/${tracking_number}?tracking_postal_code=${optional_parameters.tracking_postal_code}`
      );
    });

    it("should build url with slug, tracking_number and multi optional parameters correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
        tracking_ship_date: "20200423",
      };
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
        optional_parameters,
      });

      expect(url).to.equal(
        `${slug}/${tracking_number}?tracking_postal_code=${optional_parameters.tracking_postal_code}&tracking_ship_date=${optional_parameters.tracking_ship_date}`
      );
    });

    it("should build url with tracking_id correctly", function () {
      const tracking_id = "1234567890";
      const url = util.buildTrackingUrl({
        tracking_id,
      });

      expect(url).to.equal(tracking_id);
    });

    it("should build url with tracking_id and one optional parameter correctly", function () {
      const tracking_id = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
      };
      const url = util.buildTrackingUrl({
        tracking_id,
        optional_parameters,
      });

      expect(url).to.equal(
        `${tracking_id}?tracking_postal_code=${optional_parameters.tracking_postal_code}`
      );
    });

    it("should build url with tracking_id and multi optional parameters correctly", function () {
      const tracking_id = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
        tracking_ship_date: "20200423",
      };
      const url = util.buildTrackingUrl({
        tracking_id,
        optional_parameters,
      });

      expect(url).to.equal(
        `${tracking_id}?tracking_postal_code=${optional_parameters.tracking_postal_code}&tracking_ship_date=${optional_parameters.tracking_ship_date}`
      );
    });
  });

  describe("Test error in buildTrackingUrl()", function () {
    it("should return error, if tracking_id, slug and trackibng_number are empty", function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      try {
        util.buildTrackingUrl();
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should return error, if both tracking_id and trackibng_number are specificed", function () {
      let expected_error =
        'HandlerError: Cannot specify tracking number and tracking id at the same time';
      try {
        util.buildTrackingUrl({
          tracking_id: "5b74f4958776db0e00b6f5ed",
          tracking_number: "1234567890",
        });
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should return error, if all tracking_id. slug and trackibng_number are specificed", function () {
      let expected_error =
        'HandlerError: Cannot specify tracking number and tracking id at the same time';
      try {
        util.buildTrackingUrl({
          tracking_id: "5b74f4958776db0e00b6f5ed",
          slug: "ups",
          tracking_number: "1234567890",
        });
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should return error, if only trackibng_number is specificed", function () {
      let expected_error =
        'HandlerError: You must specify both slug and tracking number';
      try {
        util.buildTrackingUrl({
          tracking_number: "1234567890",
        });
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should return error, if only slug is specificed", function () {
      let expected_error =
        'HandlerError: You must specify both slug and tracking number';
      try {
        util.buildTrackingUrl({
          slug: "ups",
        });
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });
  });
});
