var util = require("../dist/lib/util.js");

describe("Test util", function () {
  describe("Test correct cases in buildTrackingUrl()", function () {
    it("should build url with slug and tracking_number correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
      });

      expect(url).toEqual(`${slug}/${tracking_number}`);
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

      expect(url).toEqual(
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

      expect(url).toEqual(
        `${slug}/${tracking_number}?tracking_postal_code=${optional_parameters.tracking_postal_code}&tracking_ship_date=${optional_parameters.tracking_ship_date}`
      );
    });

    it("should build url with slug, tracking_number and sub path correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const sub_path = "retrack";
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
      }, sub_path);

      expect(url).toEqual(
        `${slug}/${tracking_number}/${sub_path}`
      );
    });

    it("should build url with slug, tracking_number, sub path and optional parameters correctly", function () {
      const slug = "ups";
      const tracking_number = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
      };
      const sub_path = "retrack";
      const url = util.buildTrackingUrl({
        slug,
        tracking_number,
        optional_parameters,
      }, sub_path);

      expect(url).toEqual(
        `${slug}/${tracking_number}/${sub_path}?tracking_postal_code=${optional_parameters.tracking_postal_code}`
      );
    });

    it("should build url with id correctly", function () {
      const id = "1234567890";
      const url = util.buildTrackingUrl({
        id,
      });

      expect(url).toEqual(id);
    });

    it("should build url with id and one optional parameter correctly", function () {
      const id = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
      };
      const url = util.buildTrackingUrl({
        id,
        optional_parameters,
      });

      expect(url).toEqual(
        `${id}?tracking_postal_code=${optional_parameters.tracking_postal_code}`
      );
    });

    it("should build url with id and multi optional parameters correctly", function () {
      const id = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
        tracking_ship_date: "20200423",
      };
      const url = util.buildTrackingUrl({
        id,
        optional_parameters,
      });

      expect(url).toEqual(
        `${id}?tracking_postal_code=${optional_parameters.tracking_postal_code}&tracking_ship_date=${optional_parameters.tracking_ship_date}`
      );
    });

    it("should build url with id and sub path correctly", function () {
      const id = "1234567890";
      const sub_path = "retrack";
      const url = util.buildTrackingUrl({
        id,
      }, sub_path);

      expect(url).toEqual(
        `${id}/${sub_path}`
      );
    });

    it("should build url with id, sub path and optional parameters correctly", function () {
      const id = "1234567890";
      const optional_parameters = {
        tracking_postal_code: "1234",
      };
      const sub_path = "retrack";
      const url = util.buildTrackingUrl({
        id,
        optional_parameters,
      }, sub_path);

      expect(url).toEqual(
        `${id}/${sub_path}?tracking_postal_code=${optional_parameters.tracking_postal_code}`
      );
    });
  });

  describe("Test error in buildTrackingUrl()", function () {
    it("should return error, if id, slug and trackibng_number are empty", function () {
      let expected_error =
        "HandlerError: You must specify the id or slug and tracking number";
      try {
        util.buildTrackingUrl();
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should return error, if both id and trackibng_number are specificed", function () {
      let expected_error =
        'HandlerError: Cannot specify id and tracking number at the same time';
      try {
        util.buildTrackingUrl({
          id: "5b74f4958776db0e00b6f5ed",
          tracking_number: "1234567890",
        });
      } catch (e) {
        expect(e.message).toEqual(expected_error);
      }
    });

    it("should return error, if all id. slug and trackibng_number are specificed", function () {
      let expected_error =
        'HandlerError: Cannot specify id and tracking number at the same time';
      try {
        util.buildTrackingUrl({
          id: "5b74f4958776db0e00b6f5ed",
          slug: "ups",
          tracking_number: "1234567890",
        });
      } catch (e) {
        expect(e.message).toEqual(expected_error);
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
        expect(e.message).toEqual(expected_error);
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
        expect(e.message).toEqual(expected_error);
      }
    });
  });
});
