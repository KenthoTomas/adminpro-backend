require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { conexionDb } = require('./database/config');

//crear el servidor de express

const app = express();

//configurar CORS:nos permite compativilidad entre diferentes regiones 
//en la que se realizen las peticiones
app.use(cors());

//lectura y parseo del bodykk
app.use(express.json());

//Conexion a base de datos
conexionDb();
//console.log(process.env)

//Rutas
app.use('/api/usuarios',require('./routes/usuarios.route'));
app.use('/api/login',require('./routes/auth.js'));
app.use('/api/hospitales',require('./routes/hospitales.route.js'));
app.use('/api/medicos',require('./routes/medicos.route.js'));
app.use('/api/todo',require('./routes/busqueda.route.js'));
app.use('/api/uploads',require('./routes/uploads.route.js'));

app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${3000}`)
});