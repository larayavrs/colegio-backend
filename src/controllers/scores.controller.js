const GlobalError = require('../helpers/errors');
const success = require('../helpers/success');
const catchAsync = require('../helpers/catch-async');

const scoreService = require('../services/score.service');

module.exports = {
  create: catchAsync(async (req, res, next) => {
    try {
      const {
        value,
        type,
        studentId,
        subjectId,
        courseId,
      } = req.body;

      if (req.user.role !== 'teacher')
        throw new GlobalError({
          message:
            'No puedes realizar esta acción debido a que no eres un profesor',
          code: 403,
        });

      const score = await scoreService.create({
        value,
        type,
        studentId,
        subjectId,
        teacherId: req.user.id, // profesor que dio la calificacion
        courseId,
      });

      success({
        res,
        code: 200,
        message: 'Calificación creada exitosamente',
        body: score,
      });
    } catch (error) {
      next(error);
    }
  }),
};
