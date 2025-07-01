const express = require('express');

module.exports = express.json({
  limit: '50mb',
  extended: true,
});
