(function (App) {
  'use strict';

  App.SignUpView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/SignUpView/index.html']
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
      this.$el.html(index);
      this.cacheElements();
    },

    cacheElements: function () {
      this.$login = this.$('[data-login]');
      this.$password = this.$('[data-password]');
      this.$submit = this.$('[data-submit]');
    },

    cleanup: function () {
      this.stopListening();
      this.remove();
    },

    onFormSubmit: function () {
      var login = this.$login.val();
      var password = this.$password.val();
      this.$submit.button('loading');

      var self = this;
      this.model.signUp(login, password).always(function () {
        self.$submit.button('reset');
      });

      return false;
    }
  });
})(App);
