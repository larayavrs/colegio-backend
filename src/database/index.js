const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
  connect: async () => {
    try {
      if (config.global.env === 'development')
        mongoose.set('debug', true);
      await mongoose.connect(config.database.url);
      console.info(
        `> Connected to the database at <${config.database.url}>`,
      );
    } catch (error) {
      console.error(
        'Error connecting to the database:',
        error,
      );
      throw error;
    }
  },
  disconnect: async () => {
    try {
      await mongoose.disconnect();
      console.info('> Disconnected from the database');
    } catch (error) {
      console.error(
        'Error disconnecting from the database:',
        error,
      );
      throw error;
    }
  },
};
