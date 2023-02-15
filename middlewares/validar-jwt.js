const jwt  = require("jsonwebtoken");

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
        console.log(uid);
        req.uid = uid;
        
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
    validarJWT
}