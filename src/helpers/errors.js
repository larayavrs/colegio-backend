module.exports = class GlobalError extends Error {
  constructor({ type, message, code, errors }) {
    super();
    this.type = type || 'GlobalError';
    this.message = message;
    this.code = code;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
};
