const { Schema, model } = require('mongoose');


const brandSchema = new Schema({
  name:{
    type:String,
    required: true,
    unique: true
  },
  state:{
    type: Boolean,
    default:true,
  },
  cars:[{
    type:Schema.Types.ObjectId,
    ref:'Car',
  }],
})

brandSchema.methods.toJSON = function() {
  const { __v,state,...data } = this.toObject();
  return data;
}


module.exports = model('Brand', brandSchema);