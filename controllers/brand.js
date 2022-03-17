const { response , request } = require("express");
const res = require("express/lib/response");
const Brand = require('../models/brand');


// get brands
const getBrands =  async (req, res ) => {
  const query =  { estado: true  };

  const [ total, brands ] = await Promise.all([
    Brand.countDocuments(query),
    Brand.find(query).populate('cars'),
  ]);

  res.json({
    total,
    brands
  });

}
// get brand por id 
const getBrandPorId = async (req, res) => { 
  const { id } = req.params;

  const brand = await Brand.findById( id ).populate('cars');

  res.json(brand)

}



// create brand
const createBrand = async ( req = request, res = response) => {

  const { name , cars }  = req.body;

  const brandDB = await Brand.findOne({ name });

  if (brandDB) {
    return res.status(400).json({
      msg:`La marca ${ brandDB.name }, ya existe`
    })
  }

  const data = {
    name,
    cars
  }

  const brand = new Brand( data );

  await brand.save();

  res.status(201).json( brand );

  
}

// update brand



// delete brand


module.exports = {
  getBrands,
  createBrand,
  getBrandPorId
}