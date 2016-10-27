// Config for Travis CI
module.exports = {
  connections: {
    localDiskDb: {
      adapter: 'sails-disk'
    }
  },
  models: {
    connection: 'localDiskDb'
  }
};
