import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from '../db/db';

import Genero from "./Genero";
import Institucion from "./Institucion";

const User = sequelize.define('usuarios',{ 
    email:{
        type: Sequelize.STRING(30) ,
        primaryKey: true
    },

    nombre:{
        type: Sequelize.STRING(30),
        allowNull:false 
    },

    apellido:{
        type: Sequelize.STRING(30),
        allowNull:false 
    },

    numerotelefono:{
        type: Sequelize.STRING(30),
        allowNull:false 
    },
    
    nombredeusuario:{
        type: Sequelize.STRING(30),
        allowNull:false 
    },

    contraseña:{
        type: Sequelize.STRING(255),
        allowNull:false
    },

    fechanacimiento:{
        type: Sequelize.DATEONLY,
        allowNull:false                    
    },

    nombregenero:{
        type: Sequelize.STRING(30), 
        references: {
            model: Genero,
            key: 'nombregenero'
          },
        allowNull:false 
    },

    tipousuario:{
        type: Sequelize.STRING(30),
        allowNull:false 
    },

    codinst:{
        type: Sequelize.INTEGER,
        references: {
            model: Institucion,
            key: 'codinst'
        },
        allowNull:true
    }
},
{
    timestamps:false
}
);

export default User; 