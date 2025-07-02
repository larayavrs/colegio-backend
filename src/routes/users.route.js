const { Router } = require('express');

/* router initialization */
const router = Router();

/* controllers */
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');

/* middlewares */
const authorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');
const validation = require('../middlewares/validation');

const usersValidations = require('../validators/users');

/* auth routing */
router.post(
  '/login',
  validation(usersValidations.login),
  authController.login,
);
router.get('/me', authentication, authController.me);

/* user routing */
router.get('/user/:id', usersController.findById);
router.patch(
  '/:id',
  authentication,
  validation(usersValidations.update),
  usersController.update,
);
router.get('/', authentication, usersController.everyone);

/* admin routing */
router.post(
  '/create',
  authentication,
  authorization(['teacher', 'admin']),
  validation(usersValidations.create),
  usersController.create,
);

module.exports = router;
