"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Institucion = _interopRequireDefault(require("./Institucion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var Sala = _db["default"].define('salas', {
  /*salaid agregar*/
  salaid: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    unique: true
  },
  codinst: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: _Institucion["default"],
      key: "codinst"
    }
  },
  numerosala: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  capacidad: {
    type: _sequelize["default"].INTEGER
  }
});

var _default = Sala;
exports["default"] = _default;