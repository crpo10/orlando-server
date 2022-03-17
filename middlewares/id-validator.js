const Car = require('../models/car');


const carExistById = async ( id ) => {

  const existeCar = await Car.findById(id);
  if(!existeCar ){
    throw new Error(`El id no existe ${ id }`);
  }
}

module.exports = {
  carExistById
}