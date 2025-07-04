const { Router } = require('express');

const router = Router();

/* controladores */
const coursesController = require('../controllers/courses.controller');

/* middlewares */
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

/* rutas */
router.post(
  '/create',
  authentication,
  authorization(['admin'], coursesController.create),
);
router.get('/', authentication, coursesController.findAll);
router.get(
  '/:id',
  authentication,
  coursesController.findById,
);
router.patch(
  '/modify/:id',
  authentication,
  authorization(['admin'], coursesController.update),
);
router.delete(
  '/delete/:id',
  authentication,
  authorization(['admin'], coursesController.delete),
);

/* exportando el router */
module.exports = router;
