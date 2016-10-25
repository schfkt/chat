(function () {
  'use strict';

  var App = window.App = {};

  // Centralized event bus
  App.EventBus = _.extend({}, Backbone.Events);

  // Router
  var Router = Backbone.Router.extend({
    routes: {
      'sign-up': 'signUp'
    },

    initialize: function () {
      this.listenTo(App.EventBus, 'user:registration:success', this.openDefaultChat);
      this.listenTo(App.EventBus, 'user:loaded', this.openDefaultChat);
    },

    signUp: function () {
      if (App.currentUser.isSignedId()) {
        this.openDefaultChat();
      } else {
        new App.SignUpView();
      }
    },

    openDefaultChat: function () {
      this.navigate('chats/default', {trigger: true});
    }
  });

  App.Router = new Router();

  // Load the user as soon as we load the page and start the App
  $(function () {
    App.currentUser = new App.UserModel();
    App.EventBus.once('user:loaded', function () {
      Backbone.history.start();
    });
  });
})();
