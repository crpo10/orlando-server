const Brand = require('../models/brand');

const validarBrand = async ( brand ) => {

  const existeBrand = await Brand.findById( brand );
  if(!existeBrand){
    throw new Error(`La marca no existe`);
  }
}

module.exports = {
  validarBrand,
}