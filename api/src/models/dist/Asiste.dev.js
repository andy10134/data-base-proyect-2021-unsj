"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Dicta = _interopRequireDefault(require("./Dicta"));

var _Usuario = _interopRequireDefault(require("./Usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var Asistencia = _db["default"].define('asiste', {
  dictaid: {
    type: _sequelize["default"].INTEGER,
    references: {
      model: _Dicta["default"],
      key: "dictaid"
    }
  },
  emailcliente: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Usuario["default"],
      key: "email"
    }
  },

  /*
      email:{
          type: Sequelize.STRING(30) ,
          primaryKey: true
      },
  
      nombredisciplina:{
          type: Sequelize.STRING(30),
          primaryKey: true
      },
  
      nombredia:{
          type: Sequelize.STRING(30),
          primaryKey: true
      },
      
      numerosala:{
          type: Sequelize.INTEGER,
          primaryKey: true
      },
  
      codinst:{
          type: Sequelize.INTEGER,
          primaryKey: true
      },
  */
  inicio: {
    type: _sequelize["default"].TIME,
    primaryKey: true
  },
  fin: {
    type: _sequelize["default"].TIME,
    primaryKey: true
  },
  fecha: {
    type: _sequelize["default"].DATEONLY,
    primaryKey: true
  }
}, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  // define the table's name
  tableName: 'asiste'
});

var _default = Asistencia;
exports["default"] = _default;