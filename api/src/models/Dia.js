import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from "../db/db";


const Dia = sequelize.define('dias',{ 
    nombredia:{
        type: Sequelize.STRING(30) ,
        primaryKey: true
    }
});

export default Dia;