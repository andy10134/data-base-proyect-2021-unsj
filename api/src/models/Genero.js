import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from '../db/db';

const Genero = sequelize.define('generos',{ 
    nombregenero:{
        type: Sequelize.STRING(30) ,
        primaryKey: true
    },
},
{
    timestamps: false
});

export default Genero;