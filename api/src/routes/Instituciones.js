import { Router } from 'express';


import { check } from 'express-validator';
import { viewInstituciones } from '../controllers/Institucion.controller';
import { viewInstitucionDisciplinas } from '../controllers/Institucion.controller';
import { viewInstitucionClientes } from '../controllers/Institucion.controller';
import { viewInstitucionDisciplinaCupo } from '../controllers/Institucion.controller';
import { viewInstitucionEntrenadores } from '../controllers/Institucion.controller';
import { updateInstitucionDisciplina } from '../controllers/Institucion.controller';
import { createInstituciones } from '../controllers/Institucion.controller';
import { deleteInstitucionDisciplina } from '../controllers/Institucion.controller';
import { deleteInstitucion } from '../controllers/Institucion.controller';

const authorize = require("../core/auth");
const router = Router();

//Testing
router.get('/', viewInstituciones);
router.get('/disciplines', authorize, viewInstitucionDisciplinas);
router.get('/customers', authorize, viewInstitucionClientes);
router.get('/trainers', authorize, viewInstitucionEntrenadores);
router.post('/signup', authorize, createInstituciones);
router.post('/delete', authorize, deleteInstitucion);
router.post('/delete/discipline/:nombredisciplina',
    [
        check('nombredisciplina', 'Nombredisciplina is required')
            .isAlpha()
            .not()
            .isEmpty()
    ],
    authorize, deleteInstitucionDisciplina);
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
router.post('/update/discipline/:nombredisciplina', authorize, updateInstitucionDisciplina);

export default router;