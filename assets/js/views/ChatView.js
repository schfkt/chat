(function (App) {
  'use strict';

  App.ChatView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/ChatView/index.html'],
      message: JST['assets/templates/ChatView/message.html'],
    },

    events: {
      'click [data-send]': 'onSend',
      'keydown [data-new-message]': 'sendOnEnter'
    },

    initialize: function () {
      this.render();
      this.loadMessages();
    },

    cacheElements: function () {
      this.$newMessage = this.$('[data-new-message]');
      this.$container = this.$('[data-messages]');
      this.$containerWrap = this.$('[data-messages-wrap]');
    },

    loadMessages: function () {
      this.messages = new App.MessagesCollection();
      this.listenTo(this.messages, 'reset', this.renderMessages);
      this.listenTo(this.messages, 'add', this.addMessage);
      this.messages.fetch();
    },

    render: function () {
      var template = this.templates.index({});
      this.$el.html(template);
      this.cacheElements();
    },

    renderMessages: function () {
      this.$container.empty();
      this.messages.each(this.renderMessage, this);
      this.scrollToBottom(this.$containerWrap);
    },

    renderMessage: function (message) {
      var template = this.templates.message(message.attributes);
      this.$container.append(template);
    },

    addMessage: function (message) {
      this.renderMessage(message);
      this.scrollToBottom(this.$containerWrap);
    },

    sendOnEnter: function (event) {
      if (event.which === 13) {
        this.onSend();
        event.preventDefault();
      }
    },

    onSend: function () {
      var text = this.$newMessage.val();
      if (text.length) {
        this.messages.sendNewMessage(text);
        this.$newMessage.val('');
      }
    },

    cleanup: function () {
      this.stopListening();
      this.messages.cleanup();
      this.remove();
    },

    scrollToBottom: function ($container) {
      $container.scrollTop($container.prop('scrollHeight'));
    }
  });
})(App);
