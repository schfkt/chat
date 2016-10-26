(function (App) {
  'use strict';

  App.ChatView = Backbone.View.extend({
    templates: {
      index: JST['assets/templates/ChatView/index.html'],
      message: JST['assets/templates/ChatView/message.html'],
      people: JST['assets/templates/ChatView/people.html']
    },

    events: {
      'click [data-send]': 'onSend',
      'keydown [data-new-message]': 'sendOnEnter'
    },

    initialize: function () {
      this.render();
      this.loadPeople();
      this.loadMessages();
    },

    cacheElements: function () {
      this.$newMessage = this.$('[data-new-message]');
      this.$messagesContainer = this.$('[data-messages]');
      this.$messagesContainerWrap = this.$('[data-messages-wrap]');
      this.$peopleContainer = this.$('[data-people]');
      this.$peopleContainerWrap = this.$('[data-people-wrap]');
    },

    loadMessages: function () {
      this.messages = new App.MessagesCollection();
      this.listenTo(this.messages, 'reset', this.renderMessages);
      this.listenTo(this.messages, 'add', this.addMessage);
      this.messages.fetch();
    },

    loadPeople: function () {
      this.people = new App.PeopleCollection();
      this.listenTo(this.people, 'reset', this.renderPeople);
    },

    render: function () {
      var template = this.templates.index({});
      this.$el.html(template);
      this.cacheElements();
    },

    renderMessages: function () {
      this.$messagesContainer.empty();
      this.messages.each(this.renderMessage, this);
      this.scrollToBottom(this.$messagesContainerWrap);
    },

    renderMessage: function (message) {
      var template = this.templates.message(message.attributes);
      this.$messagesContainer.append(template);
    },

    addMessage: function (message) {
      this.renderMessage(message);
      this.scrollToBottom(this.$messagesContainerWrap);
    },

    renderPeople: function () {
      this.$peopleContainer.empty();
      this.people.each(this.renderSinglePeople, this);
      this.scrollToBottom(this.$peopleContainerWrap);
    },

    renderSinglePeople: function (people) {
      var template = this.templates.people(people.attributes);
      this.$peopleContainer.append(template);
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
