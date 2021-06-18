import {Router} from 'express';

import {viewHorarios} from '../controllers/Horario.controller';
 
const router = Router();

router.get('/', viewHorarios)

export default router;