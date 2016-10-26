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
  }
};
