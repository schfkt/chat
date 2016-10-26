(function (App) {
  'use strict';

  App.ChatView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/ChatView/index.html']
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      var template = this.templates.index({});
      this.$el.html(template);
    },

    cleanup: function () {
      this.stopListening();
      this.remove();
    }
  });
})(App);
