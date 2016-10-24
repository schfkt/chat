var request = require('supertest');
var sails = require('sails');
var fixtures = require('./fixtures');

before(function(done) {
  sails.lift({}, function(err, server) {
    if (err) return done(err);

    sails.test = {
      agent: request.agent(sails.hooks.http.app),
      signIn: function (done) {
        this.agent
          .post('/sign-in')
          .send({
            login: fixtures.data.user.login,
            password: fixtures.data.user.password
          })
          .expect(200, done);
      },
      signOut: function (done) {
        this.agent
          .get('/sign-out')
          .expect(302)
          .expect('location', '/', done);
      }
    };
    done(err, sails);
  });
});

after(function(done) {
  fixtures.teardown().then(function () {
    sails.lower(done);
  });
});
