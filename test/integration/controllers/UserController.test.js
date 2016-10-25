'use strict';

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
    it('should successuflly sign out a user', done => {
      sails.test.agent
        .post('/sign-out')
        .expect(200, done);
    })
  });

  describe('#signUp()', () => {
    it('should successfully register a new user', done => {
      sails.test.agent
        .post('/sign-up')
        .send({
          login: fixtures.data.newUser.login,
          password: fixtures.data.newUser.password
        })
        .expect(200, done);
    })
  });

  describe('#find()', function () {
    it('should return 403 for a guest user', done => {
      sails.test.agent
        .get('/user')
        .expect(403, done);
    });
  });
});
