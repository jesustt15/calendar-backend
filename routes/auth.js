// Rutas del Usuario
// host + api/auth

const {Router} = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-JWT');


router.post('/new',
//middlewares de validacion
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe se de minimo 6 carcateres').isLength({min: 6}),
    validarCampos


] ,crearUsuario);

router.post('/',
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe se de minimo 6 carcateres').isLength({min: 6}),
    validarCampos
]
,loginUsuario );

router.get('/renew',validarJWT ,revalidarToken );

module.exports = router;