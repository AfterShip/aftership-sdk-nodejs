const chai = require("chai");
const expect = chai.expect;
const Aftership = require("../dist/index.js").AfterShip;

let api_key = "SOME_API_KEY";

describe("Test constructor", function () {
  describe("Test construct correct cases", function () {
    it("should construct with api_key correctly", function () {
      let aftership = Aftership(api_key);
      expect(aftership.apiKey).to.equal(api_key);
      expect(aftership.endpoint).to.equal("https://api.aftership.com/v4");
    });
  });

  describe("Test constructor error", function () {
    it("should return error, if api_key is null/undefined/not string", function () {
      let expected_error = "ConstructorError: Invalid API key";
      try {
        Aftership();
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        Aftership(null);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        Aftership(999);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        Aftership(true);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        Aftership(false);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
      try {
        Aftership({});
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });
  });
});
