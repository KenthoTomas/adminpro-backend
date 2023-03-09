const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
 


const Usuario = require('../models/usuario.model');



const getUsuarios = async(req,res)=>{

    const desde = Number(req.query.desde) || 0;
    // const  usuarios = await Usuario.find({},'nombre email role google')
    //                                .skip(desde)
    //                                .limit(5);

    // const total = await Usuario.count();

const [usuarios,total] =  await Promise.all([
        Usuario.find({},'nombre email role google img')
                                   .skip(desde)
                                   .limit(5),

                                   Usuario.countDocuments()
    ]);

    res.json({
        ok:true,
        usuarios:usuarios,
        uid:req.uid,
        total:total
    })
}

const postUsuarios = async (req,res = response)=>{
    
    const {email,password} = req.body;

   


    try {
        const existeEmail = await Usuario.findOne({email:email})

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msj:'El correo ya esta registrado'
            })
        }


const usuario = new Usuario(req.body);
//encriptar contraseña
const salt = bcrypt.genSaltSync();
usuario.password = bcrypt.hashSync(password,salt)
//guardar usuario
await usuario.save();
//generar JWT
const token = await generarJWT(usuario.id);
    res.json({
        ok:true,
        usuario:usuario,
        token:token
    }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msj:'error inesperado'
        })
        
    }
    
    
}

const putUsuarios = async(req,res=response)=>{
    const uid = req.params.id;
   
    try {


        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msj:'no existe un usuario con ese id'
            })
        }

        //actualizacion
        const {password,google,email,...campos} = req.body;

        if(usuarioDB.email!==email){
           
       
            const existeEmail = await Usuario.findOne({email:email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msj:'ya existe un usuario con ese email'
                })
            }
        }
       campos.email= email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});


        //TODO: Validar Token y comprobar si es el usuario correcto

        res.json({
            ok:true,
            usuario:usuarioActualizado

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msj:'error inesperado'
        })
    }
}

const deleteUsuarios = async(req,res=response)=>{
    const uid = req.params.id;
   
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msj:'no existe un usuario con ese id'
            })
        }
        
        const eliminarUsuario = await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            uid:eliminarUsuario

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
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}
