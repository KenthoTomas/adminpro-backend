const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


const login = async(req,res=response) =>{

    const { email,password} = req.body;


    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({email});
         if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                mjs: 'email no encotrado'
            })
         }

         //verificar contraseña

         const validPassword = bcrypt.compareSync(password,usuarioDB.password);

         if(!validPassword){
            return res.status(400).json({
                ok:false,
                mjs:'Contraseña no es valido'
            })
         }

         //generar JWT

         const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            mjs:'Conexion exitosa',
            token:token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mjs:'Error inesperado'
        });
    }


}

const googleSignIn = async(req,res=response) =>{
    res.status(400).json({
        ok:true,
        mjs:req.body.token
    });
}

const renewToken = async (req,res=response)=>{

    const uid = req.uid;
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}