const path = require('path');
const fs = require('fs');

const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fileUpload = (req, res = response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(tipo)){
        return resizeTo.status(400).json({
            ok:false,
            msj:'no es medico, usuario u hospital'
        })
    }

    // validacion de existencia de archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msj:'no hay archivos'
        })
      }
    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extencion

    const extencionesValidas = ['png','jpg','jpge','gif'];

    if(!extencionesValidas.includes(extencionArchivo)){
        return resizeTo.status(400).json({
            ok:false,
            msj:'no es una extencion permitida'
        })
    }


    //generar nombre del archivo 
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    //path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, function(err) {
        if (err){
          console.log(err)  
          return res.status(500).json({
            ok:false,
            msj:'error al guardar la imagen'
          });
        }

        //actualizar base de datos.

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            msj:'archivo guardado',
            nombreArchivo
        })
      });
    
                                           

    
}

const retornaImagen = (req,res=response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if( fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    }
    else{
        const pathImg = path.join(__dirname, `../uploads/no-imagen.jpg`);
        res.sendFile(pathImg);
    }

    
}

module.exports = {
    fileUpload,
    retornaImagen
}