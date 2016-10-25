'use strict';

module.exports = {
  signIn: function (req, res) {
    let login = req.param('login');
    let password = req.param('password');

    UserModel.signIn(login, password)
      .then(user => {
        req.session.authenticated = true;
        req.session.userId = user.id;
        res.ok(user.toJSON());
      })
      .catch(res.badRequest);
  },

  singOut: function (req, res) {
    return res.json({
      todo: 'singout() is not implemented yet!'
    });
  },

  signUp: function (req, res) {
    return res.json({
      todo: 'signup() is not implemented yet!'
    });
  },

  find: function (req, res) {
    return res.json({
      todo: 'find() is not implemented yet!'
    });
  }
};

