import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";

import User from "./Usuario";
import InstitucionDisciplina from "./Institucion_disciplina";

const Inscripcion = sequelize.define('inscripciones',{ 

    numinsc:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    idinstdisc:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
            model: InstitucionDisciplina,
            key: "idinstdisc"
        }
    },
    
    /*
    codinst:{
        type: Sequelize.INTEGER,
        primaryKey: true,
            model: InstitucionDisciplina,
            key: 'codinst'
        }
    },

    nombredisciplina:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
        references: {
            model: InstitucionDisciplina,
            key: 'nombredisciplina'
        },
    }   */

    email:{
        type: Sequelize.STRING(30),
        primaryKey: true,
        references:{
            model: User,
            key: "email" 
        }
    },

    diaexpiracion:{
        type: Sequelize.DATEONLY
    },

    fechapago:{
        type: Sequelize.DATEONLY
    },

    cantclases:{
        type: Sequelize.INTEGER,
    }
},
{
    timestamps:false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'inscripciones'
}
);

export default Inscripcion;