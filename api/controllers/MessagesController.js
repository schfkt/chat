'use strict';

module.exports = {
  index: function (req, res) {
    Message.loadHistory()
      .then(messages => {
        sails.sockets.join(req, sails.config.app.socketIoRoom);

        if (sails.connectedUsers == null) {
          sails.connectedUsers = new Map();
        }
        sails.connectedUsers.set(req.session.userId, {
          id: req.session.userId,
          login: req.session.login
        });
        sails.sockets.broadcast(
          sails.config.app.socketIoRoom,
          'people',
          Array.from(sails.connectedUsers.values())
        );
        res.ok(messages);
      })
      .catch(res.serverError);
  },

  create: function (req, res) {
    let userId = req.session.userId;
    let text = req.param('text');

    Message.makeNewMessage(userId, text)
      .then(newMessage => {
        sails.sockets.broadcast(
          sails.config.app.socketIoRoom,
          'newMessage',
          newMessage.toJSON()
        );
        res.ok();
      })
      .catch(res.serverError);
  }
};
