'use strict';

const request = require('supertest');
const sails = require('sails');
const fixtures = require('./fixtures');

before(function (done) {
  sails.lift({}, function (err, server) {
    if (err) return done(err);

    sails.test = {
      agent: request.agent(sails.hooks.http.app),
      signOut: function (done) {
        this.agent
          .get('/sign-out')
          .expect(302)
          .expect('location', '/', done);
      }
    };

    fixtures.setup()
      .then(done)
      .catch(done);
  });
});

after(function (done) {
  fixtures.teardown()
    .then(function () {
      sails.lower(done);
    });
});
