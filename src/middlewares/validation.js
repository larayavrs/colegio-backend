const LoomError = require('../helpers/errors');
const catchAsync = require('../helpers/catch-async');
const { validationResult } = require('express-validator');

/**
 * A middleware that runs an array of express-validator checks and returns
 * the first error found as a LoomError if any.
 *
 * @param {express-validator.Check[]} checks Array of express-validator checks
 * @returns {import('express').RequestHandler} Express middleware
 */
module.exports = (checks) => {
  return catchAsync(async (req, _, next) => {
    const results = checks.map((check) => check.run(req));
    await Promise.all(results);
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    next(
      new LoomError({
        type: 'ValidationError',
        message: errors.array()[0].msg,
        code: 400,
      }),
    );
  });
};
