const { check } = require('express-validator');

module.exports = {
  create: [
    check('firstname')
      .exists()
      .withMessage('El primer nombre es requerido')
      .isString()
      .withMessage(
        'El primer nombre debe ser una cadena de texto',
      )
      .isLength({ min: 3, max: 14 })
      .withMessage(
        'El primer nombre debe tener entre 3 y 14 caracteres',
      ),
    check('lastname')
      .exists()
      .withMessage('El apellido es requerido')
      .isString()
      .withMessage(
        'El apellido debe ser una cadena de texto',
      )
      .isLength({ min: 3, max: 14 })
      .withMessage(
        'El apellido debe tener entre 3 y 14 caracteres',
      ),
    check('email')
      .exists()
      .withMessage('El correo es requerido')
      .isEmail()
      .withMessage('El correo es inválido'),
    check('password')
      .exists()
      .withMessage('La contraseña es requerida')
      .isString()
      .withMessage(
        'La contraseña debe ser una cadena de texto',
      )
      .isLength({ min: 6, max: 14 })
      .withMessage(
        'La contraseña debe tener entre 6 y 14 caracteres',
      ),
    check('role')
      .exists()
      .withMessage('El rol es requerido')
      .isIn(['student', 'teacher', 'admin'])
      .withMessage(
        'El rol debe ser uno de los siguientes: student, teacher, admin',
      ),
    check('rut')
      .optional()
      .isString()
      .withMessage('El rut debe ser una cadena de texto'),
    check('phone')
      .optional()
      .isString()
      .withMessage(
        'El teléfono debe ser una cadena de texto',
      )
      .isMobilePhone('es-CL')
      .withMessage(
        'El teléfono debe ser un número de Chile',
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
