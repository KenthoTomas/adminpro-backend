/*
Ruta: /api/medicos
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
} = require('../controllers/medicos.cotroller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',getMedicos);

router.post('/',[
    validarJWT,
    check('nombre','El nombre del medico es nesesario').not().isEmpty(),
    check('Hospital','El id del hospital es nesesario y valid').isMongoId(),
    validarCampos
  
],
postMedicos
);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre del medico es nesesario').not().isEmpty(),
    check('Hospital','El id del hospital es nesesario y valid').isMongoId(),

],putMedicos);


router.delete('/:id',[
    validarJWT
],

deleteMedicos);





module.exports = router;
