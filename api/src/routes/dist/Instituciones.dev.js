"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _Institucion = require("../controllers/Institucion.controller");

var authorize = require("../core/auth");

var router = (0, _express.Router)(); //Testing

router.get('/', _Institucion.viewInstituciones);
router.get('/disciplines', authorize, _Institucion.viewInstitucionesDisciplinas);
router.get('/customers', authorize, _Institucion.viewInstitucionesClientes);
router.get('/trainners', authorize, _Institucion.viewInstitucionesEntrenadores);
router.get('/availability/:nombredisciplina/:numerosala', [(0, _expressValidator.check)('nombredisciplina', 'Nombredisciplina is required').isAlpha().not().isEmpty(), (0, _expressValidator.check)('numerosala', 'Numerosala is required').isNumeric().not().isEmpty()], authorize, _Institucion.viewInstitucionDisciplinaCupo);
var _default = router;
exports["default"] = _default;