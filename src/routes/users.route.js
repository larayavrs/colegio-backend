const { Router } = require('express');

/* router initialization */
const router = Router();

/* controllers */
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');

/* middlewares */
const authentication = require('../middlewares/authentication');
const validation = require('../middlewares/validation');

const usersValidations = require('../validators/users');

/* auth routing */
router.post(
  '/login',
  validation(usersValidations.login),
  authController.login,
);

/* user routing */
router.get('/me', authentication, authController.me);
router.get('/user/:id', usersController.findById);
// router.get('/verify/:token', usersController.verifyEmail);
router.patch(
  '/:id',
  authentication,
  validation(usersValidations.update),
  usersController.update,
);
router.get('/', authentication, usersController.everyone);

module.exports = router;
