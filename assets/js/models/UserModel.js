(function (App) {
  'use strict';

  App.UserModel = Backbone.Model.extend({
    url: '/user',

    urls: {
      signUp: '/sign-up',
      signIn: '/sign-in'
    },

    signUp: function (login, password) {
      var self = this;

      return $.post(
        this.urls.signUp,
        {login: login, password: password}
      ).done(function (result) {
        self.set(result);
        App.eventBus.trigger('sign-up');
      }).fail(this.onFail);
    },

    signIn: function (login, password) {
      var self = this;

      return $.post(
        this.urls.signIn,
        {login: login, password: password}
      ).done(function (result) {
        self.set(result);
        App.eventBus.trigger('sign-in');
      }).fail(this.onFail);
    },

    isSignedId: function () {
      return this.get('id') != null;
    },

    onFail: function (jqXHR) {
      App.eventBus.trigger('error', jqXHR);
    }
  });
})(App);
