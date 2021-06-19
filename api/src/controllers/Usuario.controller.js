const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

import User from "../models/Usuario";
import Inscripcion from "../models/Inscripcion";
import InstitucionDisciplina from "../models/Institucion_disciplina";
import Institucion from "../models/Institucion";
import sequelize from "../db/db";

//test
export async function viewUsuarios(req, res) {
    const users = await User.findAll();
    const token = req.headers.authorization.split(" ")[1];
    const xd = jwt.decode(token);
    console.log(xd);
    res.json({
        data: users
    });
}

/**
 let jwtToken = jwt.sign({
        email: getUser.email,
        userId: getUser._id
    }, "longer-secret-is-better", {
        expiresIn: "1h"
    });
    res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        msg: getUser
    });
*/

//login
export function loginUsuarios(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        let getUser;
        User.findByPk(req.body.email).then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            getUser = user;
            return bcrypt.compare(req.body.contraseña, user.contraseña);
        }).then(response => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication failed1"
                });
            }
            let jwtToken = jwt.sign({
                email: getUser.email,
                tipousuario: getUser.tipousuario,
                nombredeusuario: getUser.nombredeusuario,
                codinst: getUser.codinst
            }, "longer-secret-is-better", {
                expiresIn: "1h"
            });

            if (getUser.codinst == null && getUser.tipousuario != 'Administrador') {
                console.log('xd');
                return res.status(200).json({
                    token: jwtToken,
                    expiresIn: 3600,
                    msg: getUser
                });
            }

            Institucion.findByPk(getUser.codinst, {
                attributes: {
                    include: [
                        [
                            // Subquery
                            sequelize.literal(`(
                                    SELECT COUNT(email)
                                    FROM salas NATURAL JOIN dicta
                                    WHERE
                                        codinst = $codinst 
                                )`.replace('$codinst', getUser.codinst)),
                            'entrenadores'
                        ],
                        [
                            // Subquery
                            sequelize.literal(`(
                                    SELECT COUNT(email)
                                    FROM institucion_disciplina NATURAL JOIN inscripciones
                                    WHERE
                                        institucion_disciplina.codinst = $codinst
                                )`.replace('$codinst', getUser.codinst)),
                            'clientes'
                        ],
                        [
                            // Subquery
                            sequelize.literal(`(
                                    SELECT COUNT(nombredisciplina)
                                    FROM institucion_disciplina
                                    WHERE
                                        institucion_disciplina.codinst = $codinst
                                )`.replace('$codinst', getUser.codinst)),
                            'disciplinas'
                        ]
                    ]
                }
            }).then(data => {
                return res.status(200).json({
                    token: jwtToken,
                    expiresIn: 3600,
                    data: data
                });
            }).catch(err => {
                return res.status(401).json({
                    message: "Authentication failed",
                    error: err
                });
            });
        }).catch(err => {
            return res.status(401).json({
                message: "Authentication failed",
                error: err
            });
        });
    }
}

//sign up
export function createUsuarios(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    }
    else {

        console.log(req.body);
        bcrypt.hash(req.body.contraseña, 10, (err, hash) => {
            console.log(hash);
            User.create({
                email: req.body.email,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                numerotelefono: req.body.numerotelefono,
                nombredeusuario: req.body.nombredeusuario,
                contraseña: hash,
                fechanacimiento: req.body.fechanacimiento,
                nombregenero: req.body.nombregenero,
                tipousuario: 'Usuario'
            }).then((response) => {

                let jwtToken = jwt.sign({
                    email: response.email,
                    tipousuario: response.tipousuario,
                    nombredeusuario: response.nombredeusuario,
                    codinst: response.codinst
                }, "longer-secret-is-better", {
                    expiresIn: "1h"
                });

                res.status(200).json({
                    token: jwtToken,
                    expiresIn: 3600,
                    msg: response
                });

            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
    }
}

export async function viewInscripciones(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else {
        Inscripcion.findAll({
            where: {
                email: req.params.email
            },
            include: {
                model: InstitucionDisciplina,
            }

        }).then(inscripcion => {

            if (!inscripcion) {
                res.status(404).json({
                    mgs: 'Invalid codinst'
                });
            } else {
                res.status(200).json({
                    data: inscripcion
                });
            }
        }).catch();

    }
}
