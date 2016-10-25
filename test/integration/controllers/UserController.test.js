'use strict';

const assert = require('assert');
const fixtures = require('../../fixtures');

describe('UserController', () => {
  describe('#signIn()', () => {
    it('should authenticate a user', done => {
      sails.test.agent
        .post('/sign-in')
        .send({
          login: fixtures.data.user.login,
          password: fixtures.data.user.password
        })
        .expect(200, done);
    });

    it("should return a 400 response when a user doesn't exist", done => {
      sails.test.agent
        .post('/sign-in')
        .send({
          login: fixtures.data.wrongUser.login,
          password: fixtures.data.wrongUser.password
        })
        .expect(400, done);
    });

    it('should return 400 response when the password is wrong', done => {
      sails.test.agent
        .post('/sign-in')
        .send({
          login: fixtures.data.user.login,
          password: fixtures.data.wrongUser.password
        })
        .expect(400, done);
    });
  });

  describe('#signOut()', () => {
  });

  describe('#signUp()', () => {
  });

  describe('#find()', function () {
    it('should redirect a guest user to the index page', done => {
      sails.test.agent
        .get('/user')
        .expect(403, done);
    });
  });
});
