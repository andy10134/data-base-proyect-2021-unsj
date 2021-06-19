import {Router} from 'express';
import { check } from 'express-validator';

import {viewAsistencias} from '../controllers/Asistencia.controller';
import {viewUsuarioAsistencias} from '../controllers/Asistencia.controller';

const authorize = require("../core/auth");
const router = Router();

router.get('/me', authorize, viewUsuarioAsistencias)

export default router; 