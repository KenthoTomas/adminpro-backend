/*
Ruta: /api/hospitales
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
} = require('../controllers/hospitales.controller')
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',getHospitales);

router.post('/',[
    validarJWT,
    check('nombre','El nombre del hospital es nesesario').not().isEmpty(),
    validarCampos
  
],
postHospitales
);

router.put('/:id',[
    
],putHospitales);


router.delete('/:id',[

],

deleteHospitales);





module.exports = router;
