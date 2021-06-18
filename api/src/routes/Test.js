import {Router} from 'express';
import User from "../models/Usuario";
import Genero from '../models/Genero';
import Institucion from '../models/Institucion';
import Red_social from '../models/Redes_sociales';
import InstitucionDisciplina from '../models/Institucion_disciplina';
import Disciplina from '../models/Disciplina';
import Dicta from '../models/Dicta';
import Sala from '../models/Sala';
 
const router = Router();

router.get('/',function (req, res) {
    res.json("Hola Mundo");
});

router.get('/users',async function (req, res) {
    const users = await Sala.findAll();/*Dicta.findAll(/*{
        include:
            [{ 
                model:Disciplina
            },{
                model:Institucion,
                as: "institucion"
            }]
    }
        {
            include:{
                model:
            }
        }
    );*/
    console.log(req.body);
    res.json({
        data: users
    });
});

export default router;
