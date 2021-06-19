import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";
import Dicta from "./Dicta";
import User from "./Usuario";

const Asistencia = sequelize.define('asiste',{ 
    
    dictaid:{
        type: Sequelize.INTEGER,
        references:{
            model: Dicta,
            key: "dictaid"
        }
    },
    
    emailcliente:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
        references:{
            model:User,
            key: "email"
        }
    },

/*
    email:{
        type: Sequelize.STRING(30) ,
        primaryKey: true
    },

    nombredisciplina:{
        type: Sequelize.STRING(30),
        primaryKey: true
    },

    nombredia:{
        type: Sequelize.STRING(30),
        primaryKey: true
    },
    
    numerosala:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    codinst:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
*/
    inicio:{
        type: Sequelize.TIME,
        primaryKey: true
    },

    fin:{
        type: Sequelize.TIME,
        primaryKey: true
    },

    fecha:{
        type: Sequelize.DATEONLY,
        primaryKey: true
    },
},
{
    timestamps:false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'asiste'
}
);

export default Asistencia;