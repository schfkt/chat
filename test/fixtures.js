'use strict';

var data = exports.data = {
  user: {
    login: 'doge',
    password: 'suchsecure'
  },
  wrongUser: {
    login: 'wrong-doge',
    password: 'sowrongpwd'
  },
  newUser: {
    login: 'new-doge',
    password: 'muchnewpassword'
  }
};

exports.setup = function () {
  return new Promise(function (resolve, reject) {
    User.findOrCreate(data.user)
      .then(function (newUser) {
        data.user.id = newUser.id;
        resolve();
      })
      .catch(reject);
  })
};

exports.teardown = function () {
  return new Promise(function (resolve, reject) {
    User.destroy({login: data.user.login})
      .then(resolve)
      .catch(reject);
  }).then(() => {
    return User.destroy({login: data.newUser.login});
  });
};
