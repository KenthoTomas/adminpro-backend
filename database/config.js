const mongoose = require('mongoose');


const conexionDb = async ()=>{


    try{
        await mongoose.connect(  process.env.DB_CNN );
        console.log('DB en linea')
    }
    catch(error){
        console.log(error);
        throw new Error('Error a la en la inicializacion de la Base de Datos')
    }
    
}

module.exports = {
    conexionDb
}