'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    login : {
      type: 'string' ,
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    messages: {
      collection: 'message',
      via: 'author'
    },

    toJSON: function () {
      let obj = this.toObject();
      delete obj.password;
      return obj;
    },

    autoUpdatedAt: false,

    verifyPassword: function (password) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, res) => {
          if (err) {
            reject(err);
          } else if (res) {
            resolve(this);
          } else {
            reject(new Error('Wrong password'));
          }
        })
      })
    }
  },

  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) return cb(err);

      values.password = hash;
      cb();
    })
  },

  signIn: function (login, password) {
    return this.findOne({login: login})
      .then(user => {
        if (user) {
          return user.verifyPassword(password);
        } else {
          throw new Error("User with this login doesn't exist");
        }
      });
  },

  signUp: function (login, password) {
    return this.findOne({login: login})
      .then(user => {
        if (user) {
          throw new Error('User with this login already exists');
        } else {
          return this.makeNewUser(login, password);
        }
      });
  },

  makeNewUser: function (login, password) {
    return new Promise((resolve, reject) => {
      this.create({login: login, password: password})
        .exec((err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
    });
  }
};
