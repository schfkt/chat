'use strict';

var data = exports.data = {
  user: {login: 'doge', password: 'suchsecure'}
};

exports.setup = function () {
  return new Promise(function (resolve, reject) {
    UserModel.findOrCreate(data.user)
      .then(function (newUser) {
        fixtures.user = newUser;
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
