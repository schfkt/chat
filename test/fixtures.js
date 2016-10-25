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
    UserModel.findOrCreate(data.user)
      .then(function (newUser) {
        data.user.id = newUser.id;
        resolve();
      })
      .catch(reject);
  })
};

exports.teardown = function () {
  return new Promise(function (resolve, reject) {
    UserModel.destroy({id: data.user.id})
      .then(resolve)
      .catch(reject);
  });
};
