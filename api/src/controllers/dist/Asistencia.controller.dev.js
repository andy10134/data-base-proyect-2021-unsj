"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewAsistencias = viewAsistencias;
exports.viewUsuarioAsistencias = viewUsuarioAsistencias;

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _Dicta = _interopRequireDefault(require("../models/Dicta"));

var _Asiste = _interopRequireDefault(require("../models/Asiste"));

var _Sala = _interopRequireDefault(require("../models/Sala"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import Asistencia from "../models/Asiste";
var authorize = require("../core/auth");

//for the query https://stackoverflow.com/questions/61257195/sequelize-associations-between-two-tables
//test
function viewAsistencias(req, res) {
  var users;
  return regeneratorRuntime.async(function viewAsistencias$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_Dicta["default"].findAll({
            include: [{
              model: _Usuario["default"],
              as: 'entrenador'
            }, {
              model: _Usuario["default"],
              as: 'cliente'
            }]
          }));

        case 2:
          users = _context.sent;
          console.log(req.body);
          res.json({
            data: users
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
} //Clases asistidas por un cliente (ingresado un email de cliente)


function viewUsuarioAsistencias(req, res) {
  var token, user;
  return regeneratorRuntime.async(function viewUsuarioAsistencias$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.headers.authorization.split(" ")[1];
          user = jwt.decode(token);

          if (user.email == null) {
            res.status(401).json({
              msg: 'Unauthorized'
            });
          } else {
            _Usuario["default"].findByPk(user.email, {
              attributes: ['email', 'nombredeusuario'],
              include: [{
                model: _Dicta["default"],
                as: 'disciplinasAsistidas',
                attributes: ['nombredisciplina', ['email', 'emailentrenador']],
                include: [{
                  model: _Sala["default"],
                  attributes: ['codinst', 'numerosala']
                }, {
                  model: _Asiste["default"],
                  attributes: ['fecha', 'inicio', 'fin'],
                  as: 'asistio'
                }],
                through: {
                  attributes: []
                }
              }]
            }).then(function (asistencias) {
              if (!asistencias) {
                res.status(404).json({
                  mgs: 'Invalid email'
                });
              } else {
                res.status(200).json({
                  data: asistencias
                });
              }
            })["catch"]();
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}