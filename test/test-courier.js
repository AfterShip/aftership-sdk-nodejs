var Aftership = require('../dist/index.js').AfterShip

const aftership = Aftership('d655b36a-d268-4eb3-a0d6-8939c79da93e')


describe('Courier', function () {
  describe('#listCouriers()', function () {
    this.timeout(30000);
    it('should return couriers and total with Callback', function (done) {
      aftership.courier.listCouriers(function (err, result) {
        const { total, couriers } = result && result['data'] || {}
        console.log('Callback', total, couriers.length)
        if (err) {
          return done(err);
        }
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      })
    });

    it('should return couriers and total with Promise', function (done) {
      aftership.courier.listCouriers()
        .then(result => {
          const { total, couriers } = result && result['data'] || {}
          console.log('Promise', total, couriers.length)
          if (couriers && couriers.length > 0 && total === couriers.length) {
            done()
          } else {
            done('not found data')
          }
        })
        .catch(e => done(e.message))
    });

    it('should return couriers and total with Async/Await', async function (done) {
      try {
        let result = await aftership.courier.listCouriers()
        const { total, couriers } = result && result['data'] || {}
        console.log('Async/Await', total, couriers.length)
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      } catch (e) {
        done(e.message)
      }
    });
  });

  describe('#listAllCouriers()', function () {
    this.timeout(30000);
    it('should return couriers and total with Callback', function (done) {
      aftership.courier.listAllCouriers(function (err, result) {
        const { total, couriers } = result && result['data'] || {}
        console.log('Callback', total, couriers.length)
        if (err) {
          return done(err);
        }
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      })
    });

    it('should return couriers and total with Promise', function (done) {
      aftership.courier.listAllCouriers()
        .then(result => {
          const { total, couriers } = result && result['data'] || {}
          console.log('Promise', total, couriers.length)
          if (couriers && couriers.length > 0 && total === couriers.length) {
            done()
          } else {
            done('not found data')
          }
        })
        .catch(e => done(e.message))
    });

    it('should return couriers and total with Async/Await', async function (done) {
      try {
        let result = await aftership.courier.listAllCouriers()
        const { total, couriers } = result && result['data'] || {}
        console.log('Async/Await', total, couriers.length)
        if (couriers && couriers.length > 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      } catch (e) {
        done(e.message)
      }
    });
  });

  describe('#detectCouriers()', function () {
    this.timeout(30000);
    const payload = {
      "tracking": {
        "tracking_number": "3123123123329291231231"
      }
    }

    it('should return couriers and total with Callback', function (done) {
      aftership.courier.detectCouriers(payload, function (err, result) {
        const { total, couriers } = result && result['data'] || {}
        console.log('Callback', total, couriers.length)
        if (err) {
          return done(err);
        }
        if (couriers && couriers.length >= 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      })
    });

    it('should return couriers and total with Promise', function (done) {
      aftership.courier.detectCouriers(payload)
        .then(result => {
          const { total, couriers } = result && result['data'] || {}
          console.log('Promise', total, couriers.length)
          if (couriers && couriers.length >= 0 && total === couriers.length) {
            done()
          } else {
            done('not found data')
          }
        })
        .catch(e => done(e.message))
    });

    it('should return couriers and total with Async/Await', async function (done) {
      try {
        let result = await aftership.courier.detectCouriers(payload)
        const { total, couriers } = result && result['data'] || {}
        console.log('Async/Await', total, couriers.length)
        if (couriers && couriers.length >= 0 && total === couriers.length) {
          done()
        } else {
          done('not found data')
        }
      } catch (e) {
        done(e.message)
      }
    });
  });


  // describe('#listCouriers()', function () {
  //   this.timeout(10000);
  //   it('should return couriers and total with Callback', function (done) {
  //     aftership.courier.listCouriers(function (err, result) {
  //       const { total, couriers } = result && result['data'] || {}
  //       console.log('Callback', total, couriers.length)
  //       if (err) {
  //         return done(err);
  //       }
  //       if (couriers && couriers.length > 0 && total === couriers.length) {
  //         done()
  //       } else {
  //         done('not found data')
  //       }
  //     })
  //   });

  //   it('should return couriers and total with Promise', function (done) {
  //     aftership.courier.listCouriers()
  //       .then(result => {
  //         const { total, couriers } = result && result['data'] || {}
  //         console.log('Promise', total, couriers.length)
  //         if (couriers && couriers.length > 0 && total === couriers.length) {
  //           done()
  //         } else {
  //           done('not found data')
  //         }
  //       })
  //       .catch(e => done(e.message))
  //   });

  //   it('should return couriers and total with Async/Await', async function (done) {
  //     try {
  //       let result = await aftership.courier.listCouriers()
  //       const { total, couriers } = result && result['data'] || {}
  //       console.log('Async/Await', total, couriers.length)
  //       if (couriers && couriers.length > 0 && total === couriers.length) {
  //         done()
  //       } else {
  //         done('not found data')
  //       }
  //     } catch (e) {
  //       done(e.message)
  //     }
  //   });
  // });
});