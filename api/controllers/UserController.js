'use strict';

module.exports = {
  signIn: function (req, res) {
    let login = req.param('login');
    let password = req.param('password');

    User.signIn(login, password)
      .then(user => {
        // todo: refactor to a method
        req.session.authenticated = true;
        req.session.userId = user.id;
        res.ok(user.toJSON());
      })
      .catch(res.badRequest);
  },

  signOut: function (req, res) {
    req.session.authenticated = false;
    delete req.session;
    res.ok();
  },

  signUp: function (req, res) {
    let login = req.param('login');
    let password = req.param('password');

    User.signUp(login, password)
      .then(user => {
        req.session.authenticated = true;
        req.session.userId = user.id;
        res.ok(user.toJSON());
      })
      .catch(res.badRequest);
  },

  find: function (req, res) {
    User.findOne({id: req.session.userId})
      .then((user) => {
        res.ok(user.toJSON());
      })
      .catch(res.badRequest);
  }
};

