const redis = require('redis');

// Initialize people storage
module.exports = function (sails) {
  class PeopleStorage {
    constructor(callback) {
      this.data = [];
      this.config = sails.config.app.peopleStorage;
      this.redis = redis.createClient(this.config.port, this.config.host);
      this.redis.on('connect', callback);
    }

    add(login) {
      return new Promise((resolve, reject) => {
        this.redis.sadd(this.config.key, login, (err, reply) => {
          if (err) reject(err);
          else resolve(reply);
        });
      }).then(() => {
        return this.getAll();
      });
    }

    remove(login) {
      return new Promise((resolve, reject) => {
        this.redis.srem(this.config.key, login, (err, reply) => {
          if (err) reject(err);
          else resolve(reply);
        });
      }).then(() => {
        return this.getAll();
      });
    }

    getAll() {
      return new Promise((resolve, reject) => {
        this.redis.smembers(this.config.key, (err, result) => {
          if (err) {
            reject(err);
          } else {
            this.data = result.sort();
            resolve(this.data);
          }
        });
      });
    }
  }

  return {
    initialize: function (callback) {
      sails.peopleStorage = new PeopleStorage(callback);
    }
  }
};
