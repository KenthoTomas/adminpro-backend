const {response} = require('express');
const Hospital = require('../models/hospital.model')

const getHospitales = async(req, res = response)=>{

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre');
                                           

    res.json({
        ok:true,
        hospitales:hospitales
    })
}
const postHospitales =  async(req, res = response)=>{

    const  uid = req.uid;
    const hospital = new Hospital ({
        usuario:uid,
        ...req.body});
   

    try {

    const hospitalDB =     await hospital.save();

        
    res.json({
        ok:true,
        mjs:'postHospitales',
        hospital:hospitalDB
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msj:"Consulte con el administrador"
        }) 
    }

}
const putHospitales = (req, res = response)=>{
    res.json({
        ok:true,
        mjs:'putHospitales'
    })
}
const deleteHospitales = (req, res = response)=>{
    res.json({
        ok:true,
        mjs:'deleteHospitales'
    })
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}