import Sequelize from "sequelize";
//import {sequelize} from '../core/conection';

import sequelize from '../db/db';

const Disciplina = sequelize.define('disciplinas',{ 
    nombredisciplina:{
        type: Sequelize.STRING(30) ,
        primaryKey: true
    }
});

export default Disciplina;