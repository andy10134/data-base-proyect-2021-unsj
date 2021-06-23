import Disciplina from "../models/Disciplina";
import Institucion from "../models/Institucion";
import InstitucionDisciplina from "../models/Institucion_disciplina";
import Dicta from "../models/Dicta";
import Sala from "../models/Sala";
import User from "../models/Usuario";

import {
    validationResult
} from 'express-validator';
import Inscripcion from "../models/Inscripcion";
import jwt from "jsonwebtoken";
import sequelize from "../db/db";


const bcrypt = require("bcrypt");



//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//create createInstituciones
export async function createInstituciones(req, res) {
    const errors = validationResult(req);
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else if (user.tipousuario != 'Usuario') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        Institucion.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }).then(institucion => {
                const codinstc = institucion.codinst;
                User.findByPk(user.email).then((usuario) => {
                    usuario.codisnt = codinstc.toString();
                    usuario.tipousuario = "Administrador";
    
                    usuario.save().then(response => {
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
    
                    }).catch(err => {
                        res.status(500).json({
                            error: err,
                            msg:"Error al actualizar"
                        });
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error,
                        msg:"Error usuario"
                    });
                });
        }).catch(err => {
            res.status(500).json({
                error: err,
                msg:"Error Institucion"
            });
        });
    }
}

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

export function viewInstitucionDisciplinas(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (!user.codinst && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        InstitucionDisciplina.findAll({
            where: {
                codinst: user.codinst
            }
            /*include: {
                model: Disciplina,
                attributes: ['nombredisciplina'],
                through: {
                    attributes: []
                }
            }*/
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

export async function viewInstitucionClientes(req, res) {
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
            Disciplina.findByPk(req.params.nombredisciplina, {
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
                                .replace('$fecha', req.body.fecha /*'2021-02-13'*/ )
                                .replace('$inicio', req.body.inicio /*'15:00:00'*/ )
                                .replace('$fin', req.body.fin /*'16:00:00'*/ )
                            ),
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


export async function viewInscripcionesUsuario(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).jsonp(errors.array());
    } else {
        // Inscripcion.findAll({
        //     where: {
        //         email: req.param.email
        //     },
        //     include: {
        //         model: InstitucionDisciplina,
        //         include:{
        //             model: Institucion,
        //             include:{
        //                 model:Sala
        //             }
        //         }
        //     }
        InstitucionDisciplina.findAll({
                where: {
                    codinst: user.codinst
                },
                include:{
                    model:Inscripcion,
                    where:{
                        email:  req.params.email
                    }
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


export async function viewInstitucionEntrenadores(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        Institucion.findByPk(user.codinst, {
            include: [{
                model: Sala,
                include: {
                    model: Dicta,
                    attributes: ['email', 'nombredisciplina', 'nombredia', 'inicio', 'fin']
                }
            }],
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

export async function updateInstitucionDisciplina(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        InstitucionDisciplina.findOne({
            where: {
                nombredisciplina: req.params.nombredisciplina,
                codinst: user.codinst
            }
        }).then(institucion => {
            institucion.descripcion = !req.body.descripcion ? institucion.descripcion : req.body.descripcion;
            institucion.precioclase = !req.body.precioclase ? institucion.precioclase : req.body.precioclase;
            institucion.save().then(response => {
                res.status(200).json({
                    data: response,
                    msg: 'Disciplina updated'
                });
            }).catch(error => {
                res.status(500).json({
                    msg: 'Something goes wrong here',
                    error: error
                });
            });
        }).catch(error => {
            res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
            });
        });
    }
}

//Necesito la contrasenia y el nombre de la disciplina a eliminar
export async function deleteInstitucionDisciplina(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        let getUser;

        User.findByPk(user.email).then(userdb => {
            if (!userdb) {
                return res.status(404).json({
                    message: "Invalid email"
                });
            }
            getUser = userdb;
            return bcrypt.compare(req.body.contraseña, getUser.contraseña);
        }).then(response => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            InstitucionDisciplina.findOne({
                where: {
                    codinst: getUser.codinst,
                    nombredisciplina: req.params.nombredisciplina
                }
            }).then(institucionDisciplina => {
                if (!institucionDisciplina) {
                    return res.status(404).json({
                        message: "Invalid user"
                    });
                }
                institucionDisciplina.destroy().then(data => {
                    res.status(200).json({
                        data: data,
                        msg: 'Discipline has been deleted'
                    });
                });
            });
        }).catch(err => {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        });
    }
}

//Necesito la contrasenia
export async function deleteInstitucion(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token);

    if (user.codinst == null && user.tipousuario != 'Administrador') {
        res.status(401).json({
            msg: 'Unauthorized'
        });
    } else {
        let getUser;

        User.findByPk(user.email).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "Invalid email"
                });
            }
            getUser = user;
            return bcrypt.compare(req.body.contraseña, user.contraseña);
        }).then(response => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            Institucion.findByPk(getUser.codinst).then(institucion => {
                if (!institucion) {
                    return res.status(404).json({
                        message: "Invalid user"
                    });
                }
                institucion.destroy().then(data => {
                    getUser.tipousuario = "Usuario";
                    getUser.codinst = null;
                    getUser.save().then(data => {
                        res.status(200).json({
                            data: data,
                            msg: 'Discipline has been deleted'
                        });
                    }).catch(err => {
                        return res.status(500).json({
                            message: "Server error",
                            error: err
                        });
                    });
                }).catch(err => {
                    return res.status(500).json({
                        message: "Server error",
                        error: err
                    });
                });
            }).catch(err => {
                return res.status(500).json({
                    message: "Server error",
                    error: err
                });
            });;
        }).catch(err => {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        });
    }
}