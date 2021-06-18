import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';
import sequelize from "../db/db";

import Dia from "./Dia";
import Sala from "./Sala";
import User from "./Usuario";
import Disciplina from "./Disciplina";

const Dicta = sequelize.define('dicta',{ 

    dictaid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey:true
    },

    email:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
        references:{
            model:User,
            key: "email"
        }
    }, 

    nombredisciplina:{
        type: Sequelize.STRING(30),
        primaryKey: true,
        references:{
            model:Disciplina,
            key: "nombredisciplina"
        }
    },

    nombredia:{
        type: Sequelize.STRING(30),
        primaryKey: true,
        references:{
            model:Dia,
            key: "nombredia"
        }
    },
    
    /*
    numerosala:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    codinst:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },*/

    salaid:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
            model: Sala,
            key: "salaid"
        }
    },

    inicio:{
        type: Sequelize.TIME,
        primaryKey: true
    },

    fin:{
        type: Sequelize.TIME,
        primaryKey: true
    }
},
{
    timestamps:false,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'dicta'
}
);

export default Dicta;