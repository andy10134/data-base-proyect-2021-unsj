import Sequelize from "sequelize";
import {sequelize} from '../core/conection';

const User = sequelize.define('Usuario',{
    email:{
        type: Sequelize.STRING ,
        primaryKey: true
    },

    nombre:{
        type: Sequelize.STRING 
    },

    apellido:{
        type: Sequelize.STRING 
    },

    numero_telefono:{
        type: Sequelize.STRING 
    },
    
    nombredeusuario:{
        type: Sequelize.STRING 
    },

    fecha_de_nacimiento:{
        type: Sequelize.DATE 
    },

    nombregenero:{
        type: Sequelize.STRING 
    },

    tipo_usuario:{
        type: Sequelize.STRING 
    },

    CodInst:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps:false
}
);

export default User;