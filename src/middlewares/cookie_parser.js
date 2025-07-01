const cookie_parser = require('cookie-parser');
const config = require('../config');

const dev = config.global.env === 'development';

console.info(
  `** Cookie parser was enabled in ${dev ? 'development mode' : 'production mode'}`,
);

module.exports = cookie_parser({
  httpOnly: true,
  secure: !dev,
});
