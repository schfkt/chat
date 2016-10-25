(function (App) {
  'use strict';

  App.SignUpView = Backbone.View.extend({
    el: '#app',

    templates: {
      index: JST['assets/templates/SignUpView/index.html']
    },

    events: {
      'submit [data-form]': 'onFormSubmit'
    },

    initialize: function () {
      this.model = App.currentUser;
      this.listenTo(App.EventBus, 'user:registration:success', this.cleanup);
      this.listenTo(App.EventBus, 'user:registration:fail', this.onFail);
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
      this.model.signUp(login, password);
      return false;
    },

    onFail: function (message) {
      this.$('[data-submit]').button('reset')
    },

    cleanup: function () {
      this.stopListening();
      this.remove();
    }
  });
})(App);
