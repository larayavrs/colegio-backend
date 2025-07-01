const { Router } = require('express');
const config = require('../config');

/* router initialization */
const router = Router();

/* setting up the main router */
router.get('/', (_, res) =>
  res.send(`Welcome to ${config.global.app_name} API!`),
);
router.use('/users', require('./users.route'));

/* exporting the router */
module.exports = router;
