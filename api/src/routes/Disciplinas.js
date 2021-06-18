import {Router} from 'express';

import {viewDisciplinas} from '../controllers/Disciplina.controller'
 
const router = Router();

router.get('/', viewDisciplinas)

export default router;