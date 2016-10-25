'use strict';

const request = require('supertest');
const sails = require('sails');
const fixtures = require('./fixtures');

before(done => {
  sails.lift({}, (err, server) => {
    if (err) return done(err);

    fixtures.setup()
      .then(done)
      .catch(done);
  });
});

beforeEach(() => {
  sails.test = {
    agent: request.agent(sails.hooks.http.app)
  };
});

after(done => {
  fixtures.teardown()
    .then(function () {
      sails.lower(done);
    });
});
