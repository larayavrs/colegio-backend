const GlobalError = require('../helpers/errors');
const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');

const coursesService = require('../services/courses.service');

module.exports = {
  create: catchAsync(async (req, res, next) => {
    try {
      const { name, stage, capacity, supervisorId } =
        req.body;
      const course = await coursesService.create({
        name,
        stage,
        capacity,
        supervisorId,
      });
      success({
        res,
        code: 200,
        message: 'Curso creado exitosamente',
        body: course,
      });
    } catch (error) {
      next(error);
    }
  }),

  findAll: catchAsync(async (req, res, next) => {
    try {
      const courses = await coursesService.findAll();
      if (!courses || !courses.length)
        throw new GlobalError({
          message: 'Los cursos no fueron encontrado',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'Obteniendo cursos exitosamente',
        body: courses,
      });
    } catch (error) {
      next(error);
    }
  }),

  findById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await coursesService.findById(id);
      if (!course)
        throw new GlobalError({
          message: 'El curso no fue encontrado',
          code: 404,
        });
      success({
        res,
        code: 200,
        message: 'Obteniendo curso exitosamente',
        body: course,
      });
    } catch (error) {
      next(error);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, level, stage, capacity, supervisorId } =
        req.body;
      const course = await coursesService.update(id, {
        name,
        level,
        stage,
        capacity,
        supervisorId,
      });
      success({
        res,
        code: 200,
        message: 'Curso actualizado exitosamente',
        body: course,
      });
    } catch (error) {
      next(error);
    }
  }),

  delete: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await coursesService.delete(id);
      success({
        res,
        code: 200,
        message: 'Curso eliminado exitosamente',
        body: course,
      });
    } catch (error) {
      next(error);
    }
  }),
};
