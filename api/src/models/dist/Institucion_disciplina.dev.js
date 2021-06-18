"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Usuario = _interopRequireDefault(require("./Usuario"));

var _Disciplina = _interopRequireDefault(require("./Disciplina"));

var _Institucion = _interopRequireDefault(require("./Institucion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var InstitucionDisciplina = _db["default"].define('institucion_disciplina', {
  idinstdisc: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  codinst: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: _Institucion["default"],
      key: 'codinst'
    }
  },
  nombredisciplina: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Disciplina["default"],
      key: 'nombredisciplina'
    }
  },
  precioclase: {
    type: _sequelize["default"].STRING(30)
  },
  descripcion: {
    type: _sequelize["default"].STRING(30)
  }
}, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  // define the table's name
  tableName: 'institucion_disciplina'
});

var _default = InstitucionDisciplina;
exports["default"] = _default;