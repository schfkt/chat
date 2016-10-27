'use strict';

module.exports = {
  index: function (req, res) {
    sails.sockets.join(req, sails.config.app.socketIoRoom);
    sails.peopleStorage.add(req.session.login).then(() => {
      return Message.loadHistory();
    }).then(messages => {
      res.ok(messages);
    }).catch(res.serverError);
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
