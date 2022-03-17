const { Router } = require('express');
const { check } = require('express-validator');
const { createBrand, getBrands, getBrandPorId } = require('../controllers/brand');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// get brands
router.get('/', getBrands);

// get brand por id
router.get('/:id',[
  check('id', 'El id no es valido').isMongoId(),
  validarCampos
], getBrandPorId);

// create brand
router.post('/',[
  check('name', 'EL nombre es obligatorio').not().isEmpty(),
  validarCampos
], createBrand);

// update brand

// delete brand


module.exports = router;
