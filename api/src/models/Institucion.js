import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";

const Institucion = sequelize.define('instituciones',{ 
    codinst:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre:{
        type: Sequelize.STRING(30) ,
    },

    direccion:{
        type: Sequelize.STRING(30),
    },

    telefono:{
        type: Sequelize.STRING(30),
    }
},
{
    timestamps:false
});

export default Institucion;