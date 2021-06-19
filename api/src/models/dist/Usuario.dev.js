"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Genero = _interopRequireDefault(require("./Genero"));

var _Institucion = _interopRequireDefault(require("./Institucion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var User = _db["default"].define('usuarios', {
  email: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true
  },
  nombre: {
    type: _sequelize["default"].STRING(30),
    allowNull: false
  },
  apellido: {
    type: _sequelize["default"].STRING(30),
    allowNull: false
  },
  numerotelefono: {
    type: _sequelize["default"].STRING(30),
    allowNull: false
  },
  nombredeusuario: {
    type: _sequelize["default"].STRING(30),
    allowNull: false
  },
  contraseña: {
    type: _sequelize["default"].STRING(255),
    allowNull: false
  },
  fechanacimiento: {
    type: _sequelize["default"].DATEONLY,
    allowNull: false
  },
  nombregenero: {
    type: _sequelize["default"].STRING(30),
    references: {
      model: _Genero["default"],
      key: 'nombregenero'
    },
    allowNull: false
  },
  tipousuario: {
    type: _sequelize["default"].STRING(30),
    allowNull: false
  },
  codinst: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _Institucion["default"],
      key: 'codinst'
    },
    allowNull: true
  }
}, {
  timestamps: false
});

var _default = User;
exports["default"] = _default;