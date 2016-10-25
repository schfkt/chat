(function (App) {
  'use strict';

  App.UserModel = Backbone.Model.extend({
    url: '/user',

    urls: {
      signUp: '/sign-up'
    },

    initialize: function () {
      this.fetch().always(function () {
        App.EventBus.trigger('user:loaded');
      });
    },

    signUp: function (login, password) {
      var self = this;

      $.post(
        this.urls.signUp,
        {login: login, password: password}
      ).done(function (result) {
        self.set(result);
        App.EventBus.trigger('user:registration:success');
      }).fail(function (jqXhr, textStatus) {
        App.EventBus.trigger('user:registration:fail');
      });
    },

    isSignedId: function () {
      return this.get('id') != null;
    }
  });
})(App);
