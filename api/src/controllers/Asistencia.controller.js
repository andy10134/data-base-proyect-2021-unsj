//import Asistencia from "../models/Asiste";
import User from "../models/Usuario";
import Dicta from "../models/Dicta";
import Asistencia from "../models/Asiste";
import Sala from "../models/Sala";
const authorize = require("../core/auth");
import { validationResult } from 'express-validator';


//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
export async function viewAsistencias(req, res) {
    const users = await Dicta.findAll(
        {
            include: [{
                model: User,
                as: 'entrenador'
            },{
                model: User,
                as: 'cliente'
            }]
        });
    console.log(req.body);
    res.json({
        data: users
    });
}


//Clases asistidas por un cliente (ingresado un email de cliente)
export async function viewUsuarioAsistencias(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.email == null ) {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        User.findByPk(user.email ,{
            attributes: ['email', 'nombredeusuario'],
            include:[
                {
                    model:Dicta,
                    as: 'disciplinasAsistidas',
                    attributes: ['nombredisciplina',['email', 'emailentrenador']],
                    include: [
                        {
                            model:Sala,
                            attributes: ['codinst', 'numerosala']
                        },
                        {
                            model: Asistencia,
                            attributes: ['fecha', 'inicio', 'fin'],
                            as: 'asistio'
                        }
                    ], 
                    through: {
                        attributes: []
                    }  
                }
            ]
        }).then(asistencias => {
            if(!asistencias){
                res.status(404).json({
                    mgs: 'Invalid email'
                });   
            } else {     
                res.status(200).json({
                    data: asistencias
                });
            }
        }).catch();
    }
}
