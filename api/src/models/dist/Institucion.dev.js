"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var Institucion = _db["default"].define('instituciones', {
  codinst: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: _sequelize["default"].STRING(30)
  },
  direccion: {
    type: _sequelize["default"].STRING(30)
  },
  telefono: {
    type: _sequelize["default"].STRING(30)
  }
}, {
  timestamps: false
});

var _default = Institucion;
exports["default"] = _default;