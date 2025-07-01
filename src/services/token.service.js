const Token = require('../schemas/token.schema');

const GlobalError = require('../helpers/errors');

const config = require('../config');
const jwtService = require('./jwt.service');

module.exports = {
  /**
   * Creates a new token and saves it to the database if save is true.
   * @param {Object} options - Options for creating the token.
   * @param {Object} options.payload - Payload to be signed into the token.
   * @param {String} options.type - Type of token to be created.
   * @param {Boolean} [options.save=false] - Whether to save the token to the database.
   * @returns {String} The newly created token.
   */
  create: async ({ payload, type, save = false }) => {
    try {
      const token = await jwtService.sign(
        payload,
        config.jwt[type].secret,
        config.jwt[type].expire,
      );
      const { expiresAt } = jwtService.verify(
        token,
        config.jwt[type].secret,
      );
      if (save)
        await Token.create({
          userId: payload.id,
          token,
          type,
          expiresAt,
        });
      return token;
    } catch (error) {
      throw new GlobalError({
        type: 'Token Error',
        message: error.message,
        code: 500,
        errors: [error],
      });
    }
  },

  /**
   * Verifies a token given a token and a type.
   * @param {String} token - The token to be verified.
   * @param {String} type - The type of token to be verified.
   * @returns {Object} The decoded payload if the verification is successful.
   */
  verify: async (token, type) => {
    try {
      return await jwtService.verify(
        token,
        config.jwt[type].secret,
      );
    } catch (error) {
      throw new GlobalError({
        type: 'Token Verification Error',
        message: error.message,
        code: 500,
        errors: [error],
      });
    }
  },
};
