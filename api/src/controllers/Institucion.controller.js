import Disciplina from "../models/Disciplina";
import Institucion from "../models/Institucion";
import InstitucionDisciplina from "../models/Institucion_disciplina";
import Dicta from "../models/Dicta";
import Sala from "../models/Sala";

import { validationResult } from 'express-validator';
import Inscripcion from "../models/Inscripcion";
import jwt from "jsonwebtoken";
import sequelize from "../db/db";


//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
export async function viewInstituciones(req, res) {

    const data = await Institucion.findByPk(1, {
        attributes: {
            include: [
                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                        SELECT COUNT(email)
                        FROM salas NATURAL JOIN dicta
                        WHERE
                            codinst = $codinst 
                    )`.replace('$codinst', 1)),
                    'entrenadores'
                ],
                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                        SELECT COUNT(email)
                        FROM institucion_disciplina NATURAL JOIN inscripciones
                        WHERE
                            institucion_disciplina.codinst = $codinst
                    )`.replace('$codinst', 1)),
                    'clientes'
                ]
            ]
        }
    });

    res.status(200).json({
        //token: jwtToken,
        expiresIn: 3600,
        data: data
    });

    /*const users = await Institucion.findAll();
    console.log(req.body);
    res.json({
        data: users
    });*/
}

export function viewInstitucionesDisciplinas(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (!user.codinst && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        Institucion.findByPk(user.codinst, {
            include: {
                model: Disciplina,
                attributes: ['nombredisciplina'],
                through: {
                    attributes: []
                }
            }
        }).then(institucion => {
            if (!institucion) {
                res.status(404).json({
                    mgs: 'Invalid codinst'
                });
            } else {
                res.status(200).json({
                    data: institucion
                });
            }
        }).catch(error => {
            res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
            });
        });

    }

}

export async function viewInstitucionesClientes(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        InstitucionDisciplina.findAll({

            attributes: ['nombredisciplina'],
            include: {
                model: Inscripcion,
                attributes: ['email']
            },
            where: {
                codinst: user.codinst
            }

        }).then(clientes => {

            if (!clientes) {
                res.status(404).json({
                    mgs: 'Invalid codinst'
                });
            } else {
                res.status(200).json({
                    data: clientes
                });
            }
        }).catch(error => {
            res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
            });
        });

    }

}

export async function viewInstitucionDisciplinaCupo(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.decode(token);

        if (user.codinst == null && user.tipousuario != 'Administrador') {
            res.status(401).json({
                msg: 'Unauthorized'
            });
        } else {
            Disciplina.findByPk(req.params.nombredisciplina , {
                attributes: {
                    include: [
                        [
                            sequelize.literal(`
                            
                            (
                                SELECT salas.capacidad
                                FROM salas
                                WHERE 
                                    codinst = $codinst AND
                                    salas.numerosala = $numerosala
                            )
                            -
                            (
                                SELECT COUNT(DISTINCT email)
                                FROM salas NATURAL JOIN dicta INNER JOIN asiste ON dicta.dictaid = asiste.dictaid
                                WHERE 
                                    codinst = $codinst AND
                                    salas.numerosala = $numerosala AND
                                    nombredisciplina = '$nombredisciplina' AND
                                    fecha = '$fecha' AND
                                    dicta.inicio  = '$inicio' AND
                                    dicta.fin  = '$fin'
                            )`
                                .replace('$codinst', user.codinst)
                                .replace('$numerosala', req.params.numerosala)
                                .replace('$codinst', user.codinst)
                                .replace('$numerosala', req.params.numerosala)
                                .replace('$nombredisciplina', req.params.nombredisciplina)
                                .replace('$fecha', req.body.fecha /*'2021-02-13'*/)
                                .replace('$inicio', req.body.inicio /*'15:00:00'*/)
                                .replace('$fin', req.body.fin /*'16:00:00'*/)
                            )
                            ,
                            'cupo'
                        ]
                    ]
                }
            }).then(cupo => {
                if (!cupo) {
                    res.status(404).json({
                        mgs: 'Invalid codinst'
                    });
                } else {
                    res.status(200).json({
                        data: cupo
                    });
                }
            }).catch(error => {
                res.status(500).json({
                    msg: 'Something goes wrong here',
                    error: error
                });
            });

        }
    }
}

export async function viewInstitucionesEntrenadores(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        Institucion.findByPk(user.codinst, {
            include:[
                {
                    model: Sala,
                    include:{
                        model:Dicta,
                        attributes:['email','nombredisciplina' , 'nombredia','inicio', 'fin']
                    }
                }
            ],
        }).then(clases => {
            if (!clases) {
                res.status(404).json({
                    mgs: 'Invalid codinst'
                });
            } else {
                res.status(200).json({
                    data: clases
                });
            }
        }).catch(error => {
            res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
            });
        });

    }
}