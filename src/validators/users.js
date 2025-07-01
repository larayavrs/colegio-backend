const { check } = require('express-validator');

module.exports = {
  create: [
    check('username')
      .exists()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 14 })
      .withMessage(
        'Username must be between 3 and 14 characters long',
      )
      .isString()
      .withMessage('Username must be a string text'),
    check('email')
      .exists()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is not valid'),
    check('password')
      .exists()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a string text')
      .isLength({ min: 8 })
      .withMessage(
        'Password must be at least 8 characters long',
      ),
  ],
  login: [
    check('email')
      .exists()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is not valid'),
    check('password')
      .exists()
      .withMessage('Password is required')
      .isString()
      .withMessage('Password must be a string text'),
  ],
  update: [
    check('username')
      .optional()
      .isLength({ min: 3, max: 14 })
      .withMessage(
        'Username must be between 3 and 14 characters long',
      )
      .isString()
      .withMessage('Username must be a string text'),
    check('email')
      .optional()
      .isEmail()
      .withMessage('Email is not valid'),
    check('bio')
      .optional()
      .isString()
      .withMessage('Bio must be a string text'),
    check('avatar')
      .optional()
      .isString()
      .withMessage('Avatar must be a string text'),
  ],
};
