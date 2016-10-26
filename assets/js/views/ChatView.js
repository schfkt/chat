(function (App) {
  'use strict';

  App.ChatView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/ChatView/index.html'],
      message: JST['assets/templates/ChatView/message.html'],
    },

    events: {
      'click [data-send]': 'onSend',
      'keydown [data-message]': 'sendOnEnter'
    },

    initialize: function () {
      this.render();
      this.loadMessages();
    },

    loadMessages: function () {
      this.messages = new App.MessagesCollection();
      this.listenTo(this.messages, 'reset', this.renderMessages);
      this.messages.fetch({reset: true});
    },

    render: function () {
      var template = this.templates.index({});
      this.$el.html(template);
    },

    renderMessages: function () {
      var $container = this.$('[data-messages]');
      $container.empty();

      var messageTemplate = this.templates.message;
      this.messages.each(function (message) {
        $container.append(messageTemplate(message.attributes));
      });

      this.scrollToBottom(this.$('[data-messages-wrap]'));
    },

    sendOnEnter: function (event) {
      if (event.which === 13) {
        this.onSend();
        event.preventDefault();
      }
    },

    onSend: function () {
      var message = this.$('[data-message]').val();
      if (message.length) {
        var $send = this.$('[data-send]');
        $send.button('loading');
        var self = this;
        this.messages.sendNewMessage(message).done(function () {
          self.$('[data-message]').val('');
        }).always(function () {
          $send.button('reset');
        });
      }
    },

    cleanup: function () {
      this.stopListening();
      this.remove();
    },

    scrollToBottom: function ($container) {
      $container.scrollTop($container.prop('scrollHeight'));
    }
  });
})(App);
