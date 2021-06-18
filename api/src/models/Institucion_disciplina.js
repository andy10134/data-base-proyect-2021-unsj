import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";

import User from "./Usuario";
import Disciplina from "./Disciplina";
import Institucion from "./Institucion";

const InstitucionDisciplina = sequelize.define('institucion_disciplina',{ 
    idinstdisc:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique:true,
        primaryKey:true
    },

    codinst:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Institucion,
            key: 'codinst'
        }
    },

    nombredisciplina:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
        references: {
            model: Disciplina,
            key: 'nombredisciplina'
        }
    },

    precioclase:{
        type: Sequelize.STRING(30)
    },

    descripcion:{
        type: Sequelize.STRING(30)
    }
},
{
    timestamps:false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'institucion_disciplina',
});

export default InstitucionDisciplina;