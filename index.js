const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');
require('dotenv').config()

//crea el servidor express
const app = express();

dbConnection()

//CORS
app.use(cors());
//directorio
app.use(express.static('public'))

//Lectura y parse del body
app.use(express.json());


//Rutas
app.use('/api/auth', require('./routes/auth')); //todo lo que exporte lo habilita esta ruta
app.use('/api/events', require('./routes/events'))

app.use( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
  } );



app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
});