/* required services */
const jwtService = require('../services/jwt.service');
const usersService = require('../services/users.service');

/* another required modules */
const GlobalError = require('../helpers/errors');
const catchAsync = require('../helpers/catch-async');
const config = require('../config');

module.exports = catchAsync(async (req, _, next) => {
  try {
    let bearer =
      req.headers.authorization ||
      req.cookies.authorization;
    if (!bearer)
      throw new GlobalError({
        type: 'No autorizado',
        message: 'Ningun token fue proporcionado',
        code: 401,
      });
    bearer = bearer.split(' ')[1];
    if (!bearer)
      throw new GlobalError({
        type: 'No autorizado',
        message: 'El formato del token es incorrecto',
        code: 401,
      });
    const payload = await jwtService.verify(
      bearer,
      config.jwt.access.secret,
    );
    const user = await usersService.findById(payload.id);
    if (!user)
      throw new GlobalError({
        type: 'Unauthorized',
        message:
          'El usuario asociado al token no fue encontrado o no existe',
        code: 401,
      });
    req.user = { ...payload, ...user.toJSON() };
    next();
  } catch (error) {
    next(error);
  }
});
