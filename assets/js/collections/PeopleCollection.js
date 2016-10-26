(function (App) {
  'use strict';

  App.PeopleCollection = Backbone.Collection.extend({
    model: Backbone.Model,

    initialize: function () {
      this.listenForMessages();
    },

    listenForMessages: function () {
      var self = this;
      io.socket.on('people', function (data) {
        self.reset(data);
        console.log(data);
      });
    },

    cleanup: function () {
      io.socket.off('people');
    }
  });
})(App);
