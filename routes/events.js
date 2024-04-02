const {Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const {validarJWT} = require('../middlewares/validar-JWT');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { isDate } = require('../helpers/isDate');


const router = Router();
// todas las peticiones seran pasadas por el validar jwt
router.use(validarJWT)

router.get('/', getEventos);

router.post('/', [
    check('title', 'El titulo debe ser obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio de be ser obligatoria').custom(isDate),
    check('end', 'La fecha de inicio de be ser obligatoria').custom(isDate),
    validarCampos
] ,crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;