const { Router } = require('express');
const { check } = require('express-validator');

const { createCar, updateCar, deleteCar, getCars } = require('../controllers/create_car');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { carExistById } = require('../middlewares/id-validator');
const { validarBrand } = require('../middlewares/validar-brand');

const router = Router();

router.get('/', getCars);

router.post('/',[ 
  check('model','el modelo del auto debe estar espeficiado').not().isEmpty(),  
  check('brand', 'No es un id valido').isMongoId(),
  check('brand').custom( validarBrand ),
  validarCampos,
  validarJWT,
] , createCar);

router.put('/:id', [
  validarJWT,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( carExistById ),
  validarCampos,
], updateCar);

router.delete('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( carExistById ),
  validarCampos,
  validarJWT,
], deleteCar);

module.exports = router;