const { Router } = require('express');
const { check } = require('express-validator');

const { createCar, updateCar, deleteCar, getCars } = require('../controllers/create_car');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { carExistById } = require('../database/db-validator');

const router = Router();

router.get('/cars', getCars);

router.post('/newCar',[ 
  check('brand','la marca del auto debe estar espeficiada').not().isEmpty(),  
  validarCampos,
  validarJWT,
] , createCar);

router.put('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( carExistById ),
  validarCampos,
  validarJWT
], updateCar);

router.delete('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( carExistById ),
  validarCampos,
  validarJWT,
], deleteCar);

module.exports = router;