import Disciplina from "../models/Disciplina";
import User from "../models/Usuario";
const authorize = require("../core/auth");


//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
export async function viewDisciplinas(req, res) {
    const users = await Disciplina.findAll({
        include : [{
            model:User,
            as : 'entrenador'
        }] 
    }
    );
    console.log(req.body);
    res.json({
        data: users
    });
}