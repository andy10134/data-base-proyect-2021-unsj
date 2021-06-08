import {Router} from 'express';
import {viewUsuarios} from '../controllers/Usuario.controller'
 
const router = Router();

router.get('/', viewUsuarios)

export default router;