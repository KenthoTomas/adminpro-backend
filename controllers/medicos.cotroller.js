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
const putMedicos = async(req, res = response)=>{
    const id = req.params.id;
    const uidUsuario = req.uid;
    try {

        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(404).json({
                ok:false,
                msj:'No se encontro el medico'
            })
        }

        
        const cambiosMedico = {
            ...req.body,
            usuario:uidUsuario

        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico, {new:true})

        res.json({
            ok:true,
            mjs:'Medico actualizado',
            medicoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status.json({
            ok:false,
            msj: 'hable con el administrador'
        })
    }
    
}
const deleteMedicos = async(req, res = response)=>{
   
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(404).json({
                ok:false,
                msj:'No se encontro el medico'
            })
        }

        await Medico.findByIdAndDelete(id)

        res.json({
            ok:true,
            mjs:'Medico eliminado',
            
        })
        
    } catch (error) {
        console.log(error)
        res.status.json({
            ok:false,
            msj: 'hable con el administrador'
        })
    }



}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
}