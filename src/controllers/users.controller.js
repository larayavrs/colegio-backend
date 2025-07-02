const GlobalError = require('../helpers/errors');

const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');
const usersService = require('../services/users.service');
const tokenService = require('../services/token.service');

module.exports = {
  everyone: catchAsync(async (req, res, next) => {
    try {
      const users = await usersService.everyone();
      if (!users || !users.length)
        throw new GlobalError({
          message: 'Los usuarios no fueron encontrado',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'Obteniendo usuarios exitosamente',
        body: users,
      });
    } catch (error) {
      next(error);
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        role,
        rut,
      } = req.body;
      if (req.user.role !== 'admin')
        throw new GlobalError({
          message:
            'No tienes permiso para crear un usuario',
          code: 403,
        });
      const user = await usersService.create({
        firstname,
        lastname,
        email,
        password,
        role,
        rut,
      });
      success({
        res,
        code: 201,
        message: 'Usuario creado exitosamente',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstname, lastname, address, phone } =
        req.body;
      if (req.user.id !== id)
        throw new GlobalError({
          message:
            'No tienes permiso para actualizar este usuario',
          code: 403,
        });
      const user = await usersService.update(id, {
        firstname,
        lastname,
        address,
        phone,
      });
      success({
        res,
        code: 200,
        message: 'Usuario actualizado exitosamente',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),

  findById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await usersService.findById(id);
      if (!user)
        throw new GlobalError({
          message: 'El usuario no fue encontrado',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'Obteniendo usuario exitosamente',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),

  verifyEmail: catchAsync(async (req, res, next) => {
    try {
      const { token } = req.params;
      const payload = await tokenService.verify(
        token,
        'verification',
      );
      if (!payload || !payload.email)
        throw new GlobalError({
          message: 'Invalid or expired verification token',
          code: 400,
        });
      const user = await usersService.findBy({
        email: payload.email,
      });
      if (!user)
        throw new GlobalError({
          message: 'User not found',
          code: 404,
        });
      if (user.verified)
        throw new GlobalError({
          message: 'User is already verified',
          code: 400,
        });
      user.verified = true;
      await user.save();
      success({
        res,
        code: 200,
        message: 'User verified successfully',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),
};
