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
const putHospitales = async (req, res = response)=>{

    const id = req.params.id;
    const uidUsuario = req.uid;
    try {

        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(404).json({
                ok:false,
                msj:'No se encontro el usuario'
            })
        }

        hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario:uidUsuario

        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital, {new:true})

        res.json({
            ok:true,
            mjs:'putHospitales',
            hospitalActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status.json({
            ok:false,
            msj: 'hable con el administrador'
        })
    }
    
}
const deleteHospitales = async(req, res = response)=>{

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);
        if (!hospital){
            return res.status(404).json({
                ok:false,
                msj:'No se encontro el usuario'
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok:true,
            mjs:'Hospital eliminado',
            
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
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}