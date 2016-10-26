(function (App) {
  'use strict';

  App.MessageModel = Backbone.Model.extend({
    parse: function (response) {
      response.createdAtHumanized = this.humanizeDate(response.createdAt);
      return response;
    },

    humanizeDate: function (dateString) {
      var date = new Date(dateString);
      var time = date.toTimeString().replace(/\sGMT.+$/, '');
      return date.toDateString() + ' ' + time;
    }
  })
})(App);
