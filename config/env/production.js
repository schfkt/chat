/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT
    },
  },

  models: {
    connection: 'mongodb'
  },

  port: 80,
};
