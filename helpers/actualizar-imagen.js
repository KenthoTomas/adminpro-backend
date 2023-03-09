const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const actualizarImagen = async (tipo, id, nombreArchivo) =>{
    
const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //borra la imagen anterior
        fs.unlinkSync(path);
    }
}
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }

            const pathViejo1 = `./uploads/medicos/${medico.img}`
            borrarImagen(pathViejo1);


            medico.img = nombreArchivo;
            await medico.save();
            return true; 

            break;
        case 'hospitales':
            
        const hospital = await Hospital.findById(id);
            if(!hospital){
                return false;
            }

            const pathViejo2 = `./uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo2);

            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true; 

            break;
        case 'usuarios':
               
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return false;
        }

        const pathViejo3 = `./uploads/usuarios/${usuario.img}`
        borrarImagen(pathViejo3);

        
        usuario.img = nombreArchivo;
        await usuario.save();
        return true; 
            break;
    
    
        default:
            break;
    }

}


module.exports={
    actualizarImagen
}