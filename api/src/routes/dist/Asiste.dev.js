"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _Asistencia = require("../controllers/Asistencia.controller");

var authorize = require("../core/auth");

var router = (0, _express.Router)();
router.get('/me', authorize, _Asistencia.viewUsuarioAsistencias);
var _default = router;
exports["default"] = _default;