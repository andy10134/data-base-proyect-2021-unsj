"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../db/db"));

var _Usuario = _interopRequireDefault(require("./Usuario"));

var _Institucion_disciplina = _interopRequireDefault(require("./Institucion_disciplina"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import {sequelize} from '../core/conection';
var Inscripcion = _db["default"].define('inscripciones', {
  numinsc: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idinstdisc: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    references: {
      model: _Institucion_disciplina["default"],
      key: "idinstdisc"
    }
  },

  /*
  codinst:{
      type: Sequelize.INTEGER,
      primaryKey: true,
          model: InstitucionDisciplina,
          key: 'codinst'
      }
  },
    nombredisciplina:{
      type: Sequelize.STRING(30) ,
      primaryKey: true,
      references: {
          model: InstitucionDisciplina,
          key: 'nombredisciplina'
      },
  }   */
  email: {
    type: _sequelize["default"].STRING(30),
    primaryKey: true,
    references: {
      model: _Usuario["default"],
      key: "email"
    }
  },
  diaexpiracion: {
    type: _sequelize["default"].DATEONLY
  },
  fechapago: {
    type: _sequelize["default"].DATEONLY
  },
  cantclases: {
    type: _sequelize["default"].INTEGER
  }
}, {
  timestamps: false,
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,
  // define the table's name
  tableName: 'inscripciones'
});

var _default = Inscripcion;
exports["default"] = _default;