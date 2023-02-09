require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { conexionDb } = require('./database/config');

//crear el servidor de express

const app = express();

//configurar CORS
app.use(cors())

//Conexion a base de datos
conexionDb();
//console.log(process.env)

//Rutas

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msj:'Hola mundo'
    })
});

app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${3000}`)
})