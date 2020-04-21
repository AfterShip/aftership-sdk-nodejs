var chai = require("chai");
var expect = chai.expect;
var AfterShip = require("../dist/index.js").AfterShip;

let api_key = "SOME_API_KEY";

describe("Test constructor", function () {
  describe("Test construct correct cases", function () {
    it("should construct with api_key correctly", function () {
      let aftership = new AfterShip(api_key);
      expect(aftership.apiKey).to.equal(api_key);
      expect(aftership.endpoint).to.equal("https://api.aftership.com/v4");
    });
  });

  describe("Test constructor error", function () {
    it("should return error, if api_key is null/undefined/not string", function () {
      let expected_error = "ConstructorError: Invalid API key";
      try {
        new AfterShip();
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        new AfterShip(null);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        new AfterShip(999);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        new AfterShip(true);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        new AfterShip(false);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        new AfterShip({});
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it('should return error, if options is not null/undefined/object', function () {
			let expected_error = 'ConstructorError: Invalid Options value';
			try {
				new AfterShip(api_key, 999);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, true);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, false);
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, 'options');
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});

		it('should return error, if endpoint is defined but not string', function () {
			let expected_error = 'ConstructorError: Invalid Endpoint value';
			try {
				new AfterShip(api_key, {endpoint: 999});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, {endpoint: true});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, {endpoint: false});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
			try {
				new AfterShip(api_key, {endpoint: {}});
			} catch (e) {
				expect(e.message).to.equal(expected_error);
			}
		});
  });
});
