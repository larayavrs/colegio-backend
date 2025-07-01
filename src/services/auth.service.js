const tokenService = require('./token.service');
const crypterService = require('./crypter.service');

const GlobalError = require('../helpers/errors');

module.exports = {
  login: async (user, password) => {
    try {
      const valid = await crypterService.compare(
        password,
        user.password,
      );
      if (!valid)
        throw new GlobalError({
          message:
            'Invalid credentials or user does not exist',
          code: 401,
        });
      const payload = {
        id: user.id,
        user: user.username,
        role: user.role,
      };
      return {
        payload,
        access: await tokenService.create({
          payload,
          type: 'access',
        }),
      };
    } catch (error) {
      throw error;
    }
  },
};
