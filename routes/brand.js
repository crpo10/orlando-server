const { Router } = require('express');
const { check } = require('express-validator');
const { createBrand, getBrands, getBrandPorId, updateBrand, deleteBrand } = require('../controllers/brand');
const { brandExisteById } = require('../middlewares/id-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// get brands
router.get('/', getBrands);

// get brand por id
router.get('/:id',[
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom( brandExisteById ),
  validarCampos
], getBrandPorId);

// create brand
router.post('/',[
  validarJWT,
  check('name', 'EL nombre es obligatorio').not().isEmpty(),
  validarCampos
], createBrand);

// update brand
router.put('/:id', [
  validarJWT,
  check('id').isMongoId(),
  check('id').custom( brandExisteById ),
  validarCampos
], updateBrand);

// delete brand
router.delete('/:id',[
  validarJWT,
  check('id').isMongoId(),
  check('id').custom( brandExisteById ),
  validarCampos,
], deleteBrand);

module.exports = router;
