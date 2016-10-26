module.exports = {
  index: function (req, res) {
    let from = req.param('from');

    Message.loadHistory()
      .then(res.ok)
      .catch(res.serverError);
  },

  create: function (req, res) {
    let text = req.param('text');
    let userId = req.session.userId;

    Message.create({text: text, author: userId})
      .then(res.ok)
      .catch(res.serverError);
  }
};
