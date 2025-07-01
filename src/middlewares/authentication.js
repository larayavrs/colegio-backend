/* required services */
const jwtService = require('../services/jwt.service');
const usersService = require('../services/users.service');

/* another required modules */
const LoomError = require('../helpers/errors');
const catchAsync = require('../helpers/catch-async');
const config = require('../config');

module.exports = catchAsync(async (req, _, next) => {
  try {
    let bearer =
      req.headers.authorization ||
      req.cookies.authorization;
    if (!bearer)
      throw new LoomError({
        type: 'Unauthorized',
        message:
          'No token provided, please log-in to continue',
        code: 401,
      });
    bearer = bearer.split(' ')[1];
    if (!bearer)
      throw new LoomError({
        type: 'Unauthorized',
        message: 'Token format is invalid',
        code: 401,
      });
    const payload = await jwtService.verify(
      bearer,
      config.jwt.access.secret,
    );
    const user = await usersService.findById(payload.id);
    if (!user)
      throw new LoomError({
        type: 'Unauthorized',
        message:
          'The user associated with this token does not exist',
        code: 401,
      });
    req.user = { ...payload, ...user.toJSON() };
    next();
  } catch (error) {
    next(error);
  }
});
