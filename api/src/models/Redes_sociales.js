import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";
import Institucion from "./Institucion";

const Red_social = sequelize.define('redes_sociales',{ 
    codinst:{
        type: Sequelize.INTEGER ,
        primaryKey: true,
        references:{
            model:Institucion,
            key: "codinst"
        }
    },

    redess:{
        type: Sequelize.STRING(30) ,
        primaryKey: true,
    }
});

export default Red_social;