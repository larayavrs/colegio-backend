const GlobalError = require('../helpers/errors');
const mongoose = require('mongoose');
const config = require('../config');

module.exports = (err, req, res, next) => {
  if (config.global.env === 'development')
    console.error(err);

  if (err instanceof GlobalError) {
    return res.status(err.code).json({
      type: err.type,
      message: err.message,
      code: err.code,
      status: 'An error occurred',
      errors: err.errors,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      type: 'ValidationError',
      message: 'Validation failed',
      code: 400,
      status: 'An error occurred',
      errors: Object.values(err.errors).map(
        (e) => e.message,
      ),
    });
  }

  return res.status(500).json({
    type: 'Internal Error',
    message: 'Internal server error was encountered',
    code: 500,
    status: 'An error occurred',
  });
};
