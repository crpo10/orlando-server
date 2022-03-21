const Brand = require('../models/brand');
const Car = require('../models/car');


const carExistById = async ( id ) => {

  const existeCar = await Car.findById(id);
  if(!existeCar ){
    throw new Error(`El id no existe ${ id }`);
  }
}

const brandExisteById = async ( id ) => {
  
  const existeBrand = await Brand.findById(id);
  if (!existeBrand) {
    throw new Error(`El id : ${ id } no existe `) 
  }
}



module.exports = {
  carExistById,
  brandExisteById,
}