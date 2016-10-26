(function () {
  'use strict';

  // AppRouter
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'chat',
      'sign-up': 'sign-up',
      'sign-in': 'sign-in'
    },

    chatPage: function () {
      this.navigate('chat', {trigger: true});
    },

    signInPage: function () {
      this.navigate('sign-in', {trigger: true});
    }
  });

  // App
  window.App = {
    eventBus: _.extend({}, Backbone.Events),

    router: new AppRouter(),

    init: function () {
      this.container = $('#app-container');
      this.initEventBus();
      this.initRouter();
      this.initNotifier();
      this.initUser();
    },

    initEventBus: function () {
      this.eventBus.on('error', this.showError, this);
      this.eventBus.on('sign-up', this.processNewUser, this);
      this.eventBus.on('sign-in', this.processExistingUser, this);
    },

    initUser: function () {
      this.currentUser = new this.UserModel();
      this.currentUser.fetch()
        .always(function () {
          Backbone.history.start();
        });
    },

    initRouter: function () {
      this.router.on('route:chat', this.openChat, this);
      this.router.on('route:sign-in', this.openSignInPage, this);
      this.router.on('route:sign-up', this.openSignUpPage, this);
    },

    initNotifier: function () {
      humane.timeout = 5000;
      humane.clickToClose = true;
    },

    openChat: function () {
      if (this.isSignedIn()) {
        console.log('todo: default chat');
      } else {
        this.router.signInPage();
      }
    },

    openSignInPage: function () {
      if (this.isSignedIn()) {
        this.router.chatPage();
      } else {
        this.switchView(this.SignInView);
      }
    },

    openSignUpPage: function () {
      if (this.isSignedIn()) {
        this.router.chatPage();
      } else {
        this.switchView(this.SignUpView);
      }
    },

    isSignedIn: function () {
      return this.currentUser.isSignedId();
    },

    switchView: function (ViewClass) {
      if (this.currentView) this.currentView.cleanup();
      this.currentView = new ViewClass();
      this.container.empty();
      this.container.append(this.currentView.$el);
    },

    showError: function (jqXHR) {
      var message = (jqXHR.responseJSON && jqXHR.responseJSON.message) ||
        jqXHR.status ||
        'Something went wrong. Try to reload the page';
      this.logError(message);
    },

    processNewUser: function () {
      this.logSuccess('You were successfully signed up. Start chatting!');
      this.router.chatPage();
    },

    processExistingUser: function () {
      this.logSuccess('You were successfully signed in. Start chatting!');
      this.router.chatPage();
    },

    logError: function (message) {
      humane.log(message, {addnCls: 'humane-jackedup-error'});
    },

    logSuccess: function (message) {
      humane.log(message, {addnCls: 'humane-jackedup-success'});
    }
  };

  // Start the App
  $(function () {
    App.init();
  });
})();
