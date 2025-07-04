const { Router } = require('express');

const router = Router();

/* controladores */
const scoresController = require('../controllers/scores.controller');

/* middlewares */
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

/* rutas */
router.post(
  '/add',
  authentication,
  authorization(['teacher']),
  scoresController.create,
);

/* exportando el router */
module.exports = router;
