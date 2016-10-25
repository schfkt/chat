'use strict';

const request = require('supertest');
const sails = require('sails');
const fixtures = require('./fixtures');

before(function (done) {
  sails.lift({}, function (err, server) {
    if (err) return done(err);

    sails.test = {
      agent: request.agent(sails.hooks.http.app)
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
