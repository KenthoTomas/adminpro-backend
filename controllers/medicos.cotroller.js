const {response} = require('express');
const Medico =  require('../models/medico.model');

const getMedicos = async (req, res = response)=>{



    const medicos = await Medico.find()
                                    .populate('usuario','nombre')
                                    .populate('Hospital','nombre')
    res.json({
        ok:true,
        mjs:'getMedicos',
        medicos:medicos
    })
}
const postMedicos = async(req, res = response)=>{
    
    const  uid = req.uid;
    const medico = new Medico ({
        usuario:uid,
        ...req.body});

    try {

    const medicolDB =  await medico.save();
    
    res.json({
        ok:true,
        mjs:'postMediocs',
        medico:medicolDB
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msj:"Consulte con el administrador"
        }) 
    }
    
    

}
const putMedicos = (req, res = response)=>{
    res.json({
        ok:true,
        mjs:'putMedicos'
    })
}
const deleteMedicos = (req, res = response)=>{
    res.json({
        ok:true,
        mjs:'deleMedicos'
    })
}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
}