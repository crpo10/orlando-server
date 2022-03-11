 
/*

 path= api/login
 
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { saveCar } = require('../controllers/create_car');

const router = Router();

router.post('/new', [
  check('name', 'El Nombre es Obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  validarCampos
] ,createUser);

router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'EL password es obligatorio').not().isEmpty(),
  validarCampos
] , login);

router.get('/renew', validarJWT ,renewToken);



module.exports = router;
