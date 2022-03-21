const { response, request } = require('express'); 
const Brand = require('../models/brand');
const Car = require('../models/car');


const getCars = async ( req = request, res = response ) => {

  const { limit = 0, from = 0 } = req.query; 
  const query = { state: true };

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

  if(!car.brand) {
    return res.status(400).json({
      msg:`La categoria es obligatoria`
    })
  }

  await Brand.findByIdAndUpdate( car.brand, {$push: { cars: car }} , { new: true } )

  res.json({
    ok:true,
    car: car,
  })
}

const updateCar = async ( req = request, res = response) => {


  const { id } = req.params;

  const { uid,...resto } = req.body;

  const car = await Car.findByIdAndUpdate( id, resto );

  res.json(car)
  
}


const deleteCar = async (req = request , res = response) => {

  const { id } = req.params;

  const car = await Car.findByIdAndUpdate( id, { state: false } )

  res.json(car)

}


module.exports = { 
  createCar,
  updateCar,
  deleteCar,
  getCars
}

