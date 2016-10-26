(function (App) {
  'use strict';

  App.MessagesCollection = Backbone.Collection.extend({
    url: '/messages',

    model: App.MessageModel,

    sendNewMessage: function (message) {
      var self = this;
      return $.post(this.url, {text: message})
        .done(function (data) {
          self.add([
            new self.model(data, {parse: true})
          ]);
          self.trigger('reset');
        });
    }
  });
})(App);
