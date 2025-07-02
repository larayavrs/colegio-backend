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
      status: 'Un error ha ocurrido',
      errors: err.errors,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      type: 'ValidationError',
      message: 'La validación de los datos ha fallado',
      code: 400,
      status: 'Un error ha ocurrido',
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
