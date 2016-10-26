module.exports = {
  attributes: {
    text : {
      type: 'text'
    },

    author: {
      model: 'user'
    },

    autoUpdatedAt: false
  }
};
