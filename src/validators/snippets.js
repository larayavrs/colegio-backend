const { check } = require('express-validator');

module.exports = {
  create: [
    check('title')
      .exists()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title must be a string text')
      .isLength({ min: 3, max: 30 })
      .withMessage(
        'Title must be between 3 and 24 characters long',
      ),
    check('description')
      .exists()
      .withMessage('Description is required')
      .isString()
      .withMessage('Description must be a string text')
      .isLength({ min: 3, max: 80 })
      .withMessage(
        'Description must be between 3 and 40 characters long',
      ),
    check('language')
      .exists()
      .withMessage('Language is required')
      .isString()
      .withMessage('Language must be a string text'),
    check('code')
      .exists()
      .withMessage('Code is required')
      .isString()
      .withMessage('Code must be a string text'),
    check('public')
      .exists()
      .withMessage('Public is required')
      .isBoolean()
      .withMessage('Public must be a boolean'),
  ],
};
