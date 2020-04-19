var Aftership = require("../dist/index.js").AfterShip;
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var CourierDetectRequest = require("../dist/model/courier/courier_detect_request.js").CourierDetectRequest;

var aftership = new Aftership("SOME_API_KEY");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock listCouriers
mock.onGet('/couriers').reply(
  200,
  {
    meta: {
      code: 200,
    },
    data: {
      total: 2,
      couriers: [
        {
          slug: "dhl",
          name: "DHL",
          phone: "+1 800 225 5345",
          other_name: "DHL Express",
          web_url: "http://www.dhl.com/",
          required_fields: [],
          optional_fields: [],
        },
        {
          slug: "deutsch-post",
          name: "Deutsche Post Mail",
          phone: "+49 (0) 180 2 000221",
          other_name: "dpdhl",
          web_url: "http://www.deutschepost.de/",
          required_fields: ["tracking_ship_date"],
          optional_fields: [],
        },
      ],
    },
  },
  {
    "x-ratelimit-reset": 1406096275,
    "x-ratelimit-limit": 10,
    "x-ratelimit-remaining": 9,
  }
);

// Mock listAllCouriers
mock.onGet('/couriers/all').reply(
  200,
  {
    meta: {
      code: 200,
    },
    data: {
      total: 3,
      couriers: [
        {
          slug: "india-post-int",
          name: "India Post International",
          phone: "+91 1800 11 2011",
          other_name: "भारतीय डाक, Speed Post & eMO, EMS, IPS Web",
          web_url: "http://www.indiapost.gov.in/",
          required_fields: [],
          optional_fields: [],
        },
        {
          slug: "italy-sda",
          name: "Italy SDA",
          phone: "+39 199 113366",
          other_name: "SDA Express Courier",
          web_url: "http://www.sda.it/",
          required_fields: [],
          optional_fields: [],
        },
        {
          slug: "bpost",
          name: "Belgium Post",
          phone: "+32 2 276 22 74",
          other_name: "bpost, Belgian Post",
          web_url: "http://www.bpost.be/",
          required_fields: [],
          optional_fields: [],
        },
      ],
    },
  },
  {
    "x-ratelimit-reset": 1406096275,
    "x-ratelimit-limit": 10,
    "x-ratelimit-remaining": 9,
  }
);

// Mock detectCouriers
mock.onPost('/couriers/detect').reply(
  200,
  {
    meta: {
      code: 200,
    },
    data: {
      total: 2,
      couriers: [
        {
          slug: "fedex",
          name: "FedEx",
          phone: "+1 800 247 4747",
          other_name: "Federal Express",
          web_url: "http://www.fedex.com/",
          required_fields: [],
          optional_fields: [],
        },
        {
          slug: "dx",
          name: "DX",
          phone: "+44 0844 826 1178",
          other_name: "DX Freight",
          web_url: "https://www.thedx.co.uk/",
          required_fields: ["tracking_postal_code"],
          optional_fields: [],
        },
      ],
    },
  },
  {
    "x-ratelimit-reset": 1406096275,
    "x-ratelimit-limit": 10,
    "x-ratelimit-remaining": 9,
  }
);

describe("Courier", function () {
  describe("#listCouriers()", function () {
    this.timeout(30000);

    it("should return couriers and total with Promise", function (done) {
      aftership.courier
        .listCouriers()
        .then((result) => {
          const { total, couriers } = (result && result.data) || {};
          console.log("Promise", total, couriers.length);
          if (couriers && couriers.length > 0 && total === couriers.length) {
            done();
          } else {
            done("not found data");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should return couriers and total with Async/Await", async function (done) {
      try {
        let result = await aftership.courier.listCouriers();
        const { total, couriers } = (result && result.data) || {};
        console.log("Async/Await", total, couriers.length);
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done();
        } else {
          done("not found data");
        }
      } catch (e) {
        done(e.message);
      }
    });

    it("should get rate-limit", function (done) {
      aftership.courier
        .listCouriers()
        .then((_) => {
          const rateLimit = aftership.getRateLimiting();
          if (rateLimit && rateLimit.limit) {
            done();
          } else {
            done("not found rate-limit");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should get courier objects", function (done) {
      aftership.courier
        .listCouriers()
        .then((result) => {
          const { couriers } = (result && result.data) || {};
          if (couriers && couriers.length > 0 && couriers[0].slug === 'dhl') {
            done();
          } else {
            done("not found couriers");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#listAllCouriers()", function () {
    this.timeout(30000);

    it("should return couriers and total with Promise", function (done) {
      aftership.courier
        .listAllCouriers()
        .then((result) => {
          const { total, couriers } = (result && result.data) || {};
          console.log("Promise", total, couriers.length);
          if (couriers && couriers.length > 0 && total === couriers.length) {
            done();
          } else {
            done("not found data");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should return couriers and total with Async/Await", async function (done) {
      try {
        let result = await aftership.courier.listAllCouriers();
        const { total, couriers } = (result && result.data) || {};
        console.log("Async/Await", total, couriers.length);
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done();
        } else {
          done("not found data");
        }
      } catch (e) {
        done(e.message);
      }
    });

    it("should get courier objects", function (done) {
      aftership.courier
        .listAllCouriers()
        .then((result) => {
          const { couriers } = (result && result.data) || {};
          if (couriers && couriers.length > 0 && couriers[0].slug === 'india-post-int') {
            done();
          } else {
            done("not found couriers");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#detectCouriers()", function () {
    this.timeout(30000);
    const tracking = {
      tracking_number: '906587618687',
      tracking_postal_code: 'DA15BU',
    }
    const payload = new CourierDetectRequest(tracking);

    it("should return couriers and total with Promise", function (done) {
      aftership.courier
        .detectCouriers(payload)
        .then((result) => {
          const { total, couriers } = (result && result.data) || {};
          console.log("Promise", total, couriers.length);
          if (couriers && couriers.length >= 0 && total === couriers.length) {
            done();
          } else {
            done("not found data");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should return couriers and total with Async/Await", async function (done) {
      try {
        let result = await aftership.courier.detectCouriers(payload);
        const { total, couriers } = (result && result.data) || {};
        console.log("Async/Await", total, couriers.length);
        if (couriers && couriers.length >= 0 && total === couriers.length) {
          done();
        } else {
          done("not found data");
        }
      } catch (e) {
        done(e.message);
      }
    });

    it("should get courier objects", function (done) {
      aftership.courier
        .detectCouriers(payload)
        .then((result) => {
          const { couriers } = (result && result.data) || {};
          if (couriers && couriers.length > 0 && couriers[0].slug === 'fedex') {
            done();
          } else {
            done("not found couriers");
          }
        })
        .catch((e) => done(e.message));
    });
  });
});
