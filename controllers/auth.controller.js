const { response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google.verify");


const login = async(req,res=response) =>{

    const { email,password} = req.body;
    var uidUsuario='';

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({email});
         if (!usuarioDB){
            return res.status(400).json({
                ok:false,
                mjs:'email no encotrado'
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
            token:token,
            usuarioDB
        })
        uidUsuario=usuarioDB._id;
        console.log(uidUsuario+": uid de usuario autenticado")
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mjs:'Error inesperado'
        });
    }


}

const googleSignIn = async(req,res=response) =>{

    try {
        const {email,name,picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            usuario= new Usuario({
                nombre:name,
                email:email,
                password:'@@@',
                img:picture,
                google:true

            })
        }else{
            usuario = usuarioDB;
            usuario.google= true;

        }
        //guardar usuario
        await usuario.save();
        //JWT
        
        const token = await generarJWT(usuario.id);


        res.status(200).json({
            ok:true,
            email,name,picture,token
        })
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok:true,
            mjs:'Token no es correcto'
        });
    }
    
}

const renewToken = async (req,res=response)=>{

    const uid = req.uid;
    
    const token = await generarJWT(uid);

    const usuarioDB = await Usuario.findById(uid);
    

    res.json({
        ok:true,
        token,
        usuarioDB
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}