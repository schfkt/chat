'use strict';

module.exports = {
  index: function (req, res) {
    Message.loadHistory()
      .then(messages => {
        sails.sockets.join(req, sails.config.app.messagesRoomName);
        res.ok(messages);
      })
      .catch(res.serverError);
  },

  create: function (req, res) {
    let text = req.param('text');
    let userId = req.session.userId;

    Message.create({text: text, author: userId})
      .then(newMessage => {
        sails.sockets.broadcast(
          sails.config.app.messagesRoomName,
          newMessage.toJSON()
        );
        res.ok();
      })
      .catch(res.serverError);
  }
};
