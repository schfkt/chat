(function (App) {
  'use strict';

  App.SignInView = Backbone.View.extend({
    el: '#app',

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

    onFormSubmit: function () {
      var login = this.$('[data-login]').val();
      var password = this.$('[data-password]').val();
      this.$('[data-submit]').button('loading');
      return false;
    }
  });
})(App);
