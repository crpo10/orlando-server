const { Schema , model } = require('mongoose');


const CarSchema = Schema({
  brand:{
    type: Schema.Types.ObjectId,
    ref:'Brand',
  },
  model:{
    type:String,
  },
  year:{
    type:String,
  },
  engine:{
    type:String,
  },
  mileage:{
    type:String,
  },
  transmission:{
    type:String,
  },
  owner:{
    type:String,
  },
  location:{
    type:String,
  },
  condition:{
    type:String,
  },
  price:{
    type: Number,
    default: 0,
  },
  comments:{
    type:String,
  },
  contact:{
    type:String
  },
  url_image:{
    type:String,
  },
  state:{
    type:Boolean,
    default:true,
  },
});

CarSchema.methods.toJSON = function() {
  const { __v, _id,...object } = this.toObject();
  object.uid = _id;
  return object;
}

module.exports = model('Car', CarSchema);

// {
//   "brand":"Toyota",
//   "model": "Fortuner SR",
//   "year":"2010",
//   "engine":"V6 4.0",
//   "mileage":"120.000",
//   "transmission":"Automatica 4x2",
//   "owner":"1-1",
//   "location":"Caracas",
//   "condition":"totalmente impecable, 4 cauchos nuevos, servicios al dia",
//   "comments":"potencia 238 HP, consumo de combustible 15.06 L/100km, capacidad del tanque 80 lts",
//   "price":"19.400"
// }





