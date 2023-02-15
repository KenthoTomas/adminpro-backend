/*
Ruta: /api/usuarios
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getUsuarios,postUsuarios,putUsuarios,deleteUsuarios} = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','debe de ser un email valido').isEmail(),
    validarCampos,
],
postUsuarios
);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','debe de ser un email valido').isEmail(),
   

    validarCampos,
    
],putUsuarios);


router.delete('/:id',[
    validarJWT,
    validarCampos,

],

deleteUsuarios);





module.exports = router;
