const morgan = require('morgan');
const config = require('../config');

const dev = config.global.env === 'development';
const mode = dev ? 'dev' : 'combined';

console.info(`** Morgan was enabled in ${mode} mode`);

module.exports = morgan(mode);
