const {response} = require('express');
const Usuario = require('../models/usuario.model');
const  Medico = require('../models/medico.model');
const  Hospital = require('../models/hospital.model');

const getTodo = async(req, res = response)=>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [ usuario, medico, hospital] = await Promise.all([
         Hospital.find({nombre: regex}),
         Medico.find({nombre: regex}),
         Usuario.find({nombre: regex}),
    ])
 try {

    res.json({
        ok:true,
        usuario:usuario,
        medico:medico,
        hospital:hospital
    })
    
 } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msj:'error inesperado'
 })
    
 }

}

const getDocumentosColeccion = async(req, res = response)=>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data;

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('Hospital','nombre img')
            break;
        case 'hospitales':
            data =  await Hospital.find({nombre: regex})
                                .populate('usuario','nombre img')
            break;
        case 'usuarios':
           data =  await Usuario.find({nombre: regex});
           
            break;
    
        default:
           return  res.status(400).json({
                ok:false,
                msj:'Tabla debe de ser de medicos, hospitales o usuarios'
            })
            break;
    }


 try {

    res.json({
        ok:true,
        resultados: data
       })
    
 } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msj:'error inesperado'
 })
    
 }

}

module.exports = {
    getTodo,
    getDocumentosColeccion,
    
}