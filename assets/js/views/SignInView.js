(function (App) {
  'use strict';

  App.SignInView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/SignInView/index.html']
    },

    events: {
      'submit [data-form]': 'onFormSubmit'
    },

    initialize: function () {
      this.model = App.currentUser;
      this.render();
    },

    render: function () {
      var index = this.templates.index({});
      this.$el.html(index)
    },

    cleanup: function () {
      this.stopListening();
      this.remove();
    },

    onFormSubmit: function () {
      var login = this.$('[data-login]').val();
      var password = this.$('[data-password]').val();
      var $submit = this.$('[data-submit]');
      $submit.button('loading');

      this.model.signIn(login, password).always(function () {
        $submit.button('reset');
      });

      return false;
    }
  });
})(App);
