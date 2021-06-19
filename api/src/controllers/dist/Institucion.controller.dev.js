"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewInstituciones = viewInstituciones;
exports.viewInstitucionDisciplinas = viewInstitucionDisciplinas;
exports.viewInstitucionClientes = viewInstitucionClientes;
exports.viewInstitucionDisciplinaCupo = viewInstitucionDisciplinaCupo;
exports.viewInstitucionEntrenadores = viewInstitucionEntrenadores;
exports.updateInstitucionDisciplina = updateInstitucionDisciplina;

var _Disciplina = _interopRequireDefault(require("../models/Disciplina"));

var _Institucion = _interopRequireDefault(require("../models/Institucion"));

var _Institucion_disciplina = _interopRequireDefault(require("../models/Institucion_disciplina"));

var _Dicta = _interopRequireDefault(require("../models/Dicta"));

var _Sala = _interopRequireDefault(require("../models/Sala"));

var _expressValidator = require("express-validator");

var _Inscripcion = _interopRequireDefault(require("../models/Inscripcion"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
function viewInstituciones(req, res) {
  var data;
  return regeneratorRuntime.async(function viewInstituciones$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Institucion["default"].findByPk(1, {
            attributes: {
              include: [[// Note the wrapping parentheses in the call below!
              _db["default"].literal("(\n                        SELECT COUNT(email)\n                        FROM salas NATURAL JOIN dicta\n                        WHERE\n                            codinst = $codinst \n                    )".replace('$codinst', 1)), 'entrenadores'], [// Note the wrapping parentheses in the call below!
              _db["default"].literal("(\n                        SELECT COUNT(email)\n                        FROM institucion_disciplina NATURAL JOIN inscripciones\n                        WHERE\n                            institucion_disciplina.codinst = $codinst\n                    )".replace('$codinst', 1)), 'clientes']]
            }
          }));

        case 2:
          data = _context.sent;
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

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function viewInstitucionDisciplinas(req, res) {
  var token = req.headers.authorization.split(" ")[1];

  var user = _jsonwebtoken["default"].decode(token);

  if (!user.codinst && user.tipousuario != 'Administrador') {
    res.status(401).json({
      msg: 'Unauthorized'
    });
  } else {
    _Institucion["default"].findByPk(user.codinst, {
      include: {
        model: _Disciplina["default"],
        attributes: ['nombredisciplina'],
        through: {
          attributes: []
        }
      }
    }).then(function (institucion) {
      if (!institucion) {
        res.status(404).json({
          mgs: 'Invalid codinst'
        });
      } else {
        res.status(200).json({
          data: institucion
        });
      }
    })["catch"](function (error) {
      res.status(500).json({
        msg: 'Something goes wrong here',
        error: error
      });
    });
  }
}

function viewInstitucionClientes(req, res) {
  var token, user;
  return regeneratorRuntime.async(function viewInstitucionClientes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.headers.authorization.split(" ")[1];
          user = _jsonwebtoken["default"].decode(token);

          if (user.codinst == null && user.tipousuario != 'Administrador') {
            res.status(401).json({
              msg: 'Unauthorized'
            });
          } else {
            _Institucion_disciplina["default"].findAll({
              attributes: ['nombredisciplina'],
              include: {
                model: _Inscripcion["default"],
                attributes: ['email']
              },
              where: {
                codinst: user.codinst
              }
            }).then(function (clientes) {
              if (!clientes) {
                res.status(404).json({
                  mgs: 'Invalid codinst'
                });
              } else {
                res.status(200).json({
                  data: clientes
                });
              }
            })["catch"](function (error) {
              res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
              });
            });
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function viewInstitucionDisciplinaCupo(req, res) {
  var errors, token, user;
  return regeneratorRuntime.async(function viewInstitucionDisciplinaCupo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = (0, _expressValidator.validationResult)(req);

          if (!errors.isEmpty()) {
            res.status(422).jsonp(errors.array());
          } else {
            token = req.headers.authorization.split(" ")[1];
            user = _jsonwebtoken["default"].decode(token);

            if (user.codinst == null && user.tipousuario != 'Administrador') {
              res.status(401).json({
                msg: 'Unauthorized'
              });
            } else {
              _Disciplina["default"].findByPk(req.params.nombredisciplina, {
                attributes: {
                  include: [[_db["default"].literal("\n                            \n                            (\n                                SELECT salas.capacidad\n                                FROM salas\n                                WHERE \n                                    codinst = $codinst AND\n                                    salas.numerosala = $numerosala\n                            )\n                            -\n                            (\n                                SELECT COUNT(DISTINCT email)\n                                FROM salas NATURAL JOIN dicta INNER JOIN asiste ON dicta.dictaid = asiste.dictaid\n                                WHERE \n                                    codinst = $codinst AND\n                                    salas.numerosala = $numerosala AND\n                                    nombredisciplina = '$nombredisciplina' AND\n                                    fecha = '$fecha' AND\n                                    dicta.inicio  = '$inicio' AND\n                                    dicta.fin  = '$fin'\n                            )".replace('$codinst', user.codinst).replace('$numerosala', req.params.numerosala).replace('$codinst', user.codinst).replace('$numerosala', req.params.numerosala).replace('$nombredisciplina', req.params.nombredisciplina).replace('$fecha', req.body.fecha
                  /*'2021-02-13'*/
                  ).replace('$inicio', req.body.inicio
                  /*'15:00:00'*/
                  ).replace('$fin', req.body.fin
                  /*'16:00:00'*/
                  )), 'cupo']]
                }
              }).then(function (cupo) {
                if (!cupo) {
                  res.status(404).json({
                    mgs: 'Invalid codinst'
                  });
                } else {
                  res.status(200).json({
                    data: cupo
                  });
                }
              })["catch"](function (error) {
                res.status(500).json({
                  msg: 'Something goes wrong here',
                  error: error
                });
              });
            }
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function viewInstitucionEntrenadores(req, res) {
  var token, user;
  return regeneratorRuntime.async(function viewInstitucionEntrenadores$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.headers.authorization.split(" ")[1];
          user = _jsonwebtoken["default"].decode(token);

          if (user.codinst == null && user.tipousuario != 'Administrador') {
            res.status(401).json({
              msg: 'Unauthorized'
            });
          } else {
            _Institucion["default"].findByPk(user.codinst, {
              include: [{
                model: _Sala["default"],
                include: {
                  model: _Dicta["default"],
                  attributes: ['email', 'nombredisciplina', 'nombredia', 'inicio', 'fin']
                }
              }]
            }).then(function (clases) {
              if (!clases) {
                res.status(404).json({
                  mgs: 'Invalid codinst'
                });
              } else {
                res.status(200).json({
                  data: clases
                });
              }
            })["catch"](function (error) {
              res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
              });
            });
          }

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function updateInstitucionDisciplina(req, res) {
  var token, user;
  return regeneratorRuntime.async(function updateInstitucionDisciplina$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.headers.authorization.split(" ")[1];
          user = _jsonwebtoken["default"].decode(token);

          if (user.codinst == null && user.tipousuario != 'Administrador') {
            res.status(401).json({
              msg: 'Unauthorized'
            });
          } else {
            _Institucion_disciplina["default"].findOne({
              where: {
                nombredisciplina: req.params.nombredisciplina,
                codinst: user.codinst
              }
            }).then(function (institucion) {
              institucion.descripcion = !req.body.descripcion ? institucion.descripcion : req.body.descripcion;
              institucion.precioclase = !req.body.precioclase ? institucion.precioclase : req.body.precioclase;
              institucion.save().then(function (response) {
                res.status(200).json({
                  data: response,
                  msg: 'Disciplina updated'
                });
              })["catch"](function (error) {
                res.status(500).json({
                  msg: 'Something goes wrong here',
                  error: error
                });
              });
            })["catch"](function (error) {
              res.status(500).json({
                msg: 'Something goes wrong here',
                error: error
              });
            });
          }

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}