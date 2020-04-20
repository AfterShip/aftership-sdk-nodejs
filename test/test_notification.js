var Aftership = require("../dist/index.js").AfterShip;
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var chai = require("chai");

var expect = chai.expect;
var aftership = new Aftership("SOME_API_KEY");

describe("Notification", function () {
  describe("#getNotification(), validate params", function () {
    it("should throw exception when not specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      try {
        await aftership.notification.getNotification();
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when both specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify tracking number and tracking id at the same time";
      const tracking_id = "5b74f4958776db0e00b6f5ed";
      const slug = "ups";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.getNotification(
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "ups";
      const tracking_number = "";
      try {
        await aftership.notification.getNotification(
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.getNotification(
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });
  });

  describe("#getNotification(slug, tracking_number)", function () {
    it("should get notification when success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/notifications/${slug}/${tracking_number}`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: ["user1@gmail.com", "user2@gmail.com"],
              smses: ["+85291239123", "+85261236123"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .getNotification(null, slug, tracking_number)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (
              !emails ||
              emails[0] != "user1@gmail.com" ||
              emails[1] != "user2@gmail.com"
            ) {
              done("not get emails in notification");
            } else if (
              !smses ||
              smses[0] != "+85291239123" ||
              smses[1] != "+85261236123"
            ) {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should get error meta when no success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/notifications/${slug}/${tracking_number}`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .getNotification(null, slug, tracking_number)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#getNotification(tracking_id)", function () {
    it("should get notification when success", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/notifications/${tracking_id}`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: ["user1@gmail.com", "user2@gmail.com"],
              smses: ["+85291239123", "+85261236123"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .getNotification(tracking_id)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (
              !emails ||
              emails[0] != "user1@gmail.com" ||
              emails[1] != "user2@gmail.com"
            ) {
              done("not get emails in notification");
            } else if (
              !smses ||
              smses[0] != "+85291239123" ||
              smses[1] != "+85261236123"
            ) {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should catch exception when error", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onGet(`/notifications/${tracking_id}`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .getNotification(tracking_id)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#addNotification(), validate params", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };

    it("should throw exception when not specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      try {
        await aftership.notification.addNotification(notification);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when both specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify tracking number and tracking id at the same time";
      const tracking_id = "5b74f4958776db0e00b6f5ed";
      const slug = "ups";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.addNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "ups";
      const tracking_number = "";
      try {
        await aftership.notification.addNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.addNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });
  });

  describe("#addNotification(slug, tracking_number)", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "Invalid Mobile Phone Number"],
      },
    };

    it("should get notification when success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${slug}/${tracking_number}/add`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: [],
              smses: ["+85261236888"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .addNotification(notification, null, slug, tracking_number)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (!emails) {
              done("not get emails in notification");
            } else if (!smses || smses[0] != "+85261236888") {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should get error meta when no success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${slug}/${tracking_number}/add`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .addNotification(notification, null, slug, tracking_number)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#addNotification(tracking_id)", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "Invalid Mobile Phone Number"],
      },
    };

    it("should get notification when success", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${tracking_id}/add`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: [],
              smses: ["+85261236888"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .addNotification(notification, tracking_id)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (!emails) {
              done("not get emails in notification");
            } else if (!smses || smses[0] != "+85261236888") {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should catch exception when error", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${tracking_id}/add`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .addNotification(notification, tracking_id)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#removeNotification(), validate params", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };

    it("should throw exception when not specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      try {
        await aftership.notification.removeNotification(notification);
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when both specify tracking id and tracking number", async function () {
      let expected_error =
        "HandlerError: Cannot specify tracking number and tracking id at the same time";
      const tracking_id = "5b74f4958776db0e00b6f5ed";
      const slug = "ups";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.removeNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify slug", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "ups";
      const tracking_number = "";
      try {
        await aftership.notification.removeNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });

    it("should throw exception when only specify tracking number", async function () {
      let expected_error =
        "HandlerError: You must specify the tracking number or tracking id";
      const tracking_id = "";
      const slug = "";
      const tracking_number = "1234567890";
      try {
        await aftership.notification.removeNotification(
          notification,
          tracking_id,
          slug,
          tracking_number
        );
      } catch (e) {
        expect(e.message).to.equal(expected_error);
      }
    });
  });

  describe("#removeNotification(slug, tracking_number)", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };

    it("should get notification when success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${slug}/${tracking_number}/remove`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: ["user1@gmail.com", "user2@gmail.com"],
              smses: ["+85291239123", "+85261236123"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .removeNotification(notification, null, slug, tracking_number)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (
              !emails ||
              emails[0] != "user1@gmail.com" ||
              emails[1] != "user2@gmail.com"
            ) {
              done("not get emails in notification");
            } else if (
              !smses ||
              smses[0] != "+85291239123" ||
              smses[1] != "+85261236123"
            ) {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should get error meta when no success", function (done) {
      const slug = "ups";
      const tracking_number = "1234567890";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${slug}/${tracking_number}/remove`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .removeNotification(notification, null, slug, tracking_number)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });

  describe("#removeNotification(tracking_id)", function () {
    const notification = {
      notification: {
        emails: [
          "user1@gmail.com",
          "user2@gmail.com",
          "invalid EMail @ Gmail. com",
        ],
        smses: ["+85291239123", "+85261236123", "Invalid Mobile Phone Number"],
      },
    };

    it("should get notification when success", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${tracking_id}/remove`).reply(
        200,
        {
          meta: {
            code: 200,
          },
          data: {
            notification: {
              emails: ["user1@gmail.com", "user2@gmail.com"],
              smses: ["+85291239123", "+85261236123"],
            },
          },
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .removeNotification(notification, tracking_id)
        .then((result) => {
          if (result && result.data && result.data.notification) {
            const emails = result.data.notification.emails;
            const smses = result.data.notification.smses;
            if (
              !emails ||
              emails[0] != "user1@gmail.com" ||
              emails[1] != "user2@gmail.com"
            ) {
              done("not get emails in notification");
            } else if (
              !smses ||
              smses[0] != "+85291239123" ||
              smses[1] != "+85261236123"
            ) {
              done("not get smses in notification");
            } else {
              done();
            }
          } else {
            done("not found notification");
          }
        })
        .catch((e) => done(e.message));
    });

    it("should catch exception when error", function (done) {
      const tracking_id = "5b74f4958776db0e00b6f5ed";

      // This sets the mock adapter on the default instance
      var mock = new MockAdapter(axios);
      mock.onPost(`/notifications/${tracking_id}/remove`).reply(
        404,
        {
          meta: {
            code: 4004,
            type: "BadRequest",
            message: "Tracking does not exist.",
          },
          data: {},
        },
        {
          "x-ratelimit-reset": 1406096275,
          "x-ratelimit-limit": 10,
          "x-ratelimit-remaining": 9,
        }
      );

      aftership.notification
        .removeNotification(notification, tracking_id)
        .then((result) => {
          if (result && result.meta && result.meta.code === 4004) {
            done();
          } else {
            done("not get the error meta");
          }
        })
        .catch((e) => done(e.message));
    });
  });
});
