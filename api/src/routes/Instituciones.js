import { Router } from 'express';


import { check } from 'express-validator';
import { viewInstituciones } from '../controllers/Institucion.controller'
import { viewInstitucionesDisciplinas } from '../controllers/Institucion.controller'
import { viewInstitucionesClientes } from '../controllers/Institucion.controller'
import { viewInstitucionDisciplinaCupo } from '../controllers/Institucion.controller'
import { viewInstitucionesEntrenadores } from '../controllers/Institucion.controller'
import { viewInscripciones } from '../controllers/Institucion.controller'

const authorize = require("../core/auth");
const router = Router();

//Testing
router.get('/', viewInstituciones);

router.get('/disciplines', authorize, viewInstitucionesDisciplinas);
router.get('/customers', authorize, viewInstitucionesClientes);
router.get('/trainnners', authorize, viewInstitucionesEntrenadores);
router.get('/availability/:nombredisciplina/:numerosala',
    [
        check('nombredisciplina', 'Nombredisciplina is required')
            .isAlpha()
            .not()
            .isEmpty(),
        check('numerosala', 'Numerosala is required')
            .isNumeric()            
            .not()
            .isEmpty()
    ],
    authorize, viewInstitucionDisciplinaCupo);

export default router;