(function (App) {
  'use strict';

  App.MessagesCollection = Backbone.Collection.extend({
    url: '/messages',

    model: App.MessageModel,

    initialize: function () {
      this.listenForMessages();
    },

    fetch: function () {
      var self = this;
      io.socket.get(this.url, function (response) {
        self.reset(response, {parse: true});
      })
    },

    sendNewMessage: function (message) {
      io.socket.post(this.url, {text: message});
    },

    listenForMessages: function () {
      var self = this;
      io.socket.on('newMessage', function (data) {
        var model = new self.model(data, {parse: true});
        self.add(model);
      });
    },

    cleanup: function () {
      io.socket.off('newMessage');
    }
  });
})(App);
