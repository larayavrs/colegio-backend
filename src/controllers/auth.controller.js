/* required modules */
const GlobalError = require('../helpers/errors');
const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');

const config = require('../config');

/* services used in this controller */
const usersService = require('../services/users.service');
const authService = require('../services/auth.service');

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.findBy({ email });
      if (!user)
        throw new GlobalError({
          message: 'El usuario no fue encontrado',
          code: 404,
        });
      const result = await authService.login(
        user,
        password,
      );
      success({
        res,
        code: 200,
        message: 'Login exitoso',
        body: result,
      });
    } catch (error) {
      next(error);
    }
  }),

  me: catchAsync(async (req, res, next) => {
    try {
      if (!req.user)
        throw new GlobalError({
          message:
            'Un error ha ocurrido al obtener la información del usuario',
          code: 404,
        });
      const details = await usersService.findById(
        req.user.id,
      );
      if (!details)
        throw new GlobalError({
          type: 'User not found',
          message:
            'El usuario no existe, por favor inicie sesión',
          code: 404,
        });
      success({
        res,
        code: 200,
        message:
          'Información del usuario obtenida exitosamente',
        body: details,
      });
    } catch (error) {
      next(error);
    }
  }),
};
