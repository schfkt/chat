(function () {
  'use strict';

  var App = window.App = {};

  // Centralized Event Bus
  App.EventBus = _.extend({}, Backbone.Events);

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      '': 'openDefaultChat',
      'sign-up': 'signUp',
      'sign-in': 'signIn'
    },

    initialize: function () {
      this.listenTo(App.EventBus, 'user:registration:success', this.openDefaultChat);
      this.listenTo(App.EventBus, 'user:load:success', this.openDefaultChat);
      this.listenTo(App.EventBus, 'user:load:fail', this.userLoadFail);
    },

    signUp: function () {
      if (App.currentUser.isSignedId()) {
        this.openDefaultChat();
      } else {
        new App.SignUpView();
      }
    },

    signIn: function () {
      if (App.currentUser.isSignedId()) {
        this.openDefaultChat();
      } else {
        new App.SignInView();
      }
    },

    openDefaultChat: function () {
      this.navigate('chats/default', {trigger: true});
    },

    userLoadFail: function (data) {
      if (data.status === 403) {
        this.signIn();
      } else {
        this.error(data.responseText);
      }
    }
  });

  App.Router = new Router();

  // Initialization logic
  App.run = function () {
    this.currentUser = new this.UserModel();

    var self = this;
    this.currentUser.fetch()
      .done(function () {
        self.Router.openDefaultChat();
        Backbone.history.start();
      })
      .fail(function () {
        self.Router.signIn();
        Backbone.history.start();
      });
  };

  // Start the App
  $(function () {
    App.run();
  });
})();
