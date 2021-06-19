import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";
import Institucion from "./Institucion";

const Sala = sequelize.define('salas',{ 
    /*salaid agregar*/
    salaid:{
        type: Sequelize.INTEGER ,
        autoIncrement: true,
        unique: true
    },

    codinst:{
        type: Sequelize.INTEGER ,
        primaryKey: true,
        references:{
            model: Institucion,
            key: "codinst"
        }
    },

    numerosala:{
        type: Sequelize.INTEGER ,
        primaryKey: true
    },
    
    capacidad:{
        type: Sequelize.INTEGER
    }
});

export default Sala;