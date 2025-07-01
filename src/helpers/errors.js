module.exports = class LoomError extends Error {
  constructor({ type, message, code, errors }) {
    super();
    this.type = type || 'LoomError';
    this.message = message;
    this.code = code;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
};
