'use strict';

var assert = require('assert');

describe('UserController', function () {
  it('should redirect a guest user to the index page', function (done) {
    sails.test.agent
      .get('/user')
      .expect(302)
      .expect('location', '/', done);
  });

  describe('#signIn()', function () {
    it('should authenticate a user', function (done) {
      sails.test.agent
        .post('/sign-in')
        .send({login: 'doge', password: 'suchsecure'})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          assert.strictEqual(res.body.login, 'doge');
          done();
        });
    });
  });

  describe('#signOut()', function () {
  });

  describe('#signUp()', function () {
  });

  describe('#find()', function () {
  });
});
