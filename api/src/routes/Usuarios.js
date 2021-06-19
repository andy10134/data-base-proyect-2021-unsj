import { Router } from 'express';
import { check } from 'express-validator';

import { viewUsuarios } from '../controllers/Usuario.controller';
import { createUsuarios } from '../controllers/Usuario.controller';
import { viewInscripciones } from '../controllers/Usuario.controller';
import { loginUsuarios } from '../controllers/Usuario.controller';
import { updatePassword } from '../controllers/Usuario.controller';

const authorize = require("../core/auth");
const router = Router();

router.get('/', authorize, viewUsuarios);

router.post('/login', [
    check('email')
        .isEmail()
        .not()
        .isEmpty()
        .isLength({ min: 3 }),
    check('contraseña', 'Password should be between 5 to 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 10 })
],
    loginUsuarios);

// Sign-up
router.post("/register",
    [
        check('nombredeusuario')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('contraseña', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, max: 8 })
    ], // agregar mas checks xd
    createUsuarios
);

router.get('/:email/inscriptions',
    check('email', 'Email is required')
        .not()
        .isEmpty()
        .isEmail(),
    viewInscripciones
);

router.post('/update/password', [
    check('email')
        .isEmail()
        .not()
        .isEmpty()
        .isLength({ min: 3 }),
    check('contraseña', 'Password should be between 5 to 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 10 }),
    check('nuevacontraseña', 'Password should be between 5 to 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 20 })
],
    authorize, updatePassword);

export default router;