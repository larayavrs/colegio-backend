const cors = require('cors');
const config = require('../config');

const dev = config.global.env === 'development';

console.info(
  `** CORS was enabled in ${dev ? 'development mode' : 'production mode'}`,
);

module.exports = cors(dev ? { origin: '*' } : config.cors);
