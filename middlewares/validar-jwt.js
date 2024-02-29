const jwt  = require("jsonwebtoken");

var uidUsuarioLogeado="";
const validarJWT = (req,res,next) =>{

    //Leer el token
    //el heder viene la req

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            mjs:'No hay token en la peticion'
        })
    }
    try {
        const {uid} = jwt.verify(token , process.env.JWT_SECRET);
        
       
        req.uid = uid;
        uidUsuarioLogeado=req.uid;
        console.log(uidUsuarioLogeado+"uid en validar-jwt")
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msj:'Token Incorrecto'
        })
    }
    next();
}

module.exports={
    validarJWT,
    uidUsuarioLogeado
}