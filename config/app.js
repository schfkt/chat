// App-specific configuration options
module.exports.app = {
  // Socket.IO room for realtime operations
  socketIoRoom: 'chat',

  // Configuration options for the people storage (redis)
  peopleStorage: {
    key: 'sails:peopleStorage',
    host: '127.0.0.1',
    port: 6379
  },

  bcryptSaltRounds: 10
};
