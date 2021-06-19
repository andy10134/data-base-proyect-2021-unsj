import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from '../db/db';
import Dia from "./Dia";
import Institucion from "./Institucion";


const Horario = sequelize.define('horarios',{ 
    nombredia:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
        references: {
            model: Dia,
            key: 'nombredia'
        }
    },
    codinst: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Institucion,
            key: 'codinst'
        }
    },
    inicio: {
        type: Sequelize.TIME,
        primaryKey: true
    },   
    fin: {
        type: Sequelize.TIME,
        primaryKey: true
    }
});

export default Horario;