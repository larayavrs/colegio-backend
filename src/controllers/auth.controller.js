/* required modules */
const LoomError = require('../helpers/errors');
const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');

const config = require('../config');

/* services used in this controller */
const usersService = require('../services/users.service');
const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const emailService = require('../services/email.service');

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.findBy({ email });
      if (!user)
        throw new LoomError({
          message: 'User does not exist in the database',
          code: 404,
        });
      const result = await authService.login(
        user,
        password,
      );
      success({
        res,
        code: 200,
        message: 'User logged in successfully',
        body: result,
      });
    } catch (error) {
      next(error);
    }
  }),

  me: catchAsync(async (req, res, next) => {
    try {
      if (!req.user)
        throw new LoomError({
          message:
            'An error occurred while getting user information',
          code: 404,
        });
      const details = await usersService.findById(
        req.user.id,
      );
      if (!details)
        throw new LoomError({
          type: 'User not found',
          message:
            'The user does not exist, please log-in to continue',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'User information retrieved successfully',
        body: details,
      });
    } catch (error) {
      next(error);
    }
  }),
};
