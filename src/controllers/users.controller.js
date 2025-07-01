const LoomError = require('../helpers/errors');

const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');
const usersService = require('../services/users.service');
const tokenService = require('../services/token.service');

module.exports = {
  everyone: catchAsync(async (req, res, next) => {
    try {
      const users = await usersService.everyone();
      if (!users || !users.length)
        throw new LoomError({
          message: 'No users were found',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'Users retrieved successfully',
        body: users,
      });
    } catch (error) {
      next(error);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, email, bio, avatar } = req.body;
      if (req.user.id !== id)
        throw new LoomError({
          message:
            'You do not have permission to update this user',
          code: 403,
        });
      const user = await usersService.update(id, {
        username,
        email,
        bio,
        avatar,
      });
      if (!user)
        throw new LoomError({
          message: 'User not found',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'User updated successfully',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),

  findById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findById(id);
      if (!user)
        throw new LoomError({
          message: 'User not found',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'User retrieved successfully',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),

  verifyEmail: catchAsync(async (req, res, next) => {
    try {
      const { token } = req.params;
      const payload = await tokenService.verify(
        token,
        'verification',
      );
      if (!payload || !payload.email)
        throw new LoomError({
          message: 'Invalid or expired verification token',
          code: 400,
        });
      const user = await usersService.findBy({
        email: payload.email,
      });
      if (!user)
        throw new LoomError({
          message: 'User not found',
          code: 404,
        });
      if (user.verified)
        throw new LoomError({
          message: 'User is already verified',
          code: 400,
        });
      user.verified = true;
      await user.save();
      success({
        res,
        code: 200,
        message: 'User verified successfully',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),
};
