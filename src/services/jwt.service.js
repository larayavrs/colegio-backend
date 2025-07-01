const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Signs a JSON Web Token given a payload and a secret.
   * @param {Object} payload The payload to be signed.
   * @param {String} secret The secret to be used for signing.
   * @param {String} expire The expiration time in seconds. The default is 3600
   * @returns {String} The signed JSON Web Token.
   */
  sign: async (payload, secret, expire) =>
    await jwt.sign(payload, secret, { expiresIn: expire }),

  /**
   * Verifies a JSON Web Token given a token and a secret.
   * @param {String} token The JWT to be verified.
   * @param {String} secret The secret to verify the JWT.
   *
   * @returns {Object} The decoded payload if the verification is successful.
   * @throws {Error} If the token is invalid or verification fails.
   */
  verify: async (token, secret) =>
    await jwt.verify(token, secret),

  /**
   * Decodes a JSON Web Token given a token.
   * @param {String} token The JWT to be decoded.
   * @returns {Object} The decoded payload.
   */
  decode: async (token) => await jwt.decode(token),
};
