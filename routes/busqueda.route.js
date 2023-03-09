/*
Ruta: /api/todo/:busqueda
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {
    getTodo,
    getDocumentosColeccion,

} = require('../controllers/busqueda.controller')
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:busqueda',[
    validarJWT,
    validarCampos
],getTodo);

router.get('/coleccion/:tabla/:busqueda',[
    validarJWT,
    validarCampos,
],getDocumentosColeccion);


module.exports = router;
