"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewUsuarios = viewUsuarios;
exports.loginUsuarios = loginUsuarios;
exports.createUsuarios = createUsuarios;
exports.viewInscripciones = viewInscripciones;
exports.updatePassword = updatePassword;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _Inscripcion = _interopRequireDefault(require("../models/Inscripcion"));

var _Institucion_disciplina = _interopRequireDefault(require("../models/Institucion_disciplina"));

var _Institucion = _interopRequireDefault(require("../models/Institucion"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var bcrypt = require("bcrypt");

//test
function viewUsuarios(req, res) {
  var users, token, xd;
  return regeneratorRuntime.async(function viewUsuarios$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Usuario["default"].findAll());

        case 2:
          users = _context.sent;
          token = req.headers.authorization.split(" ")[1];
          xd = _jsonwebtoken["default"].decode(token);
          console.log(xd);
          res.json({
            data: users
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
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


function loginUsuarios(req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  } else {
    var getUser;

    _Usuario["default"].findByPk(req.body.email).then(function (user) {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }

      getUser = user;
      return bcrypt.compare(req.body.contraseña, user.contraseña);
    }).then(function (response) {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }

      var jwtToken = _jsonwebtoken["default"].sign({
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

      _Institucion["default"].findByPk(getUser.codinst, {
        attributes: {
          include: [[// Subquery
          _db["default"].literal("(\n                                    SELECT COUNT(email)\n                                    FROM salas NATURAL JOIN dicta\n                                    WHERE\n                                        codinst = $codinst \n                                )".replace('$codinst', getUser.codinst)), 'entrenadores'], [// Subquery
          _db["default"].literal("(\n                                    SELECT COUNT(email)\n                                    FROM institucion_disciplina NATURAL JOIN inscripciones\n                                    WHERE\n                                        institucion_disciplina.codinst = $codinst\n                                )".replace('$codinst', getUser.codinst)), 'clientes'], [// Subquery
          _db["default"].literal("(\n                                    SELECT COUNT(nombredisciplina)\n                                    FROM institucion_disciplina\n                                    WHERE\n                                        institucion_disciplina.codinst = $codinst\n                                )".replace('$codinst', getUser.codinst)), 'disciplinas']]
        }
      }).then(function (data) {
        return res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          data: data
        });
      })["catch"](function (err) {
        return res.status(401).json({
          message: "Authentication failed",
          error: err
        });
      });
    })["catch"](function (err) {
      return res.status(401).json({
        message: "Authentication failed",
        error: err
      });
    });
  }
} //sign up


function createUsuarios(req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).jsonp(errors.array());
  } else {
    console.log(req.body);
    bcrypt.hash(req.body.contraseña, 10, function (err, hash) {
      _Usuario["default"].create({
        email: req.body.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        numerotelefono: req.body.numerotelefono,
        nombredeusuario: req.body.nombredeusuario,
        contraseña: hash,
        fechanacimiento: req.body.fechanacimiento,
        nombregenero: req.body.nombregenero,
        tipousuario: 'Usuario'
      }).then(function (response) {
        var jwtToken = _jsonwebtoken["default"].sign({
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
      })["catch"](function (error) {
        res.status(500).json({
          error: error
        });
      });
    });
  }
}

function viewInscripciones(req, res) {
  var errors;
  return regeneratorRuntime.async(function viewInscripciones$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).jsonp(errors.array());
          } else {
            _Inscripcion["default"].findAll({
              where: {
                email: req.params.email
              },
              include: {
                model: _Institucion_disciplina["default"]
              }
            }).then(function (inscripcion) {
              if (!inscripcion) {
                res.status(404).json({
                  mgs: 'Invalid codinst'
                });
              } else {
                res.status(200).json({
                  data: inscripcion
                });
              }
            })["catch"]();
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function updatePassword(req, res) {
  var errors, user;
  return regeneratorRuntime.async(function updatePassword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          errors = validationResult(req);

          if (!errors.isEmpty()) {
            res.status(422).jsonp(errors.array());
          } else {
            _Usuario["default"].findByPk(req.body.email, {
              attributes: ["email"]
            }).then(function (email) {
              if (!email) {
                res.status(404).json({
                  mgs: 'Invalid email'
                });
              } else {
                _Usuario["default"].findByPk(req.body.email).then(function (userPassword) {
                  user = userPassword;
                  return bcrypt.compare(req.body.contraseña, user.contraseña);
                }).then(function (response) {
                  if (!response) {
                    return res.status(401).json({
                      message: "Passwords doens't match"
                    });
                  }

                  bcrypt.hash(req.body.nuevacontraseña, 10, function (err, hash) {
                    user.contraseña = hash;
                    user.save().then(function (response) {
                      res.status(200).json({
                        data: response,
                        msg: 'Password has been updated'
                      });
                    })["catch"](function (err) {
                      res.status(500).json({
                        error: err
                      });
                    });
                  });
                })["catch"](function (err) {
                  res.status(500).json({
                    error: 2
                  });
                });
              }
            })["catch"](function (err) {
              res.status(500).json({
                error: 3
              });
            });
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}