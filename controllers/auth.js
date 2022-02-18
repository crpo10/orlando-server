const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const user = require('../models/user');

const createUser = async ( req = request , res = response ) => {

  const { email, password } = req.body;

  try {

    const  existeEmail = await User.findOne({ email });

    if(existeEmail){
      return res.status(400).json({
        ok:false,
        msg:'EL correo ya esta registrado'
      });
    }
    const user = new User( req.body );

    // Encriptar 
    const salt =  bcrypt.genSaltSync();

    user.password = bcrypt.hashSync( password, salt );


    await user.save();

    // generar JWT
    const token = await generarJWT( user.id ); 
  
  
    res.json({
      ok:true,
      user,
      token
    })

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Hable con el administrador'
    });
   
  }

}

const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const userDB = await user.findOne({email});

    if (!userDB) {
      return res.status(404).json({
        ok:false,
        msg: 'Email not found'
      });
    }
    // validar usuario
    const validPassword = bcrypt.compareSync( password, userDB.password );
    if (!validPassword) {
      return res.status(400).json({

        ok:false,
        msg: 'la contraseña no es valida'

      })
      
    } else {
      
    }

    const token = await generarJWT( userDB.id );


    res.json({
      ok:true,
      usuario:userDB,
      token
    })

    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg:'Hable con el administrador'

    })
    
  }
}

const renewToken = async (req, res) => { 

  const  uid  = req.uid;
  
  const token = await generarJWT( uid );

  const userDB = await user.findById( uid );

  res.json({
    ok:true,
    userDB,
    token
  })

}


module.exports = {
  createUser,
  login,
  renewToken

}