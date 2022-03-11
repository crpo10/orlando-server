const express = require('express');
const path = require('path');
require('dotenv').config();


// DB config
require('./database/config').dbConnection();

// App de Express
const app = express();

// server init
const server = require('http').createServer(app);

// lectura y parseo del body
app.use( express.json() );

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



// Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api', require('./routes/create_car'))


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


