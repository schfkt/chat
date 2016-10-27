'use strict';

module.exports = {
  attributes: {
    text : {
      type: 'text',
      required: true
    },

    author: {
      model: 'user',
      required: true
    },

    autoUpdatedAt: false
  },

  loadHistory: function () {
    return this.find({
      sort: 'createdAt ASC'
    }).populate('author', {
      select: ['login']
    });
  },

  makeNewMessage: function (userId, text) {
    return this.create({author: userId, text: text})
      .then(model => {
        return this.populateSingleMessage(model.id)
      });
  },

  populateSingleMessage: function (id) {
    return this.findOne({id: id})
      .populate('author', {
        select: ['login']
      });
  }
};
