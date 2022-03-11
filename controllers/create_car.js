const { response, request } = require('express'); 
const Car = require('../models/car');


const getCars = async ( req = request, res = response ) => {

  const { limit = 5, from = 0 } = req.query; 
  const query = {estado: true};

    const [ total , cars ] = await Promise.all([
      Car.countDocuments(query),
      Car.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);


    res.json({
      total,
      cars
    })

}

const createCar =  async (req = request , res = response ) => {
  
  const car = new Car( req.body );

  await car.save();

  res.json({
    ok:true,
    car: car,
  })

}

const updateCar = async ( req = request, res = response) => {


  const { id } = req.params;

  const { uid, ...resto } = req.body;
  
  const car = await Car.findByIdAndUpdate( id, resto );

  res.json(car)
  
}


const deleteCar = async (req = request , res = response) => {


  const { id } = req.params;

  const car = await Car.findByIdAndUpdate( id, { estado: false } )

  res.json(car)

}


module.exports = { 
  createCar,
  updateCar,
  deleteCar,
  getCars
}

