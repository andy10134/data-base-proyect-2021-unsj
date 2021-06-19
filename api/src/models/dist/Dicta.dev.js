"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Dia = _interopRequireDefault(require("./Dia"));

var _Sala = _interopRequireDefault(require("./Sala"));

var _Usuario = _interopRequireDefault(require("./Usuario"));

var _Disciplina = _interopRequireDefault(require("./Disciplina"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var Dicta = _db["default"].define('dicta', {
  dictaid: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  email: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Usuario["default"],
      key: "email"
    }
  },
  nombredisciplina: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Disciplina["default"],
      key: "nombredisciplina"
    }
  },
  nombredia: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Dia["default"],
      key: "nombredia"
    }
  },

  /*
  numerosala:{
      type: Sequelize.INTEGER,
      primaryKey: true
  },
    codinst:{
      type: Sequelize.INTEGER,
      primaryKey: true
  },*/
  salaid: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: _Sala["default"],
      key: "salaid"
    }
  },
  inicio: {
    type: _sequelize["default"].TIME,
    primaryKey: true
  },
  fin: {
    type: _sequelize["default"].TIME,
    primaryKey: true
  }
}, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  // define the table's name
  tableName: 'dicta'
});

var _default = Dicta;
exports["default"] = _default;