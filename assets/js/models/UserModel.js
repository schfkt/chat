(function (App) {
  'use strict';

  App.UserModel = Backbone.Model.extend({
    url: '/user',

    urls: {
      signUp: '/sign-up'
    },

    signUp: function (login, password) {
      var self = this;

      $.post(
        this.urls.signUp,
        {login: login, password: password}
      ).done(function (result) {
        self.set(result);
        App.EventBus.trigger('user:registration:success');
      }).fail(function (jqXhr) {
        App.EventBus.trigger('user:registration:fail', jqXhr.responseJSON);
      });
    },

    isSignedId: function () {
      return this.get('id') != null;
    }
  });
})(App);
